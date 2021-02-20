import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import config from '../../config.json';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class TaskManagement extends Component {

    state = {
        serverStatus: "unkonw"
    }

    // call task management microservice on AWS and check the server status
    handleCheckServer = async () => {
        const taskServerURL = config.api.TASK;
        try {
            let response = await fetch(taskServerURL + "/task/check");
            let jsonResponse = await response.json();
            if (jsonResponse.code === 200) {
                this.setState({serverStatus: jsonResponse.message});
            } else {
                this.setState({serverStatus: "API Call Error: " + jsonResponse.code});
            }
        } catch (error) {
            console.log("Fetch error: " + error);
        }
    }
    
    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={1}
                className={classes.root}
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography variant="h2" gutterBottom>
                            Task Management Home Page
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Current Task Management Server Status: {this.state.serverStatus}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={this.handleCheckServer}> Check Server </Button>
                </Grid>

            </Grid>
        )
    }
}

TaskManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskManagement);