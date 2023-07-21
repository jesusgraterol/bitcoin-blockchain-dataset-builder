import * as fs from "fs";
import * as path_helper from "path";
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
    private readonly delay_seconds_per_request: number = 1;

    // Mempool Space Service
    private _mempool_space: IMempoolSpaceService;


    constructor() {
        // Initialize the Mempool Space Instance
        this._mempool_space = new MempoolSpaceService();

        // Initialize the Dataset File
        this.initialize_dataset_file();
    }





    public async sync(): Promise<void> {
        /*let data1 = await this._mempool_space.get_block_tip_height();
        console.log(data1);
        await this.delay();
        let data2 = await this._mempool_space.get_next_blocks(0);
        console.log(data2);*/
    }












    private async get_next_dataset_items(dataset_height: number): Promise<IDatasetItem[]> {
        return []
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
     * @param new_data 
     */
    private update_dataset_file(new_data: string): void {
        fs.writeFileSync(this.dataset_path, new_data, "utf-8");
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





    private load_dataset_file(): { dataset_height: number, raw_dataset: string} {
        // Load the raw data
        const raw_dataset: string = fs.readFileSync(this.dataset_path).toString();

        // If the file contains data, derive the dataset height
        if (raw_dataset.length) {
            // Derive the dataset height based on the last line
            // @TODO

            // Finally, return the file data
            return { dataset_height: 0, raw_dataset: raw_dataset }
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
        return new Promise((resolve, reject) => { setTimeout(() => { resolve() }, this.delay_seconds_per_request * 1000) });
    }
}