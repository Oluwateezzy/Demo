// const deployFunc = (hre) => {
//     const { getNamedAccount, deployments } = hre;
// };

const { network } = require("hardhat");
const { network_config } = require("../helper-hardhat-config");

// module.exports.default = deployFunc;

module.exports = async(hre) => {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts;
    const chainId = network.config;

    const ethUsdPriceFeedAddress = network_config[chainId]["ethUsdPriceFeed"];

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
    });
};