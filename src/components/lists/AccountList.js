import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { ListContainer } from './ListContainer';
import { accountsToCsv } from '../../utils';


const renderRow = props => {
    const { data, index, style } = props;
    const account = data.items[index];

    return (
        <div 
            className="listItem"
            key={index}
            style={style}
            onClick={() => data.openDetailsTab(account)}
        >
            <Typography
                className="listItemText"
                variant="body1"
            >
                {account.name}
            </Typography>
            <Typography 
                className={account.balance < 0 ? "neg" : "pos"}
                variant="body1"
                align="right"
            >
                {
                    account.balance < 0
                    ? `- ${data.currency} ${Math.abs(account.balance).toFixed(2)}`
                    : `${data.currency} ${account.balance.toFixed(2)}`
                }
            </Typography>
        </div>
    )
}


const AccountList = props => {
    return (
        <ListContainer
            currency={props.currency}
            export={() => accountsToCsv(props.accounts)}
            items={props.accounts}
            openDetailsTab={props.openDetailsTab}
            openFormTab={props.openFormTab}
        >
            {renderRow}
        </ListContainer>
    )
}

// PropTypes
AccountList.propTypes = {
    accounts: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired,
    openDetailsTab: PropTypes.func.isRequired,
    openFormTab: PropTypes.func.isRequired
};

export { AccountList };