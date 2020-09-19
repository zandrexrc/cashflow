import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getAccountNames, printMonthName } from '../utils';


// Styles
const useStyles = makeStyles(theme => ({
    footer: {
        minWidth: 'calc(100% - 50px)',
        maxWidth: 'calc(100% - 50px)',
        minHeight: '65px',
        maxHeight: '65px',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '25px',
        paddingRight: '25px',
        borderTop: `solid 1px ${theme.palette.divider}`
    },
    statistics: {
        display: 'flex',
    },
    filter: {
        marginRight: '20px'
    },
    info: {
        marginLeft: '20px'
    }
}));


const TableFooter = props => {
    // Determine which filter options to show
    let accountNames, dateFilter;
    if (props.filters) {
        accountNames = getAccountNames(props.accounts);
        dateFilter = props.filters.date.month !== "All" ? 
            new Date(props.filters.date.year, props.filters.date.month, 0) : 
            new Date();
    }

    const classes = useStyles();

    return (
        <div className={classes.footer}>
            {
                props.filters ?
                <div className={classes.statistics}>
                    <div className={classes.filter}>
                        <Typography variant="body2" color="textSecondary">
                            Account
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            {
                                props.filters.account === "All"?
                                "All" :
                                accountNames[props.filters.account]
                            }
                        </Typography>
                    </div>
                    <div className={classes.filter}>
                        <Typography variant="body2" color="textSecondary">
                            Category
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            {props.filters.category}
                        </Typography>
                    </div>
                    <div className={classes.filter}>
                        <Typography variant="body2" color="textSecondary">
                            Date
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            { 
                                props.filters.date.month === "All" ? 
                                props.filters.date.year : 
                                printMonthName(dateFilter)
                            }
                        </Typography>
                    </div>
                </div> :
                <div></div>
            }
            <div className={classes.statistics}>
                {props.data.map((data, index) => (
                    <div key={index} className={classes.info}>
                        <Typography variant="body2" color="textSecondary" align="right">
                            {data.label}
                        </Typography>
                        <Typography variant="body1" color={data.color} align="right">
                            {data.value}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

// PropTypes
TableFooter.propTypes = {
    data: PropTypes.array.isRequired,
    filters: PropTypes.object,
    accounts: PropTypes.array,
};

export { TableFooter };