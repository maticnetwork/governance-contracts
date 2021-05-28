pragma solidity 0.7.6;
import {DelegateProxy} from "./DelegateProxy.sol";
import {ProxyStorage} from "./ProxyStorage.sol";


contract Proxy is ProxyStorage, DelegateProxy {
    event ProxyUpdated(address indexed _new, address indexed _old);
    event OwnerUpdate(address _prevOwner, address _newOwner);

    constructor(address _proxyTo) public {
        updateImplementation(_proxyTo);
    }

    receive() external payable {
        // require(currentContract != 0, "If app code has not been set yet, do not call");
        // Todo: filter out some calls or handle in the end fallback
        delegatedFwd(proxyTo, msg.data);
    }

    function implementation() external override view returns (address) {
        return proxyTo;
    }

    function updateImplementation(address _newProxyTo) public onlyOwner {
        require(_newProxyTo != address(0x0), "INVALID_PROXY_ADDRESS");
        require(isContract(_newProxyTo), "DESTINATION_ADDRESS_IS_NOT_A_CONTRACT");
        emit ProxyUpdated(_newProxyTo, proxyTo);
        proxyTo = _newProxyTo;
    }
}
