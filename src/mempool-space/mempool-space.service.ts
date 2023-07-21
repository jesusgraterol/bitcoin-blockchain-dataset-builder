import { 
    ExternalRequestService, 
    IExternalRequestOptions, 
    IExternalRequestResponse, 
    IExternalRequestService 
} from "../external-request";
import { IMempoolSpaceService, IBlock } from "./interfaces";


export class MempoolSpaceService implements IMempoolSpaceService {
    // Mempool.space's Request Options Skeleton
    private readonly request_options: IExternalRequestOptions = {
        host: "mempool.space",
        path: "",
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }

    // The maximum number of blocks included in every query
    private readonly blocks_per_query: number = 15;

    // External Request Service
    private _external_request: IExternalRequestService;

    
    constructor() {
        // Initialize the external request instance
        this._external_request = new ExternalRequestService();

        // ...
    }








    /**************
     * Retrievers *
     **************/





    /**
     * Retrieves the current tip of the Bitcoin's Blockchain.
     * @returns Promise<number>
     */
    public async get_block_tip_height(): Promise<number> {
        // Send the request
        const response: IExternalRequestResponse = await this._external_request.request({
            ...this.request_options,
            path: "/api/blocks/tip/height"
        });

        // Validate the response
        this.validate_request_response(response);

        // Validate the response's data
        if (typeof response.data != "number") {
            throw new Error(`Mempool.space's API returned an invalid block tip height. Received: ${response.data}`);
        }

        // Return the current height
        return response.data;
    }








    /**
     * Retrieves the next blocks_per_query blocks from the current dataset_height.
     * Keep in mind the blocks come in DESCENDING ORDER by Height.
     * @param dataset_height 
     * @returns Promise<IBlock[]>
     */
    public async get_next_blocks(dataset_height: number): Promise<IBlock[]> {
        // Send the request
        const response: IExternalRequestResponse = await this._external_request.request({
            ...this.request_options,
            path: `/api/v1/blocks/${dataset_height + this.blocks_per_query}`
        });

        // Validate the response
        this.validate_request_response(response);

        // Validate the response's data
        if (!Array.isArray(response.data)) {
            console.log(response.data);
            throw new Error(`Mempool.space's API returned an invalid list of blocks. Received: ${typeof response.data}`);
        }
        if (!response.data.length) {
            throw new Error(`Mempool.space's API returned an empty list of blocks. The dataset's height is: ${dataset_height}.`);
        }

        // Return the series
        return response.data;
    }















    /****************
     * Misc Helpers *
     ****************/
    



    /**
     * Given an HTTP Response object, it will ensure the request was 
     * processed correctly and has the correct status code.
     * @param response 
     */
    private validate_request_response(response: IExternalRequestResponse): void {
        // Ensure it is a valid object
        if (!response || typeof response != "object") {
            console.log(response);
            throw new Error("Mempool.space's API returned an invalid response object.");
        }

        // Ensure the status code is valid
        if (response.status_code != 200) {
            throw new Error(`Mempool.space's API returned an invalid HTTP response code. 
            Expected: 200, Received: ${response.status_code}`);
        }
    }
}