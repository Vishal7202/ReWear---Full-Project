const languageHelper = (lang) => {
  const messages = {
    en: {
      welcome: 'Welcome to ReWear!',
      error: 'Something went wrong!',
    },
    hi: {
      welcome: 'ReWear में आपका स्वागत है!',
      error: 'कुछ गलत हो गया!',
    },
  };

  return messages[lang] || messages.en;
};

module.exports = languageHelper;
