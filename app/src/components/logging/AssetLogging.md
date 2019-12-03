# Asset Logging

The AssetLogging smart contract allows registration of admins, both asset owners and DSO's, event logging and setting up the flexibilites. 

## Key Functions

### Contract `owner`
The owner of the contract is the account deoploying the contract. This will done through `constructor` of the contract.

### `registerAdmin`
This function will use an Ethereum address to register a new admin, either DSO or asset owner, provided the address is already not in use.

### `registerAsset`
A new asset will be registered with bunch of attributes using the Ethereum address, provided the address is already not in use.

### `transferAsset`
The function will change the ownership of an existing asset.

### `changeDSO`
The function will change the DSO of a registered asset to another DSO.

### `setDsoValue`
The function allows DSO's to set values for the registered assets 