let api = '/api/v1';
if (process.env.REACT_APP_ENV === 'production') {
  api = 'http://api.firmachain.org/api/v1';
} else if (process.env.REACT_APP_ENV === 'testnet') {
  api = 'http://api.testnet.firmachain.org/api/v1';
} else if (process.env.REACT_APP_ENV === 'dev') {
  //api = 'http://api.testnet.firmachain.org/api/v1';
  api = 'http://localhost:4000/api/v1';
}

console.log(process.env.REACT_APP_ENV);

export const NODE_ENDPOINT = api;

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
export const navigationDisplay = 10;
export const navigationDisplayMobile = 5;

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
  desktop: [2, 6, 3, 3],
  mobile: [6, 4]
};

export const txCenterList = ['Block Height', 'Time Stamp'];
export const txRightList = [];
export const txLinkTo = ['block/height', 'tx/hash', 'account/from', 'account/to'];
export const txCopyList = ['Transaction Hash', 'From'];

export const txTitleList = {
  desktop: ['Block Height', 'Transaction Hash', 'From', 'Time Stamp'],
  mobile: ['Transaction Hash', 'Time Stamp']
};

export const accountListConfig = {
  titles: ['Account', 'Balance', 'Percentage', 'Transactions'],
  mtitles: ['Account', 'Balance'],
  linkTo: ['account/account'],
  centerList: ['Percentage', 'Transactions'],
  rightList: ['Balance'],
  spaces: [6, 3, 3, 2],
  mspaces: [6, 4],
};

export const blockListConfig = {
  titles: ['Block Height', 'Block Hash', 'Time Stamp', 'No.Tx', 'BP'],
  mtitles: ['Block Height', 'No.Tx', 'Time Stamp'],
  linkTo: ['block/height', 'block/hash', 'bp/bp'],
  copy: ['Block Hash'],
  centerList: ['Block Height', 'Time Stamp', 'No.Tx'],
  rightList: [],
  spaces: [2, 8, 4, 2, 3],
  mspaces: [30, 15, 30]
};

export const bpListConfig = {
  titles: ['Ranking', 'Alias', 'Account', 'votes', 'voteRate'],
  mtitles: ['Ranking', 'Account', 'voteRate'],
  linkTo: ['bp/account'],
  centerList: ['Alias', 'Ranking'],
  rightList: ['voteRate'],
  spaces: [10, 30, 55, 20, 15],
  mspaces: [10, 60, 30],
};

export const detailWrapperConfig = {
  titles: {
    block: ['Block Height', 'Time Stamp', 'Block Hash', 'Prev Hash', 'No.Tx', 'BP'],
    tx: ['Block Height', 'Time Stamp', 'Transaction Hash', 'Status', 'From', 'Fee', 'Memo', 'Message'],
    account: ['Account', 'Balance', 'Percentage', 'Staking', 'Transactions'],
    bp: [
      'Address', 'Consensus PublicKey', 'Consensus Address', 'Votes', 'url', 'Alias',
      'Details', 'Commission Max Rate', 'Commission Rate', 'Jailed',
    ],
  },
  linkTo: {
    block: ['block/Prev Hash', 'bp/BP'],
    tx: ['block/Block Height', 'account/From', 'account/To', 'account/from_address', 'account/to_address'],
    account: [],
    bp: ['url'],
  },
  copy: {
    block: ['Block Height', 'Block Hash', 'Prev Hash', 'BP'],
    account: ['Account'],
    tx: ['Block Height', 'Transaction Hash', 'From', 'To', 'from_address', 'to_address'],
    bp: []
  }
};

export const tableWithIconConfig = {
  titles: {
    block: ['Block Height', 'Block Hash', 'BP', 'Time Stamp'],
    tx: ['Block Height', 'Transaction Hash', 'Type', 'Time Stamp'],
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
