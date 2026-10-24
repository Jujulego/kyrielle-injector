import { aroundAll, aroundEach } from 'vitest';
import { rootScope$, runIn$, scope$ } from './node.js';

aroundAll((runSuite) => runIn$(rootScope$('suite'), runSuite));
aroundEach((runTest) => runIn$(scope$('test'), runTest));
