import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { isValid, format } from 'date-fns';
import { DATE_FORMAT_ISO } from '../../constants';


const DateSelector = props => {
    const dateFormat = useSelector(state => state.settings.dateFormat);
    const datePickerValue = props.selectedDate || format(new Date(), DATE_FORMAT_ISO);

    const onChangeHandler = date => {
        let dateString = format(date, DATE_FORMAT_ISO);
        props.setDate(dateString);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className="datepicker"
                disableToolbar
                variant="inline"
                format={dateFormat}
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={datePickerValue}
                onChange={onChangeHandler}
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
    selectedDate: PropTypes.string.isRequired,
    setDate: PropTypes.func.isRequired,
};

export { DateSelector };