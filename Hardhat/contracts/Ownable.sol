// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;



contract ownable {
    
    address public owner;
    mapping(address=>bool) isAdmin;
    event OwnerChanged(address indexed _from,address indexed _to);
    event AdminAdded(address indexed Admin_Address);
    event AdminRemoved(address indexed Admin_Address);
    constructor() public{
        owner=msg.sender;
        isAdmin[msg.sender]=true;
    }
    
    modifier onlyOwner(){
        require(owner == msg.sender,"Only Owner has permission to do that action");
        _;
    }
    modifier onlyAdmin(){
        require(isAdmin[msg.sender] == true,"Only Admin has permission to do that action");
        _;
    }
    
    function setOwner(address _owner) public onlyOwner returns(bool success){
        require(msg.sender!=_owner,"Already Your the owner");
        owner = _owner;
        emit OwnerChanged(msg.sender, _owner);
        return true;
    }
    function addAdmin(address _address) public onlyOwner returns(bool success){
        require(!isAdmin[_address],"User is already a admin!!!");
        isAdmin[_address]=true;
        emit AdminAdded(_address);
        return true;
    }
    function removeAdmin(address _address) public onlyOwner returns(bool success){
        require(_address!=owner,"Can't remove owner from admin");
        require(isAdmin[_address],"User not admin already!!!");
        isAdmin[_address]=false;
        emit AdminRemoved(_address);
        return true;
    }
}