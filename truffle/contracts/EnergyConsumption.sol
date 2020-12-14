pragma solidity >=0.4.16 <0.6.0;

contract EnergyConsumption {
    struct Consumer {
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

    struct EnerConsumption {
        uint256 enerTime;
        uint32 enerValue;
        uint256 blockNumber;
        bytes32 blockHash;
        uint256 txGasPrice;
    }

    struct ConsTransaction {
        uint256[] txTime;
        uint32[] txValue;
        uint256[] blockNumber;
        bytes32[] blockHash;
        uint256[] txGasPrice;
    }

    event ConsumerRegs(
        address pvAddr,
        string owner,
        string deviceType,
        uint32 peakPowerPos,
        uint32 peakPowerNeg,
        uint32 latitude,
        uint32 longitude,
        uint32 voltageLevel,
        string location,
        string installDate
    );
    
    event EnerConsumptionEvent(
        address oliAddr,
        uint256 eTime,
        uint32 enerAmount
    );
  
    event ConsTransactionEvent(
        address oliAddr,
        uint256 eTime,
        uint32 enerAmount,
        uint256 blockNumber,
        bytes32 blockHash,
        uint256 txGasPrice
    );

    mapping(address => Consumer) consumers;
    mapping(address => uint256) accntIndexArr;
    mapping(address => EnerConsumption) enerConsumptions;
    mapping(address => uint256) consBalance;
    mapping(address => ConsTransaction) transactions;

    address[] public consAccntList;

    /*
     * Registration
     */

    function setConsumer(
        string memory _owner,
        string memory _deviceType,
        uint32 _peakPowerPos,
        uint32 _peakPowerNeg,
        uint32 _latitude,
        uint32 _longitude,
        uint32 _voltageLevel,
        string memory _location,
        string memory _installDate
    ) public {
        if (!consAccntsArr(msg.sender)) {
            // mapping address to index
            accntIndexArr[msg.sender] = consAccntList.length;
            consumers[msg.sender] = Consumer(
                _owner,
                _deviceType,
                _peakPowerPos,
                _peakPowerNeg,
                _latitude,
                _longitude,
                _voltageLevel,
                _location,
                _installDate
            );
            consAccntList.push(msg.sender) - 1;
            emit ConsumerRegs(
                msg.sender,
                _owner,
                _deviceType,
                _peakPowerPos,
                _peakPowerNeg,
                _latitude,
                _longitude,
                _voltageLevel,
                _location,
                _installDate
            );
        }
    }

    // check if an address is already registered or not
    function consAccntsArr(address consumerAddr) public view returns (bool) {
        if (accntIndexArr[consumerAddr] > 0) {
            return true;
        }
        return false;
    }

    // getting registration details
    function getConsumer()
        public
        view
        returns (
            address,
            string memory,
            string memory,
            uint32,
            uint32,
            uint32,
            uint32,
            uint32,
            string memory,
            string memory
        )
    {
        return (
            msg.sender,
            consumers[msg.sender].owner,
            consumers[msg.sender].deviceType,
            consumers[msg.sender].peakPowerPos,
            consumers[msg.sender].peakPowerNeg,
            consumers[msg.sender].latitude,
            consumers[msg.sender].longitude,
            consumers[msg.sender].voltageLevel,
            consumers[msg.sender].location,
            consumers[msg.sender].installDate
        );
    }

    // get registation details for individual accounts
    function getConsAccntDetails(address _consAccntAddr)
        public
        view
        returns (
            string memory,
            string memory,
            uint32,
            string memory,
            uint32,
            uint32,
            string memory
        )
    {
        return (
            consumers[_consAccntAddr].owner,
            consumers[_consAccntAddr].deviceType,
            consumers[_consAccntAddr].peakPowerPos,
            consumers[_consAccntAddr].location,
            consumers[_consAccntAddr].latitude,
            consumers[_consAccntAddr].longitude,
            consumers[_consAccntAddr].installDate
        );
    }

    // consumer accounts list
    function getConsAccntsList() public view returns (address[] memory) {
        return consAccntList;
    }

    // count for consumer accounts
    function countConsumers() public view returns (uint256) {
        return consAccntList.length;
    }

    /*
     * Energy mapping setup
     */

    // getting energy time and amount
    function setEnerConsumption(uint32 _enerValue) public {
        // check if consumer already exist
        if (consAccntsArr(msg.sender)) {
            enerConsumptions[msg.sender] = EnerConsumption(
                now,
                _enerValue,
                block.number,
                blockhash(block.number - 1),
                tx.gasprice
            );

            // total energy balance
            consBalance[msg.sender] += _enerValue;

            // indidual accounts transaction history
            transactions[msg.sender].txTime.push(now) - 1;
            transactions[msg.sender].txValue.push(_enerValue) - 1;
            transactions[msg.sender].blockNumber.push(block.number);
            transactions[msg.sender].blockHash.push(
                blockhash(block.number - 1)
            );
            transactions[msg.sender].txGasPrice.push(tx.gasprice) - 1;
        }

        emit ConsTransactionEvent(
            msg.sender,
            now,
            _enerValue,
            block.number,
            blockhash(block.number - 1),
            tx.gasprice
        );
    }

    function getEnerConsumption()
        public
        view
        returns (
            address,
            uint256,
            uint32
        )
    {
        return (
            msg.sender,
            enerConsumptions[msg.sender].enerTime,
            enerConsumptions[msg.sender].enerValue
        );
    }

    // getting energy consumption details for individual accounts

    function getConsEnerConsumption(address _consAccntAddr)
        public
        view
        returns (
            address,
            uint256[] memory,
            uint32[] memory,
            uint256[] memory,
            bytes32[] memory,
            uint256[] memory
        )
    {
        return (
            _consAccntAddr,
            transactions[_consAccntAddr].txTime,
            transactions[_consAccntAddr].txValue,
            transactions[_consAccntAddr].blockNumber,
            transactions[_consAccntAddr].blockHash,
            transactions[_consAccntAddr].txGasPrice
        );
    }

    // retrieving individula consumer total amount of energy consumed

    function getConsBalance(address _consAccntAddr)
        public
        view
        returns (uint256)
    {
        return consBalance[_consAccntAddr];
    }
}
