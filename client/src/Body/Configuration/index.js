import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import caccl
import initCACCL from 'caccl/client/cached';

// Import other components
import AssignmentGroups from './AssignmentGroups';
import Rules from './Rules';
import LoadingSpinner from '../../shared/LoadingSpinner';
import Modal from '../../shared/Modal';
import ConfigurationFooter from './ConfigurationFooter';

// Import constants
import METADATA_ID from '../../METADATA_ID';

// Import styles
import './Configuration.css';

// Initialize caccl
const { api } = initCACCL();

class Configuration extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const {
      initialGracePeriodMin,
      initialMaxLateDaysPerSemester,
      initialMaxLateDaysPerAssignment,
      initialAssignmentGroupIdsToCount,
    } = this.props;

    // Initialize state
    this.state = {
      // If true, the configuration is being saved
      saving: false,
      // Validation error to show in a modal
      validationErrorText: null,
      // Current grace period from form
      currentGracePeriodMin: String(initialGracePeriodMin),
      // Current max late days per semester from form
      currentMaxLateDaysPerSemester: String(initialMaxLateDaysPerSemester),
      // current max late days per assignment from form
      currentMaxLateDaysPerAssignment: String(initialMaxLateDaysPerAssignment),
      // current assignment groups checked
      currentAssignmentGroupIdsToCount: initialAssignmentGroupIdsToCount,
    };

    // Bind handlers
    this.attemptSave = this.attemptSave.bind(this);
  }

  attemptSave() {
    // Deconstruct state
    const {
      currentGracePeriodMin,
      currentMaxLateDaysPerSemester,
      currentMaxLateDaysPerAssignment,
      currentAssignmentGroupIdsToCount,
    } = this.state;

    // Deconstruct props
    const {
      onNewMetadata,
    } = this.props;

    // Validate grace period
    if (!currentGracePeriodMin || currentGracePeriodMin.trim().length === 0) {
      // No grace period
      return this.setState({
        validationErrorText: 'Please provide a grace period. Put zero for no grace period.',
      });
    }
    if (Number.isInteger(currentGracePeriodMin)) {
      // No grace period
      return this.setState({
        validationErrorText: 'The grace period should be an integer.',
      });
    }
    const gracePeriodMin = parseInt(currentGracePeriodMin, 10);
    if (gracePeriodMin < 0) {
      // No grace period
      return this.setState({
        validationErrorText: 'The grace period must be 0 or a positive number.',
      });
    }

    // Validate max late days per assignment
    // TODO: write validation
    const maxLateDaysPerAssignment = parseInt(
      currentMaxLateDaysPerAssignment,
      10
    );
    // TODO: write validation

    // Validate max late days per semester
    // TODO: write validation
    const maxLateDaysPerSemester = parseInt(
      currentMaxLateDaysPerSemester,
      10
    );
    // TODO: write validation

    // Validate assignment group ids
    // TODO: write validation
    const assignmentGroupIdsToCount = currentAssignmentGroupIdsToCount;
    // TODO: write validation

    // TODO: remove this
    // if (
    //   // Make sure all options exists
    //   currentGracePeriodMin
    //   && currentMaxLateDaysPerAssignment
    //   && currentMaxLateDaysPerSemester
    //   && currentAssignmentGroupIdsToCount
    //   // Make sure they have the right types
    //   && typeof (currentGracePeriodMin) === 'string'
    //   && typeof (currentMaxLateDaysPerAssignment) === 'string'
    //   && typeof (currentMaxLateDaysPerSemester) === 'string'
    //   && Array.isArray(currentAssignmentGroupIdsToCount)
    //   // Make sure numbers are in the proper range
    //   && Number(currentGracePeriodMin) >= 0
    //   && Number(currentMaxLateDaysPerSemester) > 0
    //   && Number(currentMaxLateDaysPerAssignment) > 0
    //   // Make sure caps make sense
    //   && currentMaxLateDaysPerSemester >= currentMaxLateDaysPerAssignment
    //   // Make sure there is at least one assignment group selected
    //   && currentAssignmentGroupIdsToCount.length >= 1
    // );

    // Create metadata object & update caccl-api
    const configuration = {
      gracePeriodMin,
      maxLateDaysPerSemester,
      maxLateDaysPerAssignment,
      assignmentGroupIdsToCount,
    };
    onNewMetadata(configuration);
  }

  /**
   * Render Configuration
   */
  render() {
    // Deconstruct props
    const {
      assignmentGroups,
      onNewMetadata,
      onCancel,
    } = this.props;

    // Deconstruct state
    const {
      saving,
      currentGracePeriodMin,
      currentMaxLateDaysPerSemester,
      currentMaxLateDaysPerAssignment,
      currentAssignmentGroupIdsToCount,
      validationErrorText,
    } = this.state;

    // Show saving spinner
    if (saving) {
      return (
        <LoadingSpinner />
      );
    }

    // Show validation error
    const validationModal = (
      (validationErrorText && validationErrorText.length > 0)
        ? (
          <Modal
            title="Please fix the following:"
            type="okay"
            body={validationErrorText}
            onClose={() => {
              this.setState({
                validationErrorText: null,
              });
            }}
          />
        )
        : null
    );

    // TODO: Delete this next line (debug statement)
    console.log('CURRENT: ', currentGracePeriodMin);

    return (
      <div className="configuration-container content-container">
        {validationModal}
        <Rules
          gracePeriodMin={currentGracePeriodMin}
          onGracePeriodChanged={(newGracePeriodMin) => {
            this.setState({
              currentGracePeriodMin: newGracePeriodMin,
            });
          }}
          maxLateDaysPerAssignment={currentMaxLateDaysPerAssignment}
          maxLateDaysPerSemester={currentMaxLateDaysPerSemester}
          onMaxLateDaysPerSemesterChanged={(newMaxLateDaysPerSemester) => {
            this.setState({
              currentMaxLateDaysPerSemester: newMaxLateDaysPerSemester,
            });
          }}
          onMaxLateDaysPerAssignmentChanged={(newMaxLateDaysPerAssignment) => {
            this.setState({
              currentMaxLateDaysPerAssignment: newMaxLateDaysPerAssignment,
            });
          }}
        />
        <AssignmentGroups
          assignmentGroups={assignmentGroups}
          currentAssignmentGroupIdsToCount={currentAssignmentGroupIdsToCount}
          onChange={(assignmentGroupId, isBeingAdded) => {
            let currIds = currentAssignmentGroupIdsToCount;

            if (isBeingAdded) {
              // Add the id
              currIds.push(assignmentGroupId);
            } else {
              // Remove the id
              currIds = (
                currIds
                  .filter((val) => {
                    return (val !== assignmentGroupId);
                  })
              );
            }

            // Save
            this.setState({
              currentAssignmentGroupIdsToCount: currIds,
            });
          }}
        />
        <ConfigurationFooter
          onCancelClicked={onCancel}
          onSaveClicked={this.attemptSave}
        />
      </div>
    );
  }
}

