import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// addDecorator(
//   withInfo({
//     inline: true,
//     source: true,
//     header: false // Global configuration for the info addon across all of your stories.
//   })
// );

configure(loadStories, module);
