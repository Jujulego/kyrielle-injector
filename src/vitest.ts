import { aroundAll, aroundEach } from 'vitest';
import { rootScope$, runIn$, scope$ } from './node.js';

aroundAll((runSuite, ctx, suite) => {
  if ('filepath' in suite) {
    return runIn$(rootScope$(`[[suite:${suite.name}]]`), runSuite);
  } else {
    return runIn$(scope$(`[[suite:${suite.name}]]`), runSuite);
  }
});
aroundEach((runTest, ctx, suite) => {
  return runIn$(scope$(`[[test:${suite.name}]]`), runTest);
});
