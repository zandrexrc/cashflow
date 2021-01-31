import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';


const AccountSelector = props => {
    const accounts = useSelector(state => state.accounts);
    const defaultValue = accounts[0] ? accounts[0].accountId.toString() : '';
    const selectValue = props.selectedAccount === '0' ? defaultValue : props.selectedAccount;

    let error ='';
    if (accounts.length === 0) {
        error = 'No account found. Please create an account first.';
    }

    return (
        <FormControl error={error.length > 0 && !props.enableSelectAll}>
            <InputLabel id="account-filter-label">Account</InputLabel>
            <Select
                labelId="account-filter-label"
                id="account-filter"
                value={selectValue}
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
    selectedAccount: PropTypes.string.isRequired,
    setAccount: PropTypes.func.isRequired,
    enableSelectAll: PropTypes.bool,
};

export { AccountSelector };