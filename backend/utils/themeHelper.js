const themeHelper = (theme) => {
  const themes = {
    light: {
      background: '#ffffff',
      text: '#000000',
    },
    dark: {
      background: '#121212',
      text: '#ffffff',
    },
  };

  return themes[theme] || themes.light;
};

module.exports = themeHelper;
