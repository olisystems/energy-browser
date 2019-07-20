import Browser from './components/Browser.vue';
import Explorer from './components/Explorer.vue';
import Tokenization from './components/Tokenization.vue';
import AssetLogging from './components/AssetLogging.vue';

const routes = [
    { path: '/', component: Browser },
    { path: '/explorer', component: Explorer },
    { path: '/tokenization', component: Tokenization },
    { path: '/logging', component: AssetLogging }
];

export default routes;