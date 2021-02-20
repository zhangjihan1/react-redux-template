import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Auth } from "aws-amplify"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateUserLoginStatus } from "../../actions/AuthManagementAction";
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
    textfield: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '45ch',
        },
        display: 'block',
        margin: theme.spacing(1),
    }
});

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthManagementReducer.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserLoginStatus: bindActionCreators(updateUserLoginStatus, dispatch)
    };
}

class SignIn extends Component {

    state = {
        username: "",
        passowrd: "",
        error: "",
        refer: (this.props.location.state && this.props.location.state.refer) ? this.props.location.state.refer : "/"
    }

    handleUsernameInputChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordInputChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleSignin = async () => {
        // AWS Cognito signin
        try {
            const userInform = await Auth.signIn(this.state.username, this.state.password);
            this.props.updateUserLoginStatus({ username: userInform.username, email: userInform.attributes.email });
            this.props.history.push(this.state.refer);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        const { classes } = this.props;
        if (this.props.isAuthenticated) this.props.history.push(this.state.refer);
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
                className={classes.root}
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            User Sign In
                        </Typography>
                        <Typography variant="body2" color="error" gutterBottom>
                            {this.state.error}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item>
                    <Paper className={classes.paper}>
                        <TextField
                            required
                            id="username-input"
                            label="Username or Email"
                            variant="outlined"
                            className={classes.textfield}
                            onChange={this.handleUsernameInputChange}
                        />
                        <TextField
                            required
                            id="password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            className={classes.textfield}
                            onChange={this.handlePasswordInputChange}
                        />
                    </Paper>
                </Grid>

                <Button variant="contained" color="primary" onClick={this.handleSignin} >Sign in</Button>
            </Grid>
        )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));