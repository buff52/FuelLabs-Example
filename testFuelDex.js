const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FuelDex", function () {
  it("Should deposit and withdraw correctly", async function () {
    const [owner, user] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();

    await myToken.deployed();

    const FuelDex = await ethers.getContractFactory("FuelDex");
    const fuelDex = await FuelDex.deploy();

    await fuelDex.deployed();

    // Transfer tokens to user
    await myToken.transfer(user.address, 1000);
    expect(await myToken.balanceOf(user.address)).to.equal(1000);

    // Connect to FuelDex contract as user
    const fuelDexAsUser = fuelDex.connect(user);

    // Deposit tokens
    await myToken.connect(user).approve(fuelDex.address, 500);
    await fuelDexAsUser.deposit(myToken.address, 500);

    expect(await myToken.balanceOf(user.address)).to.equal(500);
    expect(await myToken.balanceOf(fuelDex.address)).to.equal(500);
    expect(await fuelDex.balances(user.address)).to.equal(500);

    // Withdraw tokens
    await fuelDexAsUser.withdraw(myToken.address, 200);

    expect(await myToken.balanceOf(user.address)).to.equal(700);
    expect(await myToken.balanceOf(fuelDex.address)).to.equal(300);
    expect(await fuelDex.balances(user.address)).to.equal(300);
  });
});
