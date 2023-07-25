import * as fs from "fs";
import * as path_helper from "path";
import * as progress_bar from "cli-progress";
import { 
    MempoolSpaceService, 
    IMempoolSpaceService, 
    IBlock 
} from "../mempool-space";
import {
    IDatasetBuilderService,
    IDatasetItem
} from "./interfaces";


export class DatasetBuilderService implements IDatasetBuilderService {
    // The path in which the dataset will be stored
    private readonly dataset_path: string = "./output/dataset.csv";

    // The delay that will be applied every time a request is sent
    private readonly delay_seconds_per_request: number = 2;

    // Mempool Space Service
    private _mempool_space: IMempoolSpaceService;


    constructor() {
        // Initialize the Mempool Space Instance
        this._mempool_space = new MempoolSpaceService();

        // Initialize the Dataset File
        this.initialize_dataset_file();
    }







    /****************
     * Sync Process *
     ****************/







    /**
     * Executes a full dataset sync until it is up-to-date with the network.
     * @returns Promise<void>
     */
    public async sync(): Promise<void> {
        // Firstly, retrieve and store the current height in order to track progress
        const current_blockchain_height: number = await this._mempool_space.get_block_tip_height();

        // Load the dataset file
        let { dataset_height, raw_dataset } = this.load_dataset_file();

        // Initialize the progress bar
        const bar = new progress_bar.SingleBar({}, progress_bar.Presets.shades_classic);
        bar.start(current_blockchain_height, dataset_height);

        // Retrieve and process blocks until the file is fully synced
        while(dataset_height < current_blockchain_height) {
            // Retrieve the next dataset items
            const new_items: IDatasetItem[] = await this.get_next_dataset_items(dataset_height);

            // Update the current dataset height with the last retrieved block
            dataset_height = new_items.at(-1)!.height;

            // If the file is currently empty, add the heading
            if (!raw_dataset.length) raw_dataset = `${Object.keys(new_items[0]).join(",")}`;

            // Add the new items to the raw dataset
            raw_dataset += new_items.reduce(
                (accum: string, current_value: IDatasetItem) => accum + `\n${Object.values(current_value).join(",")}`,
                ""
            );

            // Update the dataset file
            this.update_dataset_file(raw_dataset);

            // Activate the delay to prevent request limit violations
            await this.delay();

            // Update the progress bar
            bar.update(dataset_height);
        }

        // Finally, stop the progress bar
        bar.stop();
    }





    /**
     * Retrieves the next set of blocks from Mempool.space's API and 
     * builds the dataset items.
     * @param dataset_height 
     * @returns Promise<IDatasetItem[]>
     */
    private async get_next_dataset_items(dataset_height: number): Promise<IDatasetItem[]> {
        // Firstly, retrieve the next blocks
        let blocks: IBlock[] = await this._mempool_space.get_next_blocks(dataset_height);

        // Since the blocks come in descending order, reverse the list
        blocks.reverse();

        // Finally, return the build
        return blocks.map(this.build_dataset_item);
    }





    /**
     * Builds a dataset item based on a given raw block.
     * @param block 
     * @returns IDatasetItem
     */
    private build_dataset_item(block: IBlock): IDatasetItem {
        return {
            height: block.height,
            timestamp: block.timestamp * 1000, // Convert seconds to milliseconds
            size: block.size,
            tx_count: block.tx_count,
            difficulty: block.difficulty,
            median_fee_rate: block.extras.medianFee,
            avg_fee_rate: block.extras.avgFeeRate,
            total_fees: block.extras.totalFees,
            fee_range_min: block.extras.feeRange[0],
            fee_range_max: <number>block.extras.feeRange.at(-1),
            input_count: block.extras.totalInputs,
            output_count: block.extras.totalOutputs,
            output_amount: block.extras.totalOutputAmt
        }
    }
















    /***********************
     * File System Helpers *
     ***********************/





    /**
     * Initializes the dataset file in case it hadn't been.
     */
    private initialize_dataset_file(): void {
        // Only proceed if the dataset file does not exist
        if (!this.path_exists(this.dataset_path)) {
            // Check if the directory needs to be created
            const dir_name: string = path_helper.dirname(this.dataset_path);
            if (!this.path_exists(dir_name)) fs.mkdirSync(dir_name);

            // Create the csv file
            this.update_dataset_file("");
        }
    }



    /**
     * Updates the dataset file with the latest state.
     * @param new_data_state
     */
    private update_dataset_file(new_data_state: string): void {
        fs.writeFileSync(this.dataset_path, new_data_state, "utf-8");
    }




    /**
     * Verifies if a given directory or file exists.
     * @returns boolean
     */
    private path_exists(file_or_dir_path: string): boolean {
        try {
            fs.accessSync(file_or_dir_path);
            return true;
        } catch (e) { return false }
    }





    /**
     * Loads the dataset file and returns it in string format. It also
     * derives the current block height so the syncing can be resumed.
     * @returns { dataset_height: number, raw_dataset: string }
     */
    private load_dataset_file(): { dataset_height: number, raw_dataset: string } {
        // Load the raw data
        const raw_dataset: string = fs.readFileSync(this.dataset_path).toString();

        // If the file contains data, derive the dataset height
        if (raw_dataset.length) {
            return { 
                dataset_height: Number(raw_dataset.split("\n").at(-1)!.split(",")[0]), 
                raw_dataset: raw_dataset 
            }
        }

        // Otherwise, return the defaults
        else { return { dataset_height: 0, raw_dataset: "" } }
    }















    /****************
     * Misc Helpers *
     ****************/






    /**
     * It will create a promise that will resolve after delay_seconds_per_request have passed.
     * This functionality is used to prevent our requests being blocked by rate limits.
     * @returns Promise<void>
     */
    private delay(): Promise<void> {
        return new Promise((resolve, reject) => { 
            setTimeout(() => { resolve() }, this.delay_seconds_per_request * 1000) 
        });
    }
}