import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';


const AccountSelector = props => {
    const accounts = useSelector(state => state.accounts);

    return (
        <FormControl>
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