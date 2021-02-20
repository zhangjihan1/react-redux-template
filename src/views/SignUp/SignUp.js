import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

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

class SignUp extends Component {
    render() {
        const { classes } = this.props;
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
                            User Registeration
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item>
                    <Paper className={classes.paper}>
                        <TextField
                            required
                            id="username-input"
                            label="Username"
                            defaultValue="tony"
                            variant="outlined"
                            className={classes.textfield}
                        />
                        <TextField
                            required
                            id="email-input"
                            label="Email"
                            defaultValue="tony@gmail.com"
                            variant="outlined"
                            className={classes.textfield}
                        />
                        <TextField
                            required
                            id="password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            className={classes.textfield}
                        />
                        <TextField
                            required
                            id="password-input"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            className={classes.textfield}
                        />
                    </Paper>
                </Grid>

            </Grid>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);