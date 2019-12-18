/**
 * Introduces the concept of the event
 * @author Gabe Abrams
 */

// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';

class AssignmentGroupSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Once the user clicks continue, leaving is set to true during animation
      leaving: false,
    };
  }

  render() {
    const { onContinue } = this.props;
    const { leaving } = this.state;

    return (
      <div className="Intro-panel-container">
        <div className={`Intro-panel Intro-top-3 alert alert-light ${leaving ? 'Intro-panel-leaving' : ''}`}>
          <div className="d-flex flex-row justify-content-center h-100">
            <div>
              <div className="Intro-text-small">
                <div>
                  We recommend using Canvas
                  <strong> assignment groups</strong>
                  .
                </div>
                <div>
                  For instance, &quot;Homeworks&quot; and
                  &quot;Reading Quizzes&quot;
                </div>
              </div>

              <div className="Intro-icon-row">
                <FontAwesomeIcon icon={faTasks} />
              </div>

              <div className="Intro-text-small">
                <div>
                  You choose which assignment groups allow Late Days.
                </div>
                <div>
                  (Late Days allowed on Homeworks but not Reading Quizzes)
                </div>
              </div>

              <div className="Intro-continue-button-container">
                <button
                  type="button"
                  className="btn btn-info btn-lg Intro-continue-button"
                  aria-label="continue"
                  disabled={leaving}
                  onClick={() => {
                    // Start to animate out
                    this.setState({
                      leaving: true,
                    });

                    // Call continue after animation
                    setTimeout(onContinue, 300);
                  }}
                >
                  Continue
                  &nbsp;
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

// List or properties and their types
AssignmentGroupSelection.propTypes = {
  // Handler to call when done with this step
  onContinue: PropTypes.func.isRequired,
};

export default AssignmentGroupSelection;
