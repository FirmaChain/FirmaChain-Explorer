import BigNumber from "bignumber.js";

const bpMapper = (bp) => {
  const additionalInfo = {
    url: null,
    Alias: null,
    Details: null,
    'Commission Max Rate': '',
    'Commission Rate': '',
  };

  if (bp.data && bp.data.description) {
    const url = bp.data.description.website;
    additionalInfo.url = (url === '' || url.indexOf('https://') === 0 || url.indexOf('http://') === 0) ? url : `http://${url}`;
    additionalInfo.Alias = bp.data.description.moniker;
    additionalInfo.Details = bp.data.description.details;
    additionalInfo['Commission Max Rate'] = `${(parseFloat(bp.data.commission.commission_rates.max_rate) * 100).toFixed(2)} %`;
    additionalInfo['Commission Rate'] = `${(parseFloat(bp.data.commission.commission_rates.rate) * 100).toFixed(2)} %`;
  }

  const votes = new BigNumber(bp.votes);

  return {
    Address: bp.address,
    Account: bp.address,
    Votes: `${votes.shiftedBy(-6).toString().comma()} FIRMA`,
    'Consensus PublicKey': bp.consensusPubKey,
    'Consensus Address': bp.consensusAddr,
    Jailed: bp.jailed ? 'Yes' : 'No',
    ...additionalInfo,
  };
};

export default bpMapper;
