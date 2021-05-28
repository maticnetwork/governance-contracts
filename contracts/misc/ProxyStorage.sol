pragma solidity 0.7.6;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ProxyStorage is Ownable {
    address internal proxyTo;
}
