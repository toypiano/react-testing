import React, { Component } from "react";
import { connect } from "react-redux";

import { guessWord } from "./actions/";

export class UnconnectedInput extends Component {
  state = {
    value: ""
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({
      value
    });
  };
  render() {
    const contents = this.props.success ? null : (
      <form className="form-inline mb-3">
        <input
          data-test="input-control"
          className="form-control mr-2"
          type="text"
          placeholder="enter guess"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary"
          type="submit"
          onClick={() => this.props.guessWord(this.state.value)}
        >
          Submit
        </button>
      </form>
    );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapState = ({ success }) => ({ success });

export default connect(mapState, { guessWord })(UnconnectedInput);
