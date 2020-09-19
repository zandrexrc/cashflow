import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    InputLabel,
    FormControl,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Select,
    MenuItem,
    Divider
} from '@material-ui/core';


// Styles
const useStyles = makeStyles({
    formControl: {
        marginLeft: 10
    },

    divider: {
        minWidth: 250,
        marginTop: 10,
        marginBottom: 10
    }
});

const FilterDialog = props => {
    const [state, setState] = React.useState({
        account: props.filters.account,
        category: props.filters.category,
        date: props.filters.date,
    });

    // Manage state
    const setAccount = event => 
        setState({ ...state, account: event.target.value });

    const setCategory = event => 
        setState({ ...state, category: event.target.value });

    const setMonth = event =>
        setState({ 
            ...state, 
            date: {
                ...state.date,
                month: event.target.value,
            } 
        });

    const setYear = event => 
        setState({ 
            ...state, 
            date: {
                ...state.date,
                year: event.target.value,
            }
        });

    const handleFormSubmit = () => {
        props.setFilters({
            account: state.account,
            category: state.category,
            date: state.date,
        });
    };

    // Apply styles
    const classes = useStyles();

    return (
        <div>
            <Dialog 
                open={props.isOpen} 
                onClose={props.closeDialog} 
                className={classes.dialog} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Filter</DialogTitle>
                <DialogContent>

                    <FormControl>
                        <InputLabel id="account-filter-label">Account</InputLabel>
                        <Select
                            labelId="account-filter-label"
                            id="account-filter"
                            value={state.account}
                            onChange={event => setAccount(event)}
                        >
                            <MenuItem key={0} value={"All"}>All</MenuItem>
                            {props.accounts.map((obj, index) => (
                                <MenuItem key={index+1} value={obj.accountID}>
                                    {obj.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Divider className={classes.divider} />

                    <FormControl>
                        <InputLabel id="category-filter-label">Category</InputLabel>
                        <Select
                            labelId="category-filter-label"
                            id="category-filter"
                            value={state.category}
                            onChange={event => setCategory(event)}
                        >
                            <MenuItem key={0} value={"All"}>All</MenuItem>
                            <MenuItem key={1} value={"Uncategorized"}>
                                Uncategorized
                            </MenuItem>
                            {props.categories.map((category, index) => (
                                <MenuItem key={index+2} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Divider className={classes.divider} />
                    <DialogContentText>
                        Date range
                    </DialogContentText>

                    <FormControl>
                        <InputLabel id="month-filter-label">Month</InputLabel>
                        <Select
                            labelId="month-filter-label"
                            id="month-filter"
                            value={state.date.month}
                            onChange={event => setMonth(event)}
                        >
                            {
                                props.enableYearLongDateRange ?
                                <MenuItem value={"All"}>Whole year</MenuItem> :
                                null
                            }
                            <MenuItem value={1}>January</MenuItem>
                            <MenuItem value={2}>February</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                            <MenuItem value={9}>September</MenuItem>
                            <MenuItem value={10}>October</MenuItem>
                            <MenuItem value={11}>November</MenuItem>
                            <MenuItem value={12}>December</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="year-filter-label">Year</InputLabel>
                        <Select
                            labelId="year-filter-label"
                            id="year-filter"
                            value={state.date.year}
                            onChange={event => setYear(event)}
                        >
                            {props.transactionYears.map((year, index) => (
                                <MenuItem key={index} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

// PropTypes
FilterDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    accounts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    transactionYears: PropTypes.array.isRequired,
    enableYearLongDateRange: PropTypes.bool,
};

export { FilterDialog };