pragma solidity 0.7.6;

import {ProxyStorage} from "./misc/ProxyStorage.sol";
import {IGovernance} from "./IGovernance.sol";


contract Governance is ProxyStorage, IGovernance {
    function update(address target, bytes memory data) public override onlyOwner {
        (bool success, ) = target.call(data); /* bytes memory returnData */
        require(success, "Update failed");
    }
}
