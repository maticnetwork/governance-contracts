import '@nomiclabs/hardhat-waffle'
import { task, HardhatUserConfig } from 'hardhat/config'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async(args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const config = {
  solidity: '0.7.6',
  typechain: {
    outDir: 'types',
    target: 'ethers-v5'
  }
}

export default config
