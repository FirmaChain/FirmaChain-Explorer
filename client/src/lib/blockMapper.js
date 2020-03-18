import { adder } from './bigNumCalculator';
import BigNumber from "bignumber.js";

const blockMapper = (block) => {
  let amount = '0';
  if (block.transactions) {
    block.transactions.forEach((tx) => {
      amount = adder(amount, [tx.amount]);
    });
  } else {
    // eslint-disable-next-line
    block.transactions = [];
  }

  amount =  new BigNumber(amount).shiftedBy(-6);
  amount = `${amount} FIRMA`;

  return {
    'Block Height': block.height,
    'Time Stamp': block.timestamp,
    'Block Hash': block.hash,
    'Prev Hash': block.prevHash,
    'No.Tx': block.transactions.length,
    BP: block.validator,
    Amount: amount,
  };
};

export default blockMapper;
