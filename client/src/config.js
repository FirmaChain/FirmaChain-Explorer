// export const NODE_ENDPOINT = '/api/v1';
export const NODE_ENDPOINT = 'http://api.testnet.firmachain.org/api/v1';

// SNS
export const sns = ['duite', 'telegram', 'medium', 'twitter', 'github'];
export const snsLink = {
  duite: 'https://duite.io',
  telegram: 'https://t.me/firmachain_announcement',
  medium: 'https://medium.com/firmachain',
  twitter: 'https://twitter.com/firmachain',
  github: 'https://github.com/firmachain',
};

export const privacyPolicyLink = {
  en: 'https://docs.medibloc.org/PrivacyPolicy_ENG.pdf',
  ko: 'https://docs.medibloc.org/PrivacyPolicy_KR.pdf',
};

export const blindAddress = '000000000000000000000000000000000000000000000000000000000000000000';

// INTERNAL CONFIG
export const contentsInPage = 20;
export const bpsInPage = 30;
export const subscribeMaxResponse = 4;

// STYLING CONFIG
export const navigationDisplay = 5;

// LANGUAGE
export const countryList = ['ko', 'en', 'zh'];
export const countryName = {
  ko: '한국어',
  en: 'English',
  zh: '中文',
};

// SEARCH
export const maxResult = 15;

// SPACE_LIST (component_page)
export const txSpaceList = {
  account: [15, 8, 10, 10, 12],
  block: [28, 28, 28, 16],
  txs: [15, 10, 8, 10, 10, 12],
};

export const txTitleList = {
  account: ['Transaction Hash', 'Block Height', 'From', 'To', 'Amount'],
  block: ['Transaction Hash', 'From', 'To', 'Amount'],
  txs: ['Transaction Hash', 'Type', 'Block Height', 'From', 'To', 'Amount'],
};

export const accountListConfig = {
  titles: ['Account', 'Balance', 'Percentage', 'Transactions'],
  linkTo: ['account/account'],
  spaces: [8, 2, 2, 2],
};

export const blockListConfig = {
  titles: ['Block Height', 'Time Stamp', 'Block Hash', 'No.Tx', 'BP'],
  linkTo: ['block/height', 'block/hash', 'bp/bp'],
  centerList: ['Block Height', 'No.Tx'],
  spaces: [2, 4, 9, 2, 3],
};

export const bpListConfig = {
  titles: ['Ranking', 'Alias', 'Account', 'votes', 'voteRate'],
  linkTo: ['bp/account'],
  centerList: ['Ranking'],
  rightList: ['voteRate'],
  spaces: [10, 10, 65, 20, 15],
};

export const detailWrapperConfig = {
  titles: {
    block: ['Block Height', 'Time Stamp', 'Block Hash', 'Prev Hash', 'Amount', 'No.Tx', 'BP'],
    tx: ['Transaction Hash', 'Block Height', 'Status', 'Type', 'From', 'To', 'Amount', 'Message'],
    account: ['Account', 'Balance', 'Staking', 'Transactions'],
    bp: [
      'Address', 'Consensus PublicKey', 'Consensus Address', 'Votes', 'url', 'Alias',
      'Details', 'Commission Max Rate', 'Commission Rate', 'Jailed',
    ],
  },
  linkTo: {
    block: ['block/Prev Hash', 'bp/BP'],
    tx: ['account/From', 'account/To'],
    account: [],
    bp: ['url'],
  },
};

export const tableWithIconConfig = {
  titles: {
    block: ['Block Height', 'Block Hash', 'BP', 'Time Stamp'],
    tx: ['Block Height', 'Transaction Hash', 'Type'],
    account: ['Account', 'Balance', 'Percentage', 'Transactions'],
    bp: ['Ranking', 'Account', 'Alias', 'votes'],
  },
};

export const navBarPages = ['Block', 'Transaction', 'Account', 'BP'];


export const txTypes = {
  ADD_CERTIFICATION: 'add_certification',
  BECOME_CANDIDATE: 'become_candidate',
  DATA_UPLOAD: 'add_record',
  QUIT_CANDIDATE: 'quit_candidacy',
  REVOKE_CERTIFICATION: 'revoke_certification',
  VALUE_TRANSFER: 'transfer',
  VEST: 'stake',
  VOTE: 'vote',
  WITHDRAW_VESTING: 'unstake',
};
