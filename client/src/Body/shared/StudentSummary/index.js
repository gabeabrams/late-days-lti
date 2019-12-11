import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TotalLateDayProgress from './TotalLateDayProgress';
import AssignmentOveruseContainer from './AssignmentOveruseContainer';
import GetInTouchButton from './GetInTouchButton';
import ItemList from '../../../shared/ItemList';

// import styles
import './style.css';

class StudentSummary extends Component {
  /**
   * Render StudentSummary
   */
  render() {
    const {
      profile,
      maxLateDaysPerSemester,
      totalLateDaysUsed,
      valueSuffix,
      showGetInTouch,
      assignments,
      maxLateDaysPerAssignment,
      lateDaysMap,
      nameHeader,
      valueHeader,
      dueAtHeader,
      showDueAt,
    } = this.props;

    const header = `${profile.name}'s Late Days Used`;

    // Displays get in touch button if showGetInTouch is true
    const getInTouch = (
      showGetInTouch
        ? (
          <div className="studentsummary-getintouch">
            <GetInTouchButton />
          </div>
        )
        : null
    );

    // Divides assignments between overused late days and not overused
    const overAssignments = [];
    const okayAssignments = [];
    Object.keys(lateDaysMap).forEach((id) => {
      const lateDaysUsed = lateDaysMap[id];
      if (lateDaysUsed > maxLateDaysPerAssignment) {
        assignments.forEach((assignment) => {
          if (String(assignment.id) === id) {
            overAssignments.push({
              name: assignment.name,
              value: lateDaysMap[id],
            });
          } else {
            okayAssignments.push(assignment);
          }
        });
      }
    });

    // Display overuse container if there are assignments that used too many
    //  late days
    const assignmentsOveruse = (
      (overAssignments.length > 0)
        ? (
          <div className="studentsummary-assignmentoveruse">
            <AssignmentOveruseContainer
              maxLateDaysPerAssignment={maxLateDaysPerAssignment}
              assignmentsToShow={overAssignments}
              valueSuffix={valueSuffix}
            />
          </div>
        )
        : null
    );

    return (
      <div className="studentsummary-container">
        <div className="studentsummary-heading font-weight-bold">
          {header}
        </div>
        {getInTouch}
        <TotalLateDayProgress
          totalLateDaysUsed={totalLateDaysUsed}
          maxLateDaysPerSemester={maxLateDaysPerSemester}
          valueSuffix={valueSuffix}
        />
        {assignmentsOveruse}
        <ItemList
          items={okayAssignments}
          nameHeader={nameHeader}
          valueHeader={valueHeader}
          dueAtHeader={dueAtHeader}
          valueDenominator={maxLateDaysPerAssignment}
          valueSuffix={valueSuffix}
          showDueAt={showDueAt}
        />
      </div>
    );
  }
}

StudentSummary.propTypes = {
  // Student's profile
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  // Max late days allowed per assignment
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
  // Max late days allowed per semester
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  // Array of assignments
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of assignment
      name: PropTypes.string.isRequired,
      // the ID of the assignment
      id: PropTypes.number.isRequired,
      // the due date of the assignment,
      dueAt: PropTypes.instanceOf(Date),
      // The number of late days used
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  // Late day data
  // assignmentId => number of late days used
  lateDaysMap: PropTypes.objectOf(PropTypes.number).isRequired,
  // If true, show the get in touch button
  showGetInTouch: PropTypes.bool.isRequired,
  // Total number of late days used by student
  totalLateDaysUsed: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
  // Header for name column
  nameHeader: PropTypes.string.isRequired,
  // Header for value column
  valueHeader: PropTypes.string.isRequired,
  // Header for dueAt column
  dueAtHeader: PropTypes.string.isRequired,
  // Determines whether to show DueAt column
  showDueAt: PropTypes.bool.isRequired,
};

export default StudentSummary;
