pragma solidity 0.7.6;

interface IGovernance {
    function update(address target, bytes calldata data) external;
}
