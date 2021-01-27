import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { ListContainer } from './ListContainer';
import { printDate, transactionsToCsv, generateSampleCsv, csvToTransactions } from '../../utils';


const renderRow = props => {
    const { data, index, style } = props;
    const transaction = data.items[index];

    return (
        <div 
            className="listItem"
            key={index}
            style={style}
            onClick={() => data.openDetailsTab(transaction)}
        >
            <div className="listItemDate">
                <Typography variant="overline">
                    {printDate(transaction.date, 'MMM')}
                </Typography>
                <Typography variant="h5">
                    {new Date(transaction.date).getDate()}
                </Typography>
            </div>
            <Typography
                className="listItemText"
                variant="body1"
            >
                {transaction.description}
            </Typography>
            <Typography 
                className={transaction.amount < 0 ? "neg" : "pos"}
                variant="body1"
                align="right"
            >
                {
                    transaction.amount < 0
                    ? `- ${data.currency} ${Math.abs(transaction.amount).toFixed(2)}`
                    : `${data.currency} ${transaction.amount.toFixed(2)}`
                }
            </Typography>
        </div>
    )
}


const TransactionList = props => {
    return (
        <ListContainer
            currency={props.currency}
            import={(file) => csvToTransactions(file)}
            export={() => transactionsToCsv(props.transactions)}
            items={props.transactions}
            openDetailsTab={props.openDetailsTab}
            openFormTab={props.openFormTab}
            sampleFile={generateSampleCsv('transaction')}
        >
            {renderRow}
        </ListContainer>
    )
}

// PropTypes
TransactionList.propTypes = {
    currency: PropTypes.string.isRequired,
    openDetailsTab: PropTypes.func.isRequired,
    openFormTab: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
};

export { TransactionList };