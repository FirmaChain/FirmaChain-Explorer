import { merge } from 'lodash';

import defaultConfig from './default';
import testnet from './testnet';
import development from './development';

const configs = {
  development,
  testnet,
};

export default merge({}, defaultConfig, configs[process.env.NODE_ENV] || {});
