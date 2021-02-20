import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from 'aws-amplify';
import { bindActionCreators } from 'redux';
import { updateUserLogoutStatus } from "../actions/AuthManagementAction";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    }
});

const mapStateToProps = (state) => {
    return {
        authManagement: state.AuthManagementReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserLogoutStatus: bindActionCreators(updateUserLogoutStatus, dispatch)
    };
}

class Header extends Component {

    handleLogout = () => {
        try {
            Auth.signOut();
            this.props.updateUserLogoutStatus();
        } catch (error) {
            console.log("AWS Amplify Logout Error: " + error.message)
        }
    }

    render() {
        const { classes, authManagement } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" className={classes.title}>
                                        <Button className={classes.menuButton} color="inherit"><Link className={classes.link} to="/">Task List App</Link></Button>
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>



                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="center"
                            >
                                <Grid item>
                                    {authManagement.isAuthenticated ?
                                        <Typography variant="subtitle2" gutterBottom>
                                            User: {authManagement.username},   Email: {authManagement.email}
                                        </Typography>
                                        :
                                        <Fragment></Fragment>
                                    }
                                </Grid>
                                <Grid item>
                                    {authManagement.isAuthenticated ?
                                        <Button className={classes.menuButton} color="inherit" onClick={this.handleLogout}><Link className={classes.link} to="/signin">Log out</Link></Button>
                                        :
                                        <Button className={classes.menuButton} color="inherit"><Link className={classes.link} to="/signin">Log In</Link></Button>
                                    }
                                </Grid>
                                <Grid item>
                                    <Button className={classes.menuButton} color="inherit"><Link className={classes.link} to="/signup">Sign Up</Link></Button>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>


                </AppBar>
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));