import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AssignmentGroupItem extends Component {
  /**
   * Render AssignmentGroupItem
   */
  render() {
    const {
      name,
      id,
      onChange,
      currentAssignmentGroupIdsToCount,
    } = this.props;

    return (
      <div className="assignmentgroupitem-container">
        <div className="form-check">
          <label className="form-check-label" htmlFor="exampleCheck1">
            <input
              type="checkbox"
              className="form-check-input"
              id={`checkbox-${id}`}
              onChange={() => {
                onChange(id, !(currentAssignmentGroupIdsToCount.indexOf(id) > -1));
              }}
            />
            {name}
          </label>
        </div>
      </div>
    );
  }
}

AssignmentGroupItem.propTypes = {
  // Name displayed next to checkbox
  name: PropTypes.string.isRequired,
  // Id of current assignment group
  id: PropTypes.number.isRequired,
  // Handler for when assignment group checkboxes are changed
  onChange: PropTypes.func.isRequired,
  // ^ call with two arguments: (id, isBeingAdded)
  // Currently checked assignment group ids
  currentAssignmentGroupIdsToCount:
    PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default AssignmentGroupItem;
