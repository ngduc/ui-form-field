import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import '../lib/css/spectre.css';
import '../lib/css/styles.css'; // default Theme
import { BasicExample, DynamicFormExample } from '../lib';

storiesOf('Basic', module)
  .add('Basic', () => <BasicExample />)
  .add('Dynamic Form', () => <DynamicFormExample />);
