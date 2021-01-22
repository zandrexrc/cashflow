import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { ListContainer } from './ListContainer';
import { calcCategoryAmounts, getCategories } from '../../utils';


const renderRow = props => {
    const { data, index, style } = props;
    const category = data.items[index];

    return (
        <div className="listItem" key={index} style={style}>
            <Typography className="listItemText" variant="body1">
                {category.label}
            </Typography>
            <Typography 
                className={category.amount < 0 ? "neg" : "pos"}
                variant="body1"
                align="right"
            >
                {
                    category.amount < 0
                    ? `- ${data.currency} ${Math.abs(category.amount).toFixed(2)}`
                    : `${data.currency} ${category.amount.toFixed(2)}`
                }
            </Typography>
        </div>
    )
}


const CategoryList = props => {
    let categories = [];
    let categoryNames = getCategories(props.transactions);
    let categoryAmounts = calcCategoryAmounts(props.transactions)
    for (let i = 0; i < categoryNames.length; i++) {
        categories.push({
            label: categoryNames[i],
            amount: categoryAmounts[categoryNames[i].toLowerCase()]
        });
    }
    categories.sort((a, b) => a.amount - b.amount);

    return (
        <ListContainer
            currency={props.currency}
            items={categories}
        >
            {renderRow}
        </ListContainer>
    )
}

// PropTypes
CategoryList.propTypes = {
    currency: PropTypes.string.isRequired,
    transactions: PropTypes.array.isRequired,
};

export { CategoryList };