// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";



contract token is ERC20, Ownable, ReentrancyGuard{
    //constructor
    constructor() ERC20("BEP20","BEP20s") Ownable(msg.sender) {
    }

    //token per wei(or chain equivalent)
    uint256 public tokenPrice = 1;

    //update tokenPrice function
    function updateTokenPrice(uint256 _amount) external onlyOwner uintIsGraterThenZero(_amount){
        tokenPrice = _amount;
    }

    //function to calculate coins required to buy tokens
    function calculateTokensMinted(uint _amount) public view returns(uint256) {
        return (tokenPrice*_amount);
    } 

    //a simple function that mints
    //set minimum tokens needed to buy, or 0 might break system
    function mint(uint256 _amount) public payable onlyOwner nonReentrant{
        uint256 _tokens = calculateTokensMinted(_amount);
        require(msg.value >= _amount,"insufficient coin paid");
        _mint(msg.sender, _tokens);
    }



//funtions regarding pre-sale


    mapping (address => bool) internal preSaleStatus; //if you have already participated in presale or not

    struct PreSaleInfo{
        bool status;
        uint256 startingTime;
        uint256 endingTime;
        uint256 saleTokenPrice;
        }

    PreSaleInfo public preSaleInfo;

    function startPreSale(uint256 _durationInSec, uint256 _saleTokenPrice) external onlyOwner uintIsGraterThenZero(_saleTokenPrice){
        require(preSaleInfo.status == false,"sale is already active");
        require(_durationInSec > 0,"invalid ending time");
        require(_saleTokenPrice <= tokenPrice,"sale price should be smaller");
        preSaleInfo = PreSaleInfo({status: true,startingTime: block.timestamp, endingTime: block.timestamp + _durationInSec, saleTokenPrice: _saleTokenPrice});
    }

    function endPreSale() external onlyOwner{
        require(preSaleInfo.status == true,"sale is not active");
        preSaleInfo.status = false;
    }

    //you can buy only once becuase of vesting, you can particpate again when you have claimed all tokens in the end
    //enter the amout of wei,
    function purchaseTokensDuringPreSale(uint256 amount) external payable uintIsGraterThenZero(amount) nonReentrant{
        PreSaleInfo memory _preSaleInfo = preSaleInfo;
        require(_preSaleInfo.status, "Pre-sale is not active");
        require(block.timestamp <= _preSaleInfo.endingTime, "Pre-sale has ended");
        require(preSaleStatus[msg.sender] == false,"alreay in presale, claim all tokens to exit");
        require(msg.value >= amount,"insufficient amount of coins");

        uint256 tokensToMint = amount * _preSaleInfo.saleTokenPrice;
        preSaleStatus[msg.sender] = true;

        //here we are not minting token, WE CREATE VESTING
        //CHECK createVesting funtion for more info
        createVesting(msg.sender,tokensToMint);

    }

    modifier uintIsGraterThenZero(uint256 _uint){
        require(_uint > 0,"uint can't be equal to zero");
        _;
    }

    modifier notZeroAddress(address _addr) {
        require(_addr != address(0),"zero address used");
        _;
    }

//anyone who buys token in preSale, his tokens will be vested for 24 hours, and can use it after that
//vestation functions
       struct vesting{
        bool status;
        uint startPeriod;
        uint cliff;
        uint duration; //vestation duration
        uint tokenReleaseCycles; //number of times tokens are released in duration
        bool allTokensClaimed; 
        uint totalTokens;
        uint totalTokenClaimed;
        bool revokationStatus;
    }

    mapping (address => vesting) public vest;

    function createVesting(address _addr,uint _amount) internal uintIsGraterThenZero(_amount) notZeroAddress(_addr){
        require(vest[_addr].status == false,"vesting is alreay created");
        vesting memory _vesting = vesting({status: true, startPeriod: block.timestamp, cliff: block.timestamp + 10 seconds,duration: 30 seconds, tokenReleaseCycles: 3, allTokensClaimed: false, totalTokens: _amount, totalTokenClaimed: 0,revokationStatus: false});
        vest[_addr] = _vesting;
        if( _amount >100){
            _WhiteList(_addr); //automatic whitlisting, refer function WhtieList
        }
    }

    function claimVesting() external {
        vesting memory _vestation = vest[msg.sender];
        require(_vestation.status == true,"vesting not created");
        require(_vestation.cliff < block.timestamp,"cliff period is not over yet");
        require(_vestation.revokationStatus == false,"vestation has been revoked");
        require(_vestation.allTokensClaimed == false, "all token has been claimed");

        uint tokensReleasedPerCycle = _vestation.totalTokens/_vestation.tokenReleaseCycles; 
        uint durationPerCycle = (_vestation.duration )/_vestation.tokenReleaseCycles; 
        uint totalCyclesClosed = (block.timestamp -_vestation.startPeriod )/durationPerCycle;
        uint totalTokensReleased;
        if(totalCyclesClosed <= _vestation.tokenReleaseCycles){
            uint totalTokensReleased = tokensReleasedPerCycle*totalCyclesClosed;
            uint tokensClaimedNow = totalTokensReleased - _vestation.totalTokenClaimed;
            _mint(msg.sender, tokensClaimedNow);
            _vestation.totalTokenClaimed = totalTokensReleased;
        }
        else{
            uint totalTokensReleased = _vestation.tokenReleaseCycles*tokensReleasedPerCycle;
            uint tokensClaimedNow = totalTokensReleased - _vestation.totalTokenClaimed;
            _mint(msg.sender, tokensClaimedNow);
            _vestation.totalTokenClaimed = totalTokensReleased;
        }
        
        if( totalTokensReleased >= _vestation.totalTokens){
            _vestation.allTokensClaimed = true;
            preSaleStatus[msg.sender] = false;// now you can participate again in the sale
        }
        vest[msg.sender] = _vestation;
    }

    //revokeVestation for testing puropsed, real-life senario might lead to abuse by contract owner
    function revokeVestation(address _addr) public onlyOwner notZeroAddress(_addr){
        vesting memory _vestation = vest[_addr];
        require(_vestation.status == true,"vesting not created");
        require(_vestation.cliff < block.timestamp,"cliff period is not over yet");
        vest[_addr].revokationStatus = true;
    }


// white listing function for future sales
// if you buy more then 1000 tokens in one presale, you are whitelisted
    mapping (address => bool) public whitelisting;

    function _WhiteList(address _addr) internal notZeroAddress(_addr){
        whitelisting[_addr] = true;
    }

    function WhiteList(address _addr) external onlyOwner {
        _WhiteList(_addr);
    }

}

//first building a basic Erc20 token in 0.0.1
//add presale in 0.0.2
//added vesting and whitelisting in 0.0.3

