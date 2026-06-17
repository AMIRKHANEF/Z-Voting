import { ethers } from 'hardhat';

async function main() {
  console.log('Deploying Z-Voting contracts...');

  // Deploy ZVotingFactory
  const ZVotingFactory = await ethers.getContractFactory('ZVotingFactory');
  const factory = await ZVotingFactory.deploy(100); // 1% platform fee

  await factory.deployed();
  console.log(`ZVotingFactory deployed to: ${factory.address}`);

  // Verify on Etherscan (if not localhost)
  const network = await ethers.provider.getNetwork();
  if (network.chainId !== 31337) {
    // Not localhost
    console.log('\nVerifying contracts on Etherscan...');
    await factory.deployTransaction.wait(6); // Wait 6 blocks
    try {
      await hre.run('verify:verify', {
        address: factory.address,
        constructorArguments: [100],
      });
      console.log('Factory verified on Etherscan');
    } catch (error) {
      console.log('Verification failed:', error);
    }
  }

  console.log('\nDeployment Summary:');
  console.log('====================');
  console.log(`ZVotingFactory: ${factory.address}`);
  console.log('\nNext steps:');
  console.log('1. Save the factory address');
  console.log('2. Update frontend with factory address');
  console.log('3. Start creating voting sessions!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
