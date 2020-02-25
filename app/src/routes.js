import Browser from './components/browser/Browser.vue';
import Explorer from './components/explorer/Explorer.vue';
import Tokenization from './components/tokenization/Tokenization.vue';
import AssetLogging from './components/logging/AssetLogging.vue';
import ChargingOrigin from './components/origin/ChargingOrigin.vue';

const routes = [
    { path: '/', component: Browser },
    { path: '/explorer', component: Explorer },
    { path: '/tokenization', component: Tokenization },
    { path: '/logging', component: AssetLogging },
    { path: '/origin', component: ChargingOrigin }
];

export default routes;