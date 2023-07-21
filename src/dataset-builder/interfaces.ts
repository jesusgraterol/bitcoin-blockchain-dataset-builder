





// Service
export interface IDatasetBuilderService {
    sync(): Promise<void>
}





// Dataset Item
export interface IDatasetItem {
    // The block's number
    height: number,

    // The unix timestamp in ms when the block was first mined
    timestamp: number,

    // The size of the block in bytes
    size: number,

    // The total number of transactions included in the block
    tx_count: number,

    // The current network mining difficulty (set based on the hashing power)
    difficulty: number,

    // The median of the fees paid by txs to be included (satoshis per byte rate)
    median_fee_rate: number,

    // The average of the fees paid by txs to be included (satoshis per byte rate)
    avg_fee_rate: number,

    // The fee total collected by the block's miner (satoshis)
    total_fees: number,

    // The fee range paid by all transactions within the block (satoshis per byte rate)
    fee_range_min: number,
    fee_range_max: number,

    // The total number of inputs and outputs in all the txs within the block
    input_count: number,
    output_count: number,

    // The Bitcoin total found in all outputs (satoshis)
    output_amount: number
}