




// Service
export interface IMempoolSpaceService {
    // Properties
    // ...

    // Retrievers
    get_block_tip_height(): Promise<number>,
    get_next_blocks(dataset_height: number): Promise<IBlock[]>
}






// Block Record
export interface IBlock {
    // The block's hash. Note that a block can be identified by its height or its hash
    id: string,

    // The block's number
    height: number,

    // @TODO
    version: number,

    // The time at which the block was mined (unix timestamp in seconds)
    timestamp: number,

    // @TODO
    bits: number,

    // @TODO
    nonce: number,

    // The current network mining difficulty (set based on the hashing power)
    difficulty: number,

    // @TODO
    merkle_root: string,

    // The total number of transactions included in the block
    tx_count: number,

    // The size of the block in bytes
    size: number,

    // @TODO
    weight: number,

    // The hash from the previous block. 
    previousblockhash: string,

    // @TODO
    mediantime: number,

    // The object containing all secondary information
    extras: {
        // The fee total collected by the block's miner (satoshis)
        totalFees: number,

        // The median of the fees paid by txs to be included (satoshis per byte rate)
        medianFee: number,

        // The fee range paid by all transactions within the block (satoshis per byte rate)
        feeRange: number[],

        // The miner's reward, this includes the network's reward + the collected fees (satoshis)
        reward: number,

        // General info about the pool that mined the block. Keep in mind this data is not always available
        pool: { id: number, name: string, slug: string },

        // The average fee paid by transactions (satoshis)
        avgFee: number,

        // The average of the fees paid by txs to be included (satoshis per byte rate)
        avgFeeRate: number,

        // @TODO
        coinbaseRaw: string,

        // @TODO
        coinbaseAddress: string|null,

        // @TODO
        coinbaseSignature: string,

        // @TODO
        coinbaseSignatureAscii: string,

        // The average size found in all the txs within the block (bytes)
        avgTxSize: number,

        // The total number of inputs found in all the transactions within the block
        totalInputs: number,

        // The total number of outputs found in all the transactions within the block
        totalOutputs: number,

        // The total Bitcoin amount found in all the outputs (satoshis)
        totalOutputAmt: number,

        // @TODO
        feePercentiles: number[]|null,

        // The total number of segwit transactions  within the block
        segwitTotalTxs: number,

        // The size of all the segwit transactions put together (bytes)
        segwitTotalSize: number,

        // @TODO
        segwitTotalWeight: number,

        // @TODO
        header: string,

        // @TODO
        utxoSetChange: number,

        // @TODO
        utxoSetSize: number|null,

        // The total Bitcoin amount found in all inputs
        totalInputAmt: number|null,

        // @TODO
        virtualSize: number,

        // @TODO
        orphans: string[],

        // @TODO
        matchRate: number,

        // @TODO
        expectedFees: number,

        // @TODO
        expectedWeight: number|null
    }
}