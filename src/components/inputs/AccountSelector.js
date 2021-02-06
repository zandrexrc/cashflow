import React from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';


const AccountSelector = (props) => {
  const accounts = useSelector((state) => state.accounts);

  let error;
  if (accounts.length === 0) {
    error = 'No account found. Please create an account first.';
  } else if (!props.selectedAccount) {
    error = 'Required.';
  } else {
    error = '';
  }

  return (
    <FormControl
      error={error.length > 0 && !props.enableSelectAll}
      style={{minWidth: '40%'}}
    >
      <InputLabel id="account-filter-label">Account</InputLabel>
      <Select
        labelId="account-filter-label"
        id="account-filter"
        value={props.selectedAccount}
        onChange={(event) => props.setAccount(event.target.value)}
      >
        {
          props.enableSelectAll &&
          <MenuItem value={'All'}>All</MenuItem>
        }
        {accounts.map((obj, index) => (
          <MenuItem key={index} value={obj.accountId.toString()}>
            {obj.name}
          </MenuItem>
        ))}
      </Select>
      {
        error && !props.enableSelectAll &&
        <FormHelperText>{error}</FormHelperText>
      }
    </FormControl>
  );
};

AccountSelector.propTypes = {
  /** ID of the selected account (as string) */
  selectedAccount: PropTypes.string,
  /** Function to change the selected account */
  setAccount: PropTypes.func.isRequired,
  /** If true, the option to select all accounts is enabled */
  enableSelectAll: PropTypes.bool,
};

export {AccountSelector};
