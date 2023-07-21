# Bitcoin Blockchain Dataset Builder

The dataset builder script extracts all the relevant block information from the Bitcoin Blockchain through Mempool.space's public API. The data is stored in a .csv file, facilitating its use in data science and machine learning projects.



#
## Requirements

- NodeJS: ^v18.17.0

- NPM: ^v9.6.7

- Typescript: ^v5.1.6

**NOTE**: the versions listed above are the ones used to code the script. It may run on older|newer versions.




#
## Project Structure

```
bitcoin-blockchain-dataset-builder/
└───dist/
    ├──...
    node_modules/
    ├──...
    output/
    ├──dataset.csv <- Dataset File
    src/
    ├──...
    .gitignore
    package-lock.json
    package.json
    README.md
    tsconfig.json
```





#
## Getting Started

Install dependencies with:

`npm install`

Initialize the syncing process with:

`npm start`

**NOTE**: if the syncing execution were to fail and stop for any reason, it can be executed again without the risk of corrupting the dataset. Additionally, if your project requires a fresh dataset frequently, download the pruned file from <a href="https://www.kaggle.com/jesusgraterol/datasets" target="_blank">Kaggle</a> and place it in the output directory.





#
## Dataset Schema

Bitcoin's blocks contain a significant amount of information.  The goal of this dataset builder is to collect essential data that reflects the activity & evolution of the network throughout time.

If you're going to use this dataset to train machine learning models, take into consideration that some of its fields need to be normalized. In case of any doubts, feel free to ask through the Github Issues section, and I'll get back to you as soon as I can.

| Name | Type | Description
| ---- | ---- | -----------
| height | int | The block's number
| timestamp | int | The unix timestamp in ms when the block was mined
| size | int | The size of the block in bytes
| tx_count | int | The total number of transactions included in the block
| difficulty | float | The current network mining difficulty (set based on the hashing power)
| median_fee_rate | int | The median of the fees paid by txs to be included (satoshis per byte rate)
| avg_fee_rate | int | The average of the fees paid by txs to be included (satoshis per byte rate)
| total_fees | int | The fee total collected by the block's miner (satoshis)
| fee_range_min | int | The smallest fee paid by a transaction within the block (satoshis per byte rate)
| fee_range_max | int | The largest fee paid by a transaction within the block (satoshis per byte rate)
| input_count | int | The total number of inputs in all the txs within the block
| output_count | int | The total number of outputs in all the txs within the block
| output_amount | int | The Bitcoin total found in all outputs (satoshis)


#
## Unit Tests

Since the dataset file is deeply analyzed in Jupyter|Kaggle Notebooks, no unit tests were written. If you wish to see more details regarding this dataset, please visit:

<a href="https://www.kaggle.com/jesusgraterol/code" target="_blank">https://www.kaggle.com/jesusgraterol/code</a>

