pragma solidity 0.7.6;

import {Proxy} from "./misc/Proxy.sol";

contract GovernanceProxy is Proxy {
    constructor(address _proxyTo) public Proxy(_proxyTo) {}
}
