import { close } from './index';

import Account from '../account/model';
import Block from '../block/model';
import Transaction from '../transaction/model';
import Candidate from '../candidate/model';
import Analytics from '../analytics/model';

const sync = () => [Candidate, Account, Block, Transaction, Analytics].reduce(
  (promise, model) => promise.then(() => model.sync({ alter: true })),
  Promise.resolve(),
).then(close);

export default sync;

if (require.main === module) {
  sync();
}
