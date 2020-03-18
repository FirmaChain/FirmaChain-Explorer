import { merge } from 'lodash';

import defaultConfig from './default';
import development from './development';

const configs = {
  development,
};

export default merge({}, defaultConfig, configs[process.env.NODE_ENV] || {});
