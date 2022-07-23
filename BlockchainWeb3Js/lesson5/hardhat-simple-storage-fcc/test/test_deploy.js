const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
    let SimpleStorage, SimpleStorageFactory;
    beforeEach(async() => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        SimpleStorage = await SimpleStorageFactory.deploy();
    });

    it("Should start with a favourite number of 0", async() => {
        const currentValue = await SimpleStorage.retrieve();

        const expectedValue = "0";

        assert.equal(currentValue.toString(), expectedValue);
    });

    it("should update when we call store", async() => {
        const expectedValue = "7";
        const setUpdatedValue = await SimpleStorage.store(expectedValue);
        setUpdatedValue.wait(1);

        const getUpdatedValue = await SimpleStorage.retrieve();

        assert.equal(getUpdatedValue.toString(), expectedValue);
    });

    it("Add person function", async() => {
        const name = "tobi";
        const favNum = 7;

        const newPerson = await SimpleStorage.addperson(name, favNum);
        newPerson.wait(1);
        assert.isOk(newPerson);
    });
});