import '@nomiclabs/hardhat-waffle'
import 'hardhat-spdx-license-identifier'
import '@nomiclabs/hardhat-etherscan'
import './src/tasks'
import '@typechain/hardhat'
import { HardhatUserConfig } from 'hardhat/config'

const { MNEMONIC, API_KEY, ES_KEY } = process.env

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${API_KEY}`,
      chainId: 1,
      gas: 'auto',
      accounts: { mnemonic: MNEMONIC }
    }
  },
  solidity: '0.7.6',
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ES_KEY
  },
  mocha: {
    timeout: 99999
  }
}

export default config
