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

  return {
    Address: bp.address,
    Account: bp.address,
    votes: bp.votes,
    Votes: `${bp.votes} FIRMA`,
    'Consensus PublicKey': bp.consensusPubKey,
    'Consensus Address': bp.consensusAddr,
    Jailed: bp.jailed ? 'Yes' : 'No',
    ...additionalInfo,
  };
};

export default bpMapper;
