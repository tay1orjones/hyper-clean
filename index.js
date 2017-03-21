const colors = require('ibm-design-colors/source/colors');

// return color by given grade, supports 'core' grade
color = (name, grade) => {
  grade = grade.toString();
  const colorFamily = colors.palettes.find(color => color.name === name);

  if (grade === 'core'){
    return '#' + colorFamily.values.find(value => value.grade === colorFamily.core).value
  } else {
    return '#' + colorFamily.values.find(value => value.grade === grade).value
  }
}

exports.decorateConfig = (config) => {

  exports.onWindow = (browserWindow) => {
    browserWindow.setVibrancy('dark');
  };

  return Object.assign({}, config, {
    backgroundColor: 'rgba(27, 40, 52, .7)',
    foregroundColor: color('blue', 10),
    borderColor: color('blue', 80),
    cursorColor: color('blue', 40),
    colors: {
      black: color('black', 'core'),
      lightBlack: color('gray', 80),

      red: color('red', 'core'),
      lightRed: color('red', 30),

      green: color('green', 30),
      lightGreen: color('lime', 20),

      yellow: color('gold', 'core'),
      lightYellow: color('yellow', 'core'),

      blue: color('blue', 'core'),
      lightBlue: color('aqua', '20'),

      magenta: color('magenta', 'core'),
      lightMagenta: color('magenta', 30),

      cyan: color('teal', 'core'),
      lightCyan: color('teal', 20),

      white: color('white', 'core'),
      lightWhite: color('gray', 10)
    },
    css: `
      ${config.css || ''}
      .tabs_nav .tabs_list .tab_text {
        color: ${color('blue', 40)};
      }
      .tabs_nav .tabs_title {
        color: ${color('blue', 40)};
      }
    `
  });
}
