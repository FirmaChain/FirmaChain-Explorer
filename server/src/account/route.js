import { Router } from 'express';

import { get, total, list } from './controller';
import wrap from '../utils/controller';

export default Router()
  .get('/', wrap(list))
  .get('/total', wrap(total))
  .get('/:id', wrap(get));