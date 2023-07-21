import { DatasetBuilderService } from "./dataset-builder";

// Print the script title
console.log("BITCOIN BLOCKCHAIN DATASET BUILDER");
console.log(" ");

// Start the syncing process
new DatasetBuilderService()
.sync()
.then(_ => process.exit(0) )
.catch(e => {
    console.error(e);
    process.exit(1);
});