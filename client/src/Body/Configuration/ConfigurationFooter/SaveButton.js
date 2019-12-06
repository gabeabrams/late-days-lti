import React, { Component } from 'react';
import PropTypes from 'prop-types';
class SaveButton extends Component {
  /**
   * Render SaveButton
   */
  render() {
    const {
      onSaveClicked,
    } = this.props;

    return (
      <div className="savebutton-container">
        <button type="button" className="btn btn-success btn-lg">Success</button>
      </div>
    );
  }
}

SaveButton.propTypes = {
  onSaveClicked: PropTypes.func.isRequired,
};


export default SaveButton;