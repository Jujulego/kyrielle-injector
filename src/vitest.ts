import { aroundAll, aroundEach } from 'vitest';
import { rootScope$, runIn$, scope$ } from './node.js';

aroundAll((runSuite, {}, suite) => {
  if ('filepath' in suite) {
    return runIn$(rootScope$(`[[suite:${suite.name}]]`), runSuite);
  } else {
    return runIn$(scope$(`[[suite:${suite.name}]]`), runSuite);
  }
});
aroundEach((runTest, {}, suite) => {
  return runIn$(scope$(`[[test:${suite.name}]]`), runTest);
});
