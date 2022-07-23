require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
//require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

ganacheRPC = "HTTP://127.0.0.1:8545";
private_key =
    "122a5b5bd861f7be3f61309b0cf0402f7fc07094c8dff009bf53fc7f2871a295";
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        ganache: {
            url: ganacheRPC,
            accounts: [private_key],
            chainId: 1337,
        },
    },
    solidity: "0.8.9",
    gasReporter: {
        enabled: true,
        outputFile: "gas_report.txt",
        noColors: true,
    },
};