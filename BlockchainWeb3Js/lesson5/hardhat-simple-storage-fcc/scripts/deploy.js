const { ethers, network } = require("hardhat");

const main = async() => {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

    console.log("Deploying contract.....");

    const SimpleStorage = await SimpleStorageFactory.deploy();

    await SimpleStorage.deployed();

    console.log(SimpleStorage.address);
    console.log(network.config);

    const currentValue = await SimpleStorage.retrieve();
    console.log(currentValue);

    const setUpdatedValue = await SimpleStorage.store(7);
    setUpdatedValue.wait(1);

    const getUpdatedValue = await SimpleStorage.retrieve();
    console.log(getUpdatedValue);
};

//const verify = async ()

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
    });