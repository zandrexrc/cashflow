import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getCategories } from '../../utils';


const CategorySelector = props => {
    const subscriptions = useSelector(state => state.subscriptions);
    const transactions = useSelector(state => state.transactions);
    const categories = props.type === "subscriptions"
        ? getCategories(subscriptions)
        : getCategories(transactions);
    categories.sort();

    if (props.showUncategorized) {
        categories.unshift("Uncategorized");
    }

    if (props.enableSelectAll) {
        categories.unshift("All");
    }

    return (
        <Autocomplete
            disableClearable
            freeSolo
            forcePopupIcon
            selectOnFocus
            options={categories}
            value={props.selectedCategory}
            onChange={(event, value) => props.setCategory(value)}
            renderInput={(params) => (
                <TextField
                    label="Category"
                    { ...params }
                />
            )}
            style={{minWidth: '50%'}}
        />
    )
}

// PropTypes
CategorySelector.propTypes = {
    enableSelectAll: PropTypes.bool,
    selectedCategory: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
    showUncategorized: PropTypes.bool,
    type: PropTypes.string.isRequired,
};

export { CategorySelector };