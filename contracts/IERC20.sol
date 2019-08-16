pragma solidity >=0.4.16 <0.6.0;

interface IERC20 {

    /* 1. events */
    event Transfer(address indexed _from, address indexed _to, uint256 _tokens);
    event Approval(address indexed _tokenOwner, address indexed _spender, uint256 _tokens);

    /* 2. functions */
    // transfer tokens function
    function transfer(address _to, uint256 _value) external returns (bool);
    // approve spender to spend tokens
    function approve(address _spender, uint256 _value) external returns (bool);
    // spending allowed tokens on behalf of owner
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool);
    // total token supply
    function totalTokenSupply() external view returns (uint256);
    // checking out the balances
    function balanceOf(address _owner) external view returns (uint256);
    // checking the amount of allowed tokens
    function allowance(address _owner, address _spender) external view returns (uint256);

}