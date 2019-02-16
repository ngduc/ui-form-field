import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import '../lib/css/spectre.css';
import '../lib/css/styles.css'; // default Theme
import { EventHandlerExample } from '../lib';

storiesOf('Event Handlers', module).add('onChange, onSubmit', () => <EventHandlerExample />);
