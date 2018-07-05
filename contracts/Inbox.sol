pragma solidity ^0.4.7;

contract Inbox {
    string public message;

    function Inbox(string msg) public {
        message = msg;
    }

    function setMessage(string msg) public {
        message = msg;
    }
}