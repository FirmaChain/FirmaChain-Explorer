import { close } from './index';

import Account from '../account/model';
import Block from '../block/model';
import Transaction from '../transaction/model';
import Candidate from '../candidate/model';

const reset = () => [Transaction, Candidate, Account, Block].reduce(
  (promise, model) => promise.then(() => model.destroy({
    where: {},
    // truncate: true,
  })),
  Promise.resolve(),
).then(close);

export default reset;

if (require.main === module) {
  reset();
}
