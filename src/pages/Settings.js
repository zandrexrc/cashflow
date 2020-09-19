import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSettings } from '../redux/actions/settings';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Toolbar,
    MenuItem,
    FormControl,
    FormControlLabel,
    TextField,
    Select,
    Radio,
    RadioGroup,
    Button,
    Snackbar,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { isValidCurrencyCode } from '../utils';


// Styles
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        "& .MuiToolbar-root": {
            maxWidth: '100%',
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default,
            borderBottom: `solid 1px ${theme.palette.divider}`
        },
        "& .MuiGrid-container": {
            maxWidth: 'calc(100% - 40px)',
            margin: 20       
        },
        "& .MuiFormControl-root": {
            minWidth: '100%'
        },
        "& .MuiSnackbar-anchorOriginBottomLeft": {
            "& .MuiSnackbarContent-root": {
                color: theme.palette.common.white,
                backgroundColor: theme.palette.primary.dark
            }
        },
        "& .MuiSnackbar-anchorOriginBottomCenter": {
            "& .MuiSnackbarContent-root": {
                color: theme.palette.common.white,
                backgroundColor: theme.palette.error.dark
            }
        },
    }
}));


const Settings = () => {
    // Fetch items from Redux store
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);

    // Local component state
    const [state, setState] = React.useState({
        currency: settings.currency,
        dateFormat: settings.dateFormat,
        appTheme: settings.appTheme,
        successSnackbarIsOpen: false,
        errorSnackbarIsOpen: false,
    });

    // Manage local state
    const setCurrency = event => 
        setState({ ...state, currency: event.target.value});

    const setDateFormat = event => 
        setState({ ...state, dateFormat: event.target.value });

    const setAppTheme = event => 
        setState({ ...state, appTheme: event.target.value });

    const toggleSuccessSnackbar = status => 
        setState({ ...state, successSnackbarIsOpen: status});

    const toggleErrorSnackbar = status => 
        setState({ ...state, errorSnackbarIsOpen: status});

    const saveSettings = () => {
        if (isValidCurrencyCode(state.currency)) {
            dispatch(editSettings({...state}));
            toggleSuccessSnackbar(true);
        } else {
            toggleErrorSnackbar(true);
        }
    };

    // Apply styles
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Toolbar>
                <Typography variant="h6">
                    Settings
                </Typography>
            </Toolbar>
            <Grid container item xs={12} direction="column" spacing={1}>
                <Grid item xs={12}>
                    {/* Currency */}
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                Currency
                            </Typography>
                            <FormControl>
                                <TextField 
                                    id="currency-input"
                                    label=""
                                    defaultValue={state.currency}
                                    onBlur={event => setCurrency(event)}
                                    error={state.currency.length !== 3}
                                    helperText="Three-letter currency code"
                                />
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {/* Date format */}
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                Date format
                            </Typography>
                            <FormControl component="fieldset">
                                <Select
                                    labelId="date-format-input-label"
                                    id="date-format-input"
                                    value={state.dateFormat}
                                    onChange={event => setDateFormat(event)}
                                    displayEmpty
                                >
                                    <MenuItem value="DD.MM.YYYY">DD.MM.YYYY</MenuItem>
                                    <MenuItem value="DD-MM-YYYY">DD-MM-YYYY</MenuItem>
                                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                                    <MenuItem value="MM.DD.YYYY">MM.DD.YYYY</MenuItem>
                                    <MenuItem value="MM-DD-YYYY">MM-DD-YYYY</MenuItem>
                                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                                    <MenuItem value="YYYY.MM.DD">YYYY.MM.DD</MenuItem>
                                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                                    <MenuItem value="YYYY/MM/DD">YYYY/MM/DD</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {/* Theme */}
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                Theme
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup 
                                    row aria-label="theme" 
                                    name="theme" 
                                    value={state.appTheme} 
                                    onChange={event => setAppTheme(event)}
                                >
                                    <FormControlLabel 
                                        control={<Radio />}
                                        value="dark" 
                                        label="Dark" />
                                    <FormControlLabel 
                                        control={<Radio />}
                                        value="light" 
                                        label="Light" />
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {/* Save button */}
                    <Button 
                        size="small" 
                        color="primary" 
                        variant="contained" 
                        onClick={saveSettings}
                    >
                        Apply changes
                    </Button>
                </Grid>
            </Grid>
            {/* Success snackbar */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={state.successSnackbarIsOpen}
                autoHideDuration={6000}
                onClose={() => toggleSuccessSnackbar(false)}
                message="Changes saved"
                action={
                    <IconButton 
                        size="small" 
                        aria-label="close" 
                        color="inherit" 
                        onClick={() => toggleSuccessSnackbar(false)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
            {/* Error snackbar */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={state.errorSnackbarIsOpen}
                autoHideDuration={6000}
                onClose={() => toggleErrorSnackbar(false)}
                message="Error: Currency must a valid 3-letter ISO currency code"
                action={
                    <IconButton 
                        size="small" 
                        aria-label="close" 
                        color="inherit" 
                        onClick={() => toggleErrorSnackbar(false)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    );
};

export { Settings };