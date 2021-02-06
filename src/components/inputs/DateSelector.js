import React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {isValid, format} from 'date-fns';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {DATE_FORMAT_ISO} from '../../constants';


const DateSelector = (props) => {
  const dateFormat = useSelector((state) => state.settings.dateFormat);
  const currentDate = format(new Date(), DATE_FORMAT_ISO);
  const datePickerValue = props.selectedDate || currentDate;

  const onChangeHandler = (date) => {
    const dateString = format(date, DATE_FORMAT_ISO);
    props.setDate(dateString);
  };

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
  );
};

DateSelector.propTypes = {
  /** The selected date (as string) */
  selectedDate: PropTypes.string.isRequired,
  /** Function to change the selected date */
  setDate: PropTypes.func.isRequired,
};

export {DateSelector};
