import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import MoreVert from '@material-ui/icons/MoreVert';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton, InputAdornment, Menu, MenuItem, TextField, Typography } from '@material-ui/core';
import { FixedSizeList } from 'react-window';


const useStyles = makeStyles(theme => ({
    root: {
        width: 'calc(50% - 1px)',
        height: '100vh',
        minWidth: '500px',
        display: 'flex',
        flexFlow: 'column nowrap',
        backgroundColor: theme.palette.background.paper,
        "& .header": {
            width: 'calc(100% - 30px)',
            height: '64px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px 0 20px',
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .emptyList": {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'calc(100vh - 64px)',
        },
        "& .list": {
            width: '100%',
            maxHeight: 'calc(100vh - 64px)',
            overflow: 'auto',
            padding: '0',
            margin: '0',
            color: theme.palette.text.primary
        },
        "& .listItem": {
            minHeight: '69px',
            maxHeight: '69px',
            maxWidth: 'calc(100% - 40px)',
            padding: '0 20px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`,
            cursor: 'pointer',
            transition: 'all 0.1s ease-in-out'
        },
        "& .listItem:hover": {
            backgroundColor: theme.palette.action.hover
        },
        "& .listItemDate": {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            paddingRight: '20px'
        },
        "& .listItemText": {
            width: '60%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        "& .MuiTypography-h5": {
            marginTop: '-10px',
        },
        "& .pos": {
            color: theme.palette.success.main,
            width: '40%',
        },
        "& .neg": {
            width: '40%',
        }
    }
}));


const ListContainer = props => {
    const classes = useStyles();

    // Display search matches
    const [displayedItems, setDisplayedItems] = React.useState(props.items);

    React.useEffect(() => {
        setDisplayedItems(props.items);
    }, [props.items, setDisplayedItems]);
    
    const search = term => {
        let filter = new RegExp(term, 'i');
        setDisplayedItems(props.items.filter(item => 
            (item.name && filter.test(item.name)) ||
            (item.description && filter.test(item.description))
        ));
    }

    // Dropdown menu
    const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
 
    const showMenu = event => 
        setMenuAnchorEl(event.currentTarget);
 
    const hideMenu = () => 
        setMenuAnchorEl(null);

    return (
        <div className={classes.root}>
            {
                props.openFormTab &&
                <div className="header">
                    <TextField
                        type="search" 
                        margin="normal"
                        placeholder="Search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        onChange={event => search(event.target.value)}
                    />
                    <div className="buttons">
                        <IconButton onClick={props.openFormTab}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={showMenu}>
                            <MoreVert fontSize="small" />
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchorEl}
                            keepMounted
                            open={Boolean(menuAnchorEl)}
                            onClose={hideMenu}
                        >
                            <MenuItem onClick={props.openImportFileDialog}>
                                <PublishIcon fontSize="small" />
                                <span style={{marginLeft: '10px'}}>Import from CSV</span>
                            </MenuItem>
                            <MenuItem onClick={props.exportData}>
                                <GetAppIcon fontSize="small" /> 
                                <span style={{marginLeft: '10px'}}>Download as CSV</span>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            }
            {
                displayedItems.length === 0 ?
                <div className="emptyList">
                    <Typography variant="h6" color="textSecondary">
                        No records to display.
                    </Typography>
                </div> :
                <FixedSizeList
                    className="list"
                    height={window.innerHeight - 64}
                    width='100%'
                    itemSize={70}
                    itemCount={displayedItems.length}
                    itemData={{
                        items: displayedItems,
                        currency: props.currency,
                        openDetailsTab: props.openDetailsTab
                    }}
                >
                    {props.children}
                </FixedSizeList>
            }
        </div>
    )   
}

// PropTypes
ListContainer.propTypes = {
    children: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    exportData: PropTypes.func,
    items: PropTypes.array.isRequired,
    openDetailsTab: PropTypes.func,
    openFormTab: PropTypes.func,
    openImportFileDialog: PropTypes.func,
};

export { ListContainer };