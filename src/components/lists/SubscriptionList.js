import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { ListContainer } from './ListContainer';
import { printDate, subscriptionsToCsv } from '../../utils';


const renderRow = props => {
    const { data, index, style } = props;
    const subscription = data.items[index];

    return (
        <div 
            className="listItem"
            key={index}
            style={style}
            onClick={() => data.openDetailsTab(subscription)}
        >
            <div className="listItemDate">
                <Typography variant="overline">
                    {printDate(subscription.nextBillingDate, 'MMM')}
                </Typography>
                <Typography variant="h5">
                    {new Date(subscription.nextBillingDate).getDate()}
                </Typography>
            </div>
            <Typography
                className="listItemText"
                variant="body1"
            >
                {subscription.name}
            </Typography>
            <Typography 
                className={subscription.amount < 0 ? "neg" : "pos"}
                variant="body1"
                align="right"
            >
                {
                    subscription.amount < 0
                    ? `- ${data.currency} ${Math.abs(subscription.amount).toFixed(2)}`
                    : `${data.currency} ${subscription.amount.toFixed(2)}`
                }
            </Typography>
        </div>
    )
}


const SubscriptionList = props => {
    return (
        <ListContainer
            currency={props.currency}
            export={() => subscriptionsToCsv(props.subscriptions)}
            items={props.subscriptions}
            openDetailsTab={props.openDetailsTab}
            openFormTab={props.openFormTab}
        >
            {renderRow}
        </ListContainer>
    )
}

// PropTypes
SubscriptionList.propTypes = {
    currency: PropTypes.string.isRequired,
    openDetailsTab: PropTypes.func.isRequired,
    openFormTab: PropTypes.func.isRequired,
    subscriptions: PropTypes.array.isRequired,
};

export { SubscriptionList };