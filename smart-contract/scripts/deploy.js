const main = async () => {
  const marketplaceContractFactory = await hre.ethers.getContractFactory('MarketPlaceCoin');
  const marketplaceContract = await marketplaceContractFactory.deploy();
  await marketplaceContract.deployed();

  console.log('Contract deployed to: ', marketplaceContract.address);
}

const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
};

runMain();