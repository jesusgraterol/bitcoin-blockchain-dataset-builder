




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
    // 
    id: string,

    //
    height: number,

    //
    version: number,

    //
    timestamp: number,

    //
    bits: number,

    //
    nonce: number,

    //
    difficulty: number,

    //
    merkle_root: string,

    //
    tx_count: number,

    //
    size: number,

    //
    weight: number,

    //
    previousblockhash: string,

    //
    mediantime: number,

    // 
    extras: {
        //
        totalFees: number,

        //
        medianFee: number,

        //
        feeRange: number[],

        //
        reward: number,

        //
        pool: { id: number, name: string, slug: string },

        // 
        avgFee: number,

        // 
        avgFeeRate: number,

        // 
        coinbaseRaw: string,

        // 
        coinbaseAddress: string,

        // 
        coinbaseSignature: string,

        // 
        coinbaseSignatureAscii: string,

        // 
        avgTxSize: number,

        // 
        totalInputs: number,

        // 
        totalOutputs: number,

        // 
        totalOutputAmt: number,

        // 
        medianFeeAmt: number,

        //
        feePercentiles: number[],

        // 
        segwitTotalTxs: number,

        // 
        segwitTotalSize: number,

        // 
        segwitTotalWeight: number,

        // 
        header: string,

        // 
        utxoSetChange: number,

        // 
        utxoSetSize: number,

        // 
        totalInputAmt: number,

        // 
        virtualSize: number,

        // 
        orphans: string[],

        // 
        matchRate: number,

        // 
        expectedFees: number,

        // 
        expectedWeight: number,
    }
}