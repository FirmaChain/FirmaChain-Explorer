import { adder, divider } from './bigNumCalculator';

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

  const tempAmount = divider(amount, [10 ** 6], 6).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  amount = `${tempAmount.join('.')} FIRMA`;

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
