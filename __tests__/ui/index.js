import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../lib/css/bootstrap4.css';
import '../../lib/css/styles.css';
import { BasicExample } from '../../lib';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>uiform</h1>
        <BasicExample />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#app'));
