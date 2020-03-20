import { BigNumber } from 'bignumber.js';


const adder = (target, addNums = [], fixed = 0) => {
  let targetNum = new BigNumber(target);
  addNums.forEach((add) => {
    const adderNum = new BigNumber(add);
    targetNum = targetNum.plus(adderNum);
  });
  return targetNum.toFixed(fixed).toString();
};

const divider = (target, divideNums = [], fixed = 0) => {
  if(!Array.isArray(divideNums))
    return ;

  let targetNum = new BigNumber(target);
  divideNums.forEach((div) => {
    const dividerNum = new BigNumber(div);
    targetNum = targetNum.dividedBy(dividerNum);
  });
  return targetNum.toFixed(fixed).toString();
};

export {
  adder,
  divider,
};
