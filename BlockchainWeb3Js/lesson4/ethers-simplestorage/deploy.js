const ethers = require("ethers");
const fs = require("fs-extra");
async function main() {
    const provider = new ethers.providers.JsonRpcBatchProvider(
        "HTTP://127.0.0.1:8545"
    );

    const wallet = new ethers.Wallet(
        "122a5b5bd861f7be3f61309b0cf0402f7fc07094c8dff009bf53fc7f2871a295",
        provider
    );

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
    const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

    //console.log(abi, bin, wallet, provider);

    const ContractFactory = new ethers.ContractFactory(abi, bin, wallet);
    console.log("deploying Contract....");

    const Contract = await ContractFactory.deploy();

    await Contract.deployTransaction.wait(1);

    const currentFavourite = await Contract.retrieve();

    const contractStore = await Contract.store("7");
    const transactionReceipt = await contractStore.wait(1);
    const updated = await Contract.retrieve();
    console.log(updated.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });