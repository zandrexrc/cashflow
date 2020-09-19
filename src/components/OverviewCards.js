import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardActions,
    Divider,
    Typography,
    Button,
} from '@material-ui/core';


// Styles
const useStyles = makeStyles(theme => ({
    titleCard: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    }
}));


// Card for displaying the title
const TitleCard = props => {
    const classes = useStyles();

    return (
        <Card className={classes.titleCard}>
            <CardContent>
                <Typography variant="h5">
                    Monthly overview
                </Typography>
                <Typography variant="h2" component="h2">
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    );
};

// Card for displaying a graph
const GraphCard = props => {
    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {props.title}
                    <Divider />
                </Typography>
                {props.children}
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => props.action()}
                >
                    More details
                </Button>
            </CardActions>
        </Card>
    );
};

// Card for displaying basic information
const TextCard = props => {
    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {props.title}
                    <Divider />
                </Typography>
                {
                    props.data.length === 0 ?
                    <Typography variant="h5">
                        No records to display.
                    </Typography> :
                    props.data.map((data, index) => (
                        <div key={index}>
                            <Typography 
                                variant="subtitle1" 
                                color="textPrimary" 
                                component="h2"
                            >
                                {data.label}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {data.value}
                            </Typography>
                        </div>
                    ))
                }
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => props.action()}
                >
                    More details
                </Button>
            </CardActions>
        </Card>
    );
};

// PropTypes
TitleCard.propTypes = {
    title: PropTypes.string.isRequired,
};

GraphCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

TextCard.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
};

export {
    TitleCard,
    GraphCard,
    TextCard
};