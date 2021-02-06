import React from 'react';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import {calcCategoryAmounts, getCategories} from '../../utils';
import {ListContainer} from './ListContainer';


const renderRow = (props) => {
  const {data, index, style} = props;
  const category = data.items[index];

  return (
    <div className="listItem" key={index} style={style}>
      <Typography className="listItemText" variant="body1">
        {category.label}
      </Typography>
      <Typography
        className={category.amount < 0 ? 'neg' : 'pos'}
        variant="body1"
        align="right"
      >
        {
          category.amount < 0 ?
          `- ${data.currency} ${Math.abs(category.amount).toFixed(2)}` :
          `${data.currency} ${category.amount.toFixed(2)}`
        }
      </Typography>
    </div>
  );
};


const CategoryList = (props) => {
  const categories = [];
  const categoryNames = getCategories(props.transactions);
  const categoryAmounts = calcCategoryAmounts(props.transactions);
  for (let i = 0; i < categoryNames.length; i++) {
    categories.push({
      label: categoryNames[i],
      amount: categoryAmounts[categoryNames[i].toLowerCase()],
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
  );
};

CategoryList.propTypes = {
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** An array of Transactions */
  transactions: PropTypes.array.isRequired,
};

export {CategoryList};
