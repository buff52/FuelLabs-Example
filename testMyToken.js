const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  it("Should return the correct name and symbol", async function () {
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();

    await myToken.deployed();
    expect(await myToken.name()).to.equal("MyToken");
    expect(await myToken.symbol()).to.equal("MTK");
  });
});