Configuration.propTypes = {
  // The list of assignment groups to let the user choose from
  assignmentGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  // The id of the course we launched from
  courseId: PropTypes.number.isRequired,
  // Handler for when configuration is valid & saved (called with new metadata)
  onNewMetadata: PropTypes.func.isRequired,
  // Handler for when user cancels (if excluded, no cancel allowed)
  onCancel: PropTypes.func,
  // Initial number of grace period minutes
  initialGracePeriodMin: PropTypes.number,
  // The initial number of late days per semester
  initialMaxLateDaysPerSemester: PropTypes.number,
  // The initial number of late days per assignment
  initialMaxLateDaysPerAssignment: PropTypes.number,
  // The initial assignment group ids that are checked
  initialAssignmentGroupIdsToCount: PropTypes.arrayOf(PropTypes.number),
};

Configuration.defaultProps = {
  // By default, there is no cancel button
  onCancel: null,
  // By default, the initial grace period is 5 minutes
  initialGracePeriodMin: 5,
  // By default, the initial max late days per semester is 6 days
  initialMaxLateDaysPerSemester: 6,
  // By default, the initial max late days per assignment is 2 days
  initialMaxLateDaysPerAssignment: 2,
  // By default, there are no initial assignment group ids checked
  initialAssignmentGroupIdsToCount: [],
};

export default Configuration;
