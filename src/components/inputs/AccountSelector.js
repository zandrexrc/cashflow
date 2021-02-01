import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';


const AccountSelector = props => {
    const accounts = useSelector(state => state.accounts);

    let error;
    if (accounts.length === 0) {
        error = 'No account found. Please create an account first.';
    } else if (!props.selectedAccount) {
        error = 'Required.'
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
                onChange={event => props.setAccount(event.target.value)}
            >
                {
                    props.enableSelectAll &&
                    <MenuItem value={"All"}>All</MenuItem>
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
    )
}

// PropTypes
AccountSelector.propTypes = {
    selectedAccount: PropTypes.string,
    setAccount: PropTypes.func.isRequired,
    enableSelectAll: PropTypes.bool,
};

export { AccountSelector };