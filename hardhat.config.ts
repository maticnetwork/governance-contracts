import '@nomiclabs/hardhat-waffle'
import 'hardhat-spdx-license-identifier'
import '@typechain/hardhat'

const { MNEMONIC, API_KEY } = process.env

const config = {
  defaultNetwork: 'hardhat',
  mainnet: {
    chainId: 1,
    gas: 'auto',
    accounts: { mnemonic: MNEMONIC }
  },
  hardhat: {
    chainId: 1,
    gas: 8e6,
    forking: {
      url: `https://mainnet.infura.io/v3/${API_KEY}`
    },
    accounts: { mnemonic: MNEMONIC }
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
  }
}

export default config
