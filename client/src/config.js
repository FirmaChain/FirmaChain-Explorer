// export const NODE_ENDPOINT = '/api/v1';
export const NODE_ENDPOINT = 'http://localhost:4000/api/v1';

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
export const contentsInPage = 25;
export const bpsInPage = 25;
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
  account: [2, 6, 3, 4],
  block: [2, 6, 3, 4],
  txs: [2, 6, 3, 4],
};

export const txCenterList = ['Block Height'];
export const txRightList = ['Time Stamp'];
export const txLinkTo = ['block/height', 'tx/hash', 'account/from', 'account/to'];
export const txCopyList = ['Transaction Hash', 'From'];

export const txTitleList = {
  account: ['Block Height', 'Transaction Hash', 'From', 'Time Stamp'],
  block: ['Block Height', 'Transaction Hash', 'From', 'Time Stamp'],
  txs: ['Block Height', 'Transaction Hash', 'From', 'Time Stamp'],
};

export const accountListConfig = {
  titles: ['Account', 'Balance', 'Percentage', 'Transactions'],
  linkTo: ['account/account'],
  centerList: ['Percentage', 'Transactions'],
  rightList: ['Balance'],
  spaces: [6, 3, 3, 2],
};

export const blockListConfig = {
  titles: ['Block Height', 'Block Hash', 'Time Stamp', 'No.Tx', 'BP'],
  linkTo: ['block/height', 'block/hash', 'bp/bp'],
  copy: ['Block Hash'],
  centerList: ['Block Height', 'No.Tx'],
  rightList: ['Time Stamp'],
  spaces: [2, 8, 4, 2, 3],
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
    tx: ['Block Height', 'Time Stamp', 'Transaction Hash', 'Status', 'From', 'Fee', 'Memo', 'Message'],
    account: ['Account', 'Balance', 'Staking', 'Transactions'],
    bp: [
      'Address', 'Consensus PublicKey', 'Consensus Address', 'Votes', 'url', 'Alias',
      'Details', 'Commission Max Rate', 'Commission Rate', 'Jailed',
    ],
  },
  linkTo: {
    block: ['block/Prev Hash', 'bp/BP'],
    tx: ['account/From', 'account/To', 'account/from_address', 'account/to_address'],
    account: [],
    bp: ['url'],
  },
  copy: {
    block: [],
    account: [],
    tx: ['Block Height', 'Transaction Hash', 'From', 'To', 'from_address', 'to_address'],
    bp: []
  }
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
