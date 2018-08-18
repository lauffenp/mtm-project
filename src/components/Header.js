import React from 'react';
import { Input } from 'semantic-ui-react';
import topbar from '../img/topbar.png';
import lowbarRt from '../img/lowbar_rt.png';
import lowbarLft from '../img/lowbar_lft.png';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
  }

  handleRef(r) {
    this.inputRef = r
  }

  focus() {
    this.inputRef.focus()
  }

  render() {
    const {disabled} = this.state;
    const { name, onChangeName } = this.props;
    return (
      <header className="App-header">
        <div className="top-bar-bg">
          <img src={topbar} width="100%" />
        </div>
        <div className="bottom-bar-bg">
          <img src={lowbarLft} className="align-left no-rt-margin" />
          <Input
            value={name}
            onChange={({target: {value}}) => onChangeName({ value })}
            className="align-left"
            disabled={disabled}
            ref={r => this.handleRef(r)}
            label={
              <i
                className = "far fa-edit"
                onClick={() => {
                  this.setState({
                    disabled: !disabled,
                  }, () => { if (disabled) this.focus(); })
                }}
              />
            }
            labelPosition="right"
          />
          <img src={lowbarRt} className="align-right"/>
        </div>
      </header>
    );
  }
};
