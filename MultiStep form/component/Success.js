import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export class Success extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
            <AppBar title = "Congratulations!"
            />
            <h1
                primary= {true}
                style={styles.proper}
            >You Are Now a Community Member</h1>

        </React.Fragment>

      </MuiThemeProvider>
    )
  }
}

const styles = {
    proper :{
        margin:15
    }
}
export default Success