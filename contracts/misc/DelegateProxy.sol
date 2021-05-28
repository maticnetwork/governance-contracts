pragma solidity 0.7.6;

import {ERCProxy} from "./ERCProxy.sol";
import {DelegateProxyForwarder} from "./DelegateProxyForwarder.sol";

abstract contract DelegateProxy is ERCProxy, DelegateProxyForwarder {
    function proxyType() external override pure returns (uint256 proxyTypeId) {
        // Upgradeable proxy
        proxyTypeId = 2;
    }
}
