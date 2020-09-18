import React from 'react'
import { CardContent, Typography, CardActions,Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },

    grow: {
        flexGrow: 1,
    
    }
})

const BlogItem = ({text, clickToToggle, clickToDelete}) => {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
                <Grid container spacing={4} direction="row" sm={4}
                    justify="space-evenly" alignItems="baseline" wrap="nowrap">
                    <Grid container item sm={4}  zeroMinWidth>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography noWrap>
                                    {text}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={clickToToggle} color="primary">TOGGLE</Button>
                                <Button onClick={clickToDelete} color="secondary">DELETE</Button>
                            </CardActions> 
                        </Card>
                    </Grid>
                </Grid>
        </div>
    )
}

export default BlogItem;
