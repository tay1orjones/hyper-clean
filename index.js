const colors = require('./ibm-design-colors/source/colors');

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

const themeColors = {
  black: color('black', 'core'),
  lightBlack: color('gray', '80'),

  red: color('red', 'core'),
  lightRed: color('red', 'core'),

  green: color('green', 'core'),
  lightGreen: color('green', 'core'),

  yellow: color('yellow', 'core'),
  lightYellow: color('yellow', 'core'),

  blue: color('blue', 'core'),
  lightBlue: color('blue', 'core'),

  magenta: color('magenta', 'core'),
  lightMagenta: color('magenta', 'core'),

  cyan: color('cerulean', 'core'),
  lightCyan: color('cerulean', 'core'),

  white: color('white', 'core'),
  lightWhite: color('gray', '10')
};

exports.decorateConfig = (config) => {

  colors.palettes.find(color => color.name === 'black');

  return Object.assign({}, config, {
    borderColor: colors.palettes.,
    cursorColor: 'yellow',
    css: `
      ${config.css || ''}
      .tabs_nav .tabs_list .tab_text {
        color: yellow;
      }
      .tabs_nav .tabs_title {
        color: yellow;
      }
    `
  });
}
