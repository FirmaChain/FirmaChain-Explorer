import {Router} from 'express';

import {data} from './controller';
import wrap from '../utils/controller';

export default Router()
  .get('/', wrap(data))
