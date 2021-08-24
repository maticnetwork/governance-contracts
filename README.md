# Polygon Governance

Set of Ethereum smart contracts that power Polygon governance.

#### Local setup

```bash
git clone https://github.com/maticnetwork/governance
cd governance
yarn
```

**Compile contracts and typescripts**

```bash
yarn compile
```

**To run testcases**

```bash
yarn test:ci
```


#### Contracts


`TimeLock.sol` - This contract is standard OpenZeppelin `TimelockController` contract, which executes each proposal with mentioned delay. For production, 2 days of delay will be used.


#### LICENSE

GPL-3.0-or-later
