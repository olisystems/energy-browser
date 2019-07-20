import Browser from './components/browser/Browser.vue';
import Explorer from './components/explorer/Explorer.vue';
import Tokenization from './components/tokenization/Tokenization.vue';
import AssetLogging from './components/logging/AssetLogging.vue';

const routes = [
    { path: '/', component: Browser },
    { path: '/explorer', component: Explorer },
    { path: '/tokenization', component: Tokenization },
    { path: '/logging', component: AssetLogging }
];

export default routes;