# Asset Logging and Flex Control

This application enables a DSO or TSO to transparently control assets in their respective grid area. Some examples for this are the curtailment of PV in case of a local over-supply or the control of a battery that is supplying a local energy community.
This process is usually being done with uni-directional radio transmissions from the grid operator to the asset, which is highly inaccurate and not suitable for state-of-the-art smart grids. Also, it is rather intransparent. The asset owners have to trust the grid operators to make the right choices - and also to reimburse them correctly for any lost revenues in the case of pv curtailment.

With an increasing amount of assets, participants and control processes in general, there is a demand for a platform that can integrate the following steps into one workflow:

- Onboard Assets, asset owners and grid operators in a quick and simple way with low costs
- Enable the grid operators to securely control assets
- Log every control process to enforce transparency for the participants

The backbone of this application is the testnet "Volta" of the Energy Web Foundation. Every device owns their own keypair which are being registered inside the smart contracts. These smart contracts also take care of the access restriction and the logging process. The participants don´t have to trust each other because the blockchain takes care of this, which reduces legal overhead.

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