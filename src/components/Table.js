import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MaterialTable, { MTableToolbar } from 'material-table';


// Styles
const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '100%',
        maxWidth: '100%',
    },
    toolbar: {
        backgroundColor: theme.palette.background.default,
        borderBottom: `solid 1px ${theme.palette.divider}`,
    },
}));


const Table = props => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <MaterialTable
            title={props.title}
            columns={props.columns}
            data={props.data}
            actions={props.additionalActions ? props.additionalActions : []}
            editable={{
            onRowAdd: (newData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        props.addData(newData);
                    }, 600);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {
                            props.editData(newData, oldData);
                        }
                    }, 600);
                }),
            onRowDelete: (oldData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        props.deleteData(oldData);
                    }, 600);
                }),
            }}
            components={{
                Toolbar: props => (
                    <div className={classes.toolbar}>
                        <MTableToolbar {...props} />
                    </div>
                ),
                Container: props => (
                    <Paper elevation={0} className={classes.root} {...props} />
                )
            }}
            options={{
                sorting: true,
                paging: false,
                exportButton: true,
                addRowPosition: 'first',
                maxBodyHeight: 'calc(100vh - 140px)',
                headerStyle: {
                    backgroundColor: theme.palette.background.default
                },
                rowStyle: rowData => ({
                    backgroundColor: (rowData.amount >= 0) ? 
                    theme.palette.primary.light : "transparent"
                }),
            }}
        />
    )
};

// PropTypes
Table.propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    addData: PropTypes.func.isRequired,
    editData: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired,
    additionalActions: PropTypes.array,
};

export { Table };