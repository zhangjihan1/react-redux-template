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

export default function Welcome() {

    const classes = useStyles();
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
                        DKE Task List App
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        Welcome Page
                    </Typography>
                </Paper>
            </Grid>

            <Grid item>
                <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                        This App help users management their task at different levels.
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Users can also send tasks to their friends.
                    </Typography>
                </Paper>
            </Grid>

        </Grid>
    )

}