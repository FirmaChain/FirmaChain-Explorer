import text from './text.json';

const parseOrder = ['ko', 'en', 'zh'];
const lang = {
  en: {},
  ko: {},
  zh: {}
}

for (let key in text) {
  for (let i = 0; i < text[key].length; i++) {
    const language = parseOrder[i];

    lang[language][key] = text[key][i];

    if(!lang[language][key]) {
      lang[language][key] = lang[parseOrder[0]][key]  || ''
    }
  }
}

export default {
  en: lang.en,
  ko: lang.ko,
  zh: lang.zh,
};
