pragma solidity >=0.4.16 <0.6.0;

contract EnergyProduction {

    struct Producer {
        string owner;
        string deviceType;
        uint32 peakPowerPos;
        uint32 peakPowerNeg;
        uint32 latitude;
        uint32 longitude;
        uint32 voltageLevel;
        string location;
        string installDate;
    }

    struct EnerProduction {
        uint enerTime;
        uint32 enerValue;
        uint blockNumber;
        bytes32 blockHash;
        uint txGasPrice;
    }

    struct ProTransaction {
        uint[] txTime;
        uint32[] txValue;
        uint[] blockNumber;
        bytes32[] blockHash;
        uint[] txGasPrice;
    }

    event ProducerRegs(address pvAddr, string owner, string deviceType, uint32 peakPowerPos, uint32 peakPowerNeg, uint32 latitude, uint32 longitude, uint32 voltageLevel, string location, string installDate);
    event EnerProductionEvent(address oliAddr, uint256 eTime, uint32 enerAmount);
    event TestEvent(address oliAddr, uint256 eTime, uint32 enerAmount, uint[] txTime, uint32[] txValue, uint[] blockNumber, bytes32[] blockHash, uint[] txGasPrice);
    event ProTransactionEvent(address oliAddr, uint256 eTime, uint32 enerAmount, uint blockNumber, bytes32 blockHash, uint txGasPrice);

    mapping(address => Producer) producers;
    mapping(address => uint) accntIndexArr;
    mapping(address => EnerProduction) enerProductions;
    mapping(address => uint) proBalance;
    mapping(address => ProTransaction) transactions;

    address[] public proAccntList;

    /*
    * Registration
    */

    function setProducer(string memory _owner, string memory _deviceType, uint32 _peakPowerPos, uint32 _peakPowerNeg, uint32 _latitude, uint32 _longitude, uint32 _voltageLevel, string memory _location, string memory _installDate) public {
        if (!proAccntsArr(msg.sender)) {
            // mapping address to index
            accntIndexArr[msg.sender] = proAccntList.length;
            producers[msg.sender] = Producer(_owner, _deviceType, _peakPowerPos, _peakPowerNeg, _latitude, _longitude, _voltageLevel, _location, _installDate);
            proAccntList.push(msg.sender) - 1;
            emit ProducerRegs(msg.sender, _owner, _deviceType, _peakPowerPos, _peakPowerNeg, _latitude, _longitude, _voltageLevel, _location, _installDate);
        }
    }

    // check if an address is already registered or not
    function proAccntsArr(address producerAddr) public view returns (bool) {

        if (accntIndexArr[producerAddr] > 0) {
            return true;
        }
        return false;
    }

    // getting registration details
    function getProducer() public view returns (address, string memory, string memory, uint32, uint32, uint32, uint32, uint32, string memory, string memory) {
        return (msg.sender, producers[msg.sender].owner, producers[msg.sender].deviceType, producers[msg.sender].peakPowerPos, producers[msg.sender].peakPowerNeg, producers[msg.sender].latitude, producers[msg.sender].longitude, producers[msg.sender].voltageLevel, producers[msg.sender].location, producers[msg.sender].installDate);
    }

    // get registation details for individual accounts
    function getProAccntDetails(address _proAccntAddr) public view returns (string memory, string memory, uint32, string memory, uint32, uint32, string memory) {
        return (producers[_proAccntAddr].owner, producers[_proAccntAddr].deviceType, producers[_proAccntAddr].peakPowerPos, producers[_proAccntAddr].location, producers[_proAccntAddr].latitude, producers[_proAccntAddr].longitude, producers[_proAccntAddr].installDate);
    }

    // producer accounts list
    function getProAccntsList() public view returns (address[] memory) {
        return proAccntList;
    }

    // count for producer accounts
    function countProducers() public view returns (uint) {
        return (proAccntList.length) - 1;
    }

    /*
    * Energy mapping setup
    */

    // getting energy time and amount
    function setEnerProduction(uint32 _enerValue) public {
        // check if producer already exist
        if (proAccntsArr(msg.sender)) {
            enerProductions[msg.sender] = EnerProduction(now, _enerValue, block.number, blockhash(block.number - 1), tx.gasprice);

            // total energy balance
            proBalance[msg.sender] += _enerValue;

            // indidual accounts transaction history
            transactions[msg.sender].txTime.push(now) - 1;
            transactions[msg.sender].txValue.push(_enerValue) - 1;
            transactions[msg.sender].blockNumber.push(block.number);
            transactions[msg.sender].blockHash.push(blockhash(block.number - 1));
            transactions[msg.sender].txGasPrice.push(tx.gasprice) - 1;
        }

        // emit EnerProductionEvent(msg.sender, now, _enerValue);
        emit ProTransactionEvent(msg.sender, now, _enerValue, block.number, blockhash(block.number - 1), tx.gasprice);

    }

    function getEnerProduction() public view returns (address, uint, uint32) {
        return (msg.sender, enerProductions[msg.sender].enerTime, enerProductions[msg.sender].enerValue);
    }

    // getting energy production details for individual accounts

    function getProEnerProduction(address _proAccntAddr) public view returns (address, uint[] memory, uint32[] memory, uint[] memory, bytes32[] memory, uint[] memory) {
        return (_proAccntAddr, transactions[_proAccntAddr].txTime, transactions[_proAccntAddr].txValue, transactions[_proAccntAddr].blockNumber, transactions[_proAccntAddr].blockHash, transactions[_proAccntAddr].txGasPrice);
    }

    // retrieving individula producer total amount of energy produced

    function getProBalance(address _proAccntAddr) public view returns (uint) {
        return (proBalance[_proAccntAddr]);
    }

    /* Oli Coin Stuff */

    function getDeviceTypeForCoin(address addr) public view returns (string memory) {
        return producers[addr].deviceType;
    }

    function getLocationForCoin(address addr) public view returns (string memory) {
        return producers[addr].location;
    }

    function getEnerProductionForCoin(address addr) public view returns (uint32[] memory) {
        return transactions[addr].txValue;
    }

}