import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Home() {

    const classes = useStyles();
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
            className={classes.root}
        >
            <Grid item>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>
                        Task Management
                    </Typography>
                </Paper>
            </Grid>

            <Grid item>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>
                        Friend Management
                    </Typography>
                </Paper>
            </Grid>

            <Grid item>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>
                        Message Management
                    </Typography>
                </Paper>
            </Grid>

            <Grid item>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>
                        Profile
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )

}