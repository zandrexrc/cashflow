import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { isValid } from 'date-fns';


const DateSelector = props => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className="datepicker"
                disableToolbar
                variant="inline"
                format="dd.MM.yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={props.selectedDate}
                onChange={props.setDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                error={!isValid(new Date(props.selectedDate))}
            />
        </MuiPickersUtilsProvider>
    )
}

// PropTypes
DateSelector.propTypes = {
    selectedDate: PropTypes.any.isRequired,
    setDate: PropTypes.func.isRequired,
};

export { DateSelector };