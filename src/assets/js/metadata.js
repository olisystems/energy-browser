const assetLogging = '0xc26AF96EB868a4cdD68aBe671d91C6ae37743dD0';
const assetLoggingABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"response","type":"string"}],"name":"RejectRegistration","type":"event","signature":"0x6d0d59fdf2ac0871a671b5687443bbeb629ce41626493893c8a66aa36f368342"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pubkey","type":"address"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"adminType","type":"uint8"},{"indexed":false,"name":"status","type":"bool"},{"indexed":false,"name":"registrationTime","type":"uint256"}],"name":"NewAdmin","type":"event","signature":"0xd3f278d36045796d3b71e05b76041035177e7afbcabe25f6c509f0682c3efbca"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetType","type":"string"},{"indexed":false,"name":"ownerPubkey","type":"address"},{"indexed":false,"name":"dsoPubkey","type":"address"},{"indexed":false,"name":"assetPubkey","type":"address"},{"indexed":false,"name":"voltageLevel","type":"uint32"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"installDate","type":"string"},{"indexed":false,"name":"status","type":"bool"},{"indexed":false,"name":"registrationTime","type":"uint256"}],"name":"NewAsset","type":"event","signature":"0x5ee77b707df7574436468681a54871d4733dfaa102139ad15cb9417d9be7c7ff"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"response","type":"string"}],"name":"RejectTransfer","type":"event","signature":"0xede62a3dd161bdd1c24656cde7ce7d6c14d9cdba4a8677de5b0c1632a67f3c9c"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"transferTime","type":"uint256"}],"name":"AssetTransfer","type":"event","signature":"0xa405f30150336d44a72f36a81c570cd0e7c9f9dda44a9e0a152c8458f6b3aa57"},{"anonymous":false,"inputs":[{"indexed":false,"name":"dso","type":"address"},{"indexed":false,"name":"response","type":"string"}],"name":"RejectSetValue","type":"event","signature":"0x4f157992bf426424c29fbf811fe13899af10c81ed0357223775f2032b7606fb7"},{"anonymous":false,"inputs":[{"indexed":false,"name":"dso","type":"address"},{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"NewDsoValue","type":"event","signature":"0xfbf1cd2c2397c70edbb086d2f15b8de22acf2b3c31b1599905cc56a30f9de9c9"},{"anonymous":false,"inputs":[{"indexed":false,"name":"inverter","type":"address"},{"indexed":false,"name":"currentPower","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"NewInverterPower","type":"event","signature":"0xf60e8e0a4d6a3c6d05c3c887d3471e5d316b05c2835eb21c589b666dad04e4cf"},{"anonymous":false,"inputs":[{"indexed":false,"name":"inverter","type":"address"},{"indexed":false,"name":"outputLevel","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"NewInverterOutput","type":"event","signature":"0xe78e0b94bdb53b157609c33ef67dc97e0371a92acaa0e0c4c500704c06ae2d03"},{"constant":false,"inputs":[{"name":"_adminPubkey","type":"address"},{"name":"_name","type":"string"},{"name":"_type","type":"uint8"}],"name":"registerAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x2825bafa"},{"constant":false,"inputs":[{"name":"_type","type":"string"},{"name":"_ownerPubkey","type":"address"},{"name":"_dsoPubkey","type":"address"},{"name":"_assetPubkey","type":"address"},{"name":"_voltageLevel","type":"uint32"},{"name":"_location","type":"string"},{"name":"_installDate","type":"string"}],"name":"registerAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xb4833168"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_assetPubkey","type":"address"}],"name":"transferAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x8eab45ba"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_assetPubkey","type":"address"}],"name":"changeDSO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x41c9743e"},{"constant":true,"inputs":[{"name":"_ownerPubkey","type":"address"},{"name":"_assetPubkey","type":"address"}],"name":"isOwnerOf","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xf582bceb"},{"constant":true,"inputs":[{"name":"_pubkey","type":"address"}],"name":"getAsset","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x30b8b2c6"},{"constant":true,"inputs":[{"name":"_pubkey","type":"address"}],"name":"getAdmin","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x64efb22b"},{"constant":false,"inputs":[{"name":"_assetPubkey","type":"address"},{"name":"_value","type":"uint256"}],"name":"setDsoValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x1c04ec97"},{"constant":true,"inputs":[{"name":"_dsoPubkey","type":"address"}],"name":"getDsoValues","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xb4064bfe"},{"constant":true,"inputs":[{"name":"_assetPubkey","type":"address"}],"name":"getDsoLatestValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xed2b160b"},{"constant":false,"inputs":[{"name":"_currentPower","type":"uint256"}],"name":"setInverterPower","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x41068545"},{"constant":false,"inputs":[{"name":"_outputLevel","type":"uint256"}],"name":"setInverterOutput","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xb6b745b3"}];
module.exports = { assetLogging, assetLoggingABI };