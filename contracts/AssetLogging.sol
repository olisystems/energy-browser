pragma solidity >=0.4.16 <0.6.0;


/// @title AssetLogging
/// @author Oli Systems GmbH
/// @notice allows admind and asset registration and event logging
/// @dev methods with safety checks that emits responses as events
contract AssetLogging {

    /// @notice this will be assigned at the construction
    address owner;
    /// @notice this will store latest DSO value for the asset 
    uint256 assetDsoValue;
    /// @notice data structure that stores an admin
    struct Admin {
        string adminName;
        address adminPubkey;
        uint8 adminType;
        bool isRegistered;
        uint registrationTime;
    }
    /// @notice data structure that stores an asset
    struct Asset {
        string assetOwner;
        string assetType;
        address ownerPubkey;
        address dsoPubkey;
        address assetPubkey;
        uint32 voltageLevel;
        uint32 peakPower;
        string location;
        string installDate;
        bool isRegistered;
        uint registrationTime;
    }

    /// @notice map pubkey to assets
    mapping(address => Asset) private assets;
    /// @notice map pubkey to admins
    mapping(address => Admin) private admins;
    /// @notice map asset ownership to admin
    mapping(address => mapping(address => bool)) private ownership;
    /// @notice map dso latest value to the asset 
    mapping(address => uint256) private dsoValueToAsset;
    /// @notice map inverter to set power or output level 
    mapping(address => uint256) private inverterSetValue;

    /// @notice event fired when registration is not successful
    event RejectRegistration(string response);
    /// @notice event fired when a new admin is registered
    event NewAdmin(string name, address pubkey, uint8 adminType, bool status, uint registrationTime);
    /// @notice event fired when a new asset is registered
    event NewAsset(string assetOwner, string assetType, address ownerPubkey, address dsoPubkey, address assetPubkey, uint32 voltageLevel, uint32 peakPower, bool status, uint registrationTime);
    /// @notice event fired when transfer of asset is not successful
    event RejectTransfer(address sender, address to, address asset, string response);
    /// @notice event fired when transfer of asset is successful
    event AssetTransfer(address sender, address to, address asset, uint transferTime);
    /// @notice event fired when set value is not successful
    event RejectSetValue(address dso, string response);
    /// @notice event fired when DSO set value is successful
    event NewDsoValue(string dsoName, address dso, string assetOwner, address asset, uint256 value, uint256 time);
    /// @notice event fired when inverter set power value is successful
    event NewInverterPower(string assetOwner, address inverter, uint256 currentPower, uint256 time);
    /// @notice event fired when inverter set output level is successful
    event NewInverterOutput(string assetOwner, address inverter, uint256 outputLevel, uint256 time);

    /// @notice assign ownership or the contract to sender
    constructor ()public{
        owner = msg.sender;
    }
    /// @notice apply a check that only passes if the function is called by owner
    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
    /// @notice allows to register admin
    /// @dev throws error is pubkey is already in use
    /// @param _adminPubkey unique ID to register admin 
    /// @param _name name of the admin
    /// @param _type 1 = owner, 2 = DSO
    /// @return emit error response
    function registerAdmin(string memory _name, address _adminPubkey, uint8 _type) onlyOwner public {
        if (admins[_adminPubkey].isRegistered || assets[_adminPubkey].isRegistered) {
            emit RejectRegistration("This address is already in use or sender is not authorized");
            return;
        }

        admins[_adminPubkey] = Admin(_name, _adminPubkey, _type, true, now);
        emit NewAdmin(admins[_adminPubkey].adminName, admins[_adminPubkey].adminPubkey, admins[_adminPubkey].adminType, admins[_adminPubkey].isRegistered, admins[_adminPubkey].registrationTime);
    }

    /// @notice allow to register asset
    /// @dev apply checks for admin and pubkey
    /// @param _name asset owner name
    /// @param _type defined asset type i.e. PV
    /// @param _ownerPubkey specify owner unique ID
    /// @param _dsoPubkey specify DSO unique ID
    /// @param _assetPubkey specify asset unique ID
    /// @param _voltageLevel specify asset voltage level
    /// @param _voltageLevel specify asset peak power
    /// @param _location specify asset location
    /// @param _installDate specify asset installation date
    /// @return emit error response
    function registerAsset(string memory _name, string memory _type, address _ownerPubkey, address _dsoPubkey, address _assetPubkey, uint32 _voltageLevel, uint32 _peakPower, string memory _location, string memory _installDate) onlyOwner public {
        if (!isOwner(_ownerPubkey)) {
            emit RejectRegistration("The admin is not registered or not an owner");
            return;
        }
        if (!isDso(_dsoPubkey)) {
            emit RejectRegistration("The admin is not registered or not an DSO");
            return;
        }
        if (assets[_assetPubkey].isRegistered || admins[_assetPubkey].isRegistered) {
            emit RejectRegistration("This address is already in use.");
            return;
        }

        assets[_assetPubkey] = Asset(_name, _type, _ownerPubkey, _dsoPubkey, _assetPubkey, _voltageLevel, _peakPower, _location, _installDate, true, now);
        ownership[_ownerPubkey][_assetPubkey] = true;
        ownership[_dsoPubkey][_assetPubkey] = true;

        emit NewAsset(assets[_assetPubkey].assetOwner, assets[_assetPubkey].assetType, assets[_assetPubkey].ownerPubkey, assets[_assetPubkey].dsoPubkey, assets[_assetPubkey].assetPubkey, assets[_assetPubkey].voltageLevel, assets[_assetPubkey].peakPower, assets[_assetPubkey].isRegistered, assets[_assetPubkey].registrationTime);
    }

    /// @notice allows trnasfer of asset
    /// @dev apply checks for asset registration and ownership
    /// @param _to address of receiver
    /// @param _assetPubkey specify asset unique ID
    /// @return emit error response
    function transferAsset(address _to, address _assetPubkey) public {
        if (!isAssetRegistered(_assetPubkey)) {
            emit RejectTransfer(msg.sender, _to, _assetPubkey, "No asset with this pubkey is registered");
            return;
        }
        if (admins[msg.sender].adminType != uint8(1)) {
            emit RejectTransfer(msg.sender, _to, _assetPubkey, "Sender is not registered as an owner");
            return;
        }
        if (admins[_to].adminType != uint8(1)) {
            emit RejectTransfer(msg.sender, _to, _assetPubkey, "Receiver is not registered as an owner");
            return;
        }
        if (!ownership[msg.sender][_assetPubkey]) {
            emit RejectTransfer(msg.sender, _to, _assetPubkey, "Sender is not owner of this asset");
            return;
        }

        ownership[msg.sender][_assetPubkey] = false;
        ownership[_to][_assetPubkey] = true;
        emit AssetTransfer(msg.sender, _to, _assetPubkey, now);

    }

    /// @notice allows to change the DSO
    /// @dev apply checks for asset registration and DSO ownership
    /// @param _to address of receiver
    /// @param _assetPubkey specify asset unique ID
    /// @return emit error response
    function changeDSO(address _to, address _assetPubkey) public {

        if (!isAssetRegistered(_assetPubkey)) {
            emit RejectTransfer(msg.sender, _to, _assetPubkey, "No asset with this pubkey is registered");
            return;
        }
        if (!isDso(msg.sender)) {
            emit RejectTransfer(msg.sender, _to, _assetPubkey, "Sender is not registered as DSO");
            return;
        }
        if (!isDso(_to)) {
            emit RejectTransfer(msg.sender, _to, _assetPubkey, "Receiver is not registered as DSO");
            return;
        }
        if (!ownership[msg.sender][_assetPubkey]) {
            emit RejectTransfer(msg.sender, _to, _assetPubkey, "Sender is not DSO of this asset");
            return;
        }

        ownership[msg.sender][_assetPubkey] = false;
        ownership[_to][_assetPubkey] = true;
        emit AssetTransfer(msg.sender, _to, _assetPubkey, now);

    }

    /// @notice checks owner registration
    /// @dev checks if pubkey is registered as owner or not
    /// @param _ownerPubkey unique ID for owner
    /// @return return true only for owner, else false
    function isOwner(address _ownerPubkey) internal view returns (bool){

        if (admins[_ownerPubkey].adminType == uint8(1)) {
            return true;
        }

        return false;
    }

    /// @notice checks DSO registration
    /// @dev checks if pubkey is registered as dso or not
    /// @param _dsoPubkey unique ID for DSO
    /// @return return true only for DSO, else false
    function isDso(address _dsoPubkey) internal view returns (bool){

        if (admins[_dsoPubkey].adminType == uint8(2)) {
            return true;
        }

        return false;
    }

    /// @notice checks if owner owns a specific asset
    /// @dev ownership status is available to public
    /// @param _ownerPubkey unique ID of owner
    /// @param _assetPubkey unique ID of asset
    /// @return true if owner owns a specific asset
    function isOwnerOf(address _ownerPubkey, address _assetPubkey) public view returns (bool){
        if (!ownership[_ownerPubkey][_assetPubkey] || admins[_ownerPubkey].adminType != uint8(1)) {
            return false;
        }

        return true;
    }

    /// @notice get asset details
    /// @dev asset details are public
    /// @param _pubkey unique ID for the asset
    /// @return asset details
    function getAsset(address _pubkey) public view returns (string memory, address, address, bool){
        return (assets[_pubkey].assetType, assets[_pubkey].ownerPubkey, assets[_pubkey].dsoPubkey, assets[_pubkey].isRegistered);
    }

    /// @notice get admin details
    /// @dev admin details are public
    /// @param _pubkey unique ID for the admin
    /// @return admin details
    function getAdmin(address _pubkey) public view returns (address, string memory, uint8, bool){
        return (admins[_pubkey].adminPubkey, admins[_pubkey].adminName, admins[_pubkey].adminType, admins[_pubkey].isRegistered);
    }

    /// @notice checks asset registartion
    /// @dev will be available to call inside other methods
    /// @param _assetPubkey unique ID of asset
    /// @return true if asset if registered
    function isAssetRegistered(address _assetPubkey) internal view returns (bool){
        if (assets[_assetPubkey].isRegistered) {
            return true;
        }

        return false;
    }

    /// @notice allows dso to set value
    /// @dev checks asset registration and ownership
    /// @param _assetPubkey unique ID of asset
    /// @param _value energy value to set
    function setDsoValue(address _assetPubkey, uint256 _value) public {

        if (!isDso(msg.sender) || !ownership[msg.sender][_assetPubkey]) {
            emit RejectSetValue(msg.sender, "Sender is either not registered as DSO or DSO of the asset or asset is not registered");
            return;
        }

        dsoValueToAsset[_assetPubkey] = _value;
        string memory assetOwnerName = assets[_assetPubkey].assetOwner;
        string memory dsoName = admins[msg.sender].adminName;

        emit NewDsoValue(dsoName, msg.sender, assetOwnerName, _assetPubkey, _value, now);

    }

    /// @notice return latest DSO set value for the asset
    /// @param _assetPubkey ID of asset
    function getDsoLatestValue(address _assetPubkey) public view returns (uint256){
        return (dsoValueToAsset[_assetPubkey]);
    }

    /// @notice allows inverter to set power value
    /// @dev checks inverter registration
    /// @param _currentPower power value to send
    function setInverterPower(uint256 _currentPower) public {
        if (!assets[msg.sender].isRegistered) {
            emit RejectSetValue(msg.sender, "Inverter is not registered");
            return;
        }

        string memory assetOwnerName = assets[msg.sender].assetOwner;
        emit NewInverterPower(assetOwnerName, msg.sender, _currentPower, now);

    }

    /// @notice allows inverter to set output level
    /// @dev checks inverter registration
    /// @param _outputLevel output level to send
    function setInverterOutput(uint256 _outputLevel) public {
        if (!assets[msg.sender].isRegistered) {
            emit RejectSetValue(msg.sender, "Inverter is not registered");
            return;
        }

        string memory assetOwnerName = assets[msg.sender].assetOwner;
        emit NewInverterOutput(assetOwnerName, msg.sender, _outputLevel, now);

    }

}
