import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles.css';

// import '../../lib/css/bootstrap3.css';
import '../../lib/css/bootstrap4.css';
// import '../../lib/css/spectre.css';
// import '../../lib/css/semanticui2.css';
import '../../lib/css/styles.css'; // default Theme
import { BasicExample, DynamicFormExample, EventHandlerExample, FieldTypeExample, LayoutExample } from '../../lib';

const Views = {
  BasicExample,
  FieldTypeExample,
  DynamicFormExample,
  EventHandlerExample,
  LayoutExample
};

class Demo extends Component {
  state = { view: 'BasicExample' };

  show = ev => {
    this.setState({ view: ev.target.dataset.name });
  };

  render() {
    const View = Views[this.state.view];
    return (
      <div style={{ width: '70%' }}>
        <h1>Demo</h1>

        <nav style={{ marginBottom: 10 }}>
          {Object.keys(Views).map(v => {
            return (
              <a href="javascript:;" data-name={v} onClick={this.show} style={{ marginRight: 20 }}>
                {v}
              </a>
            );
          })}
        </nav>

        <View />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
