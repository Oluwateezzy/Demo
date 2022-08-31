const network_config = {
    4: {
        name: "rinkeby",
        ethUsdPriceFeed: "0x8A7537471Fa494EC90E9f37563A8AF630e",
    },
};

const developmentChains = ["ganache", "hardhat", "localhost"];

const DECIMALS = "8";
const INITIAL_ANSWER = "200000000";

module.exports = {
    network_config,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
};