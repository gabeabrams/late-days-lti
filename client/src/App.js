// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

import ItemList from './Body/shared/ItemList';

// Import styles
import './App.css';

// Initialize caccl
const { api, getStatus } = initCACCL();

class App extends Component {
  /**
   * Initialize App component
   */
  constructor(props) {
    super(props);

    // Set up state
    this.state = {
      message: 'Loading! Just a moment...',
    };
  }

  /**
   * Called when the component mounted, pulls state and user profile from server
   */
  async componentDidMount() {
    // Load status
    try {
      // Get status from server
      const status = await getStatus();

      // > App wasn't launched via Canvas
      if (!status.launched) {
        return this.setState({
          message: 'Please launch this app from Canvas.',
        });
      }

      // > App is not authorized
      if (!status.authorized) {
        return this.setState({
          message: 'We don\'t have access to Canvas. Please re-launch the app.',
        });
      }
    } catch (err) {
      return this.setState({
        message: `Error while requesting state from server: ${err.message}`,
      });
    }

    // Load profile information
    try {
      // Get profile from Canvas via api
      const profile = await api.user.self.getProfile();

      // Update state
      return this.setState({
        message: `Hi ${profile.name}! Your CACCL app is ready!`,
      });
    } catch (err) {
      return this.setState({
        message: `Error while requesting user profile: ${err.message}`,
      });
    }
  }

  /**
   * Render the App
   */
  render() {
    // Deconstruct the state
    const { message } = this.state;

    // Render the component
    return (
      <div>
        <ItemList
          items={[
            {
              name: 'Person 1',
              value: 2,
              onClick: () => {
                alert('Person 1 clicked');
              },
            },
            {
              name: 'Person 2',
              value: 1,
              onClick: () => {
                alert('Person 2 clicked');
              },
            },
          ]}
          nameHeader="Full Name"
          valueHeader="Late Days Used"
          valueDenominator={5}
        />
      </div>
    );
  }
}

export default App;
