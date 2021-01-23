import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSettings } from '../redux/actions/settings';
import { showToast } from '../redux/actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        backgroundColor: theme.palette.background.default,
        '& .MuiToolbar-root': {
            maxWidth: '100%',
            borderBottom: `solid 1px ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default,
        },
        '& .MuiGrid-container': {
            maxWidth: 'calc(100% - 40px)',
            margin: '20px',
        },
        '& .MuiFormControl-root': {
            minWidth: '100%',
        },
    }
}));


const Settings = () => {
    // Fetch items from Redux store
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);

    // Local component state
    const [state, setState] = React.useState({
        appTheme: settings.appTheme,
        currency: settings.currency,
        dateFormat: settings.dateFormat,
    });

    // Manage local state
    const setCurrency = event => 
        setState({ ...state, currency: event.target.value});

    const setDateFormat = event => 
        setState({ ...state, dateFormat: event.target.value });

    const setAppTheme = event => 
        setState({ ...state, appTheme: event.target.value });

    const validateCurrency = currency => {
        return currency.length > 0 && currency.length <= 3;
    }

    const saveSettings = () => {
        if (validateCurrency(state.currency)) {
            dispatch(editSettings({...state}));
        } else {
            dispatch(showToast("Currency code must be 1-3 characters", "error"));
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
            <Grid container direction="column" item spacing={1} xs={12}>
                <Grid item xs={12}>
                    {/* Currency */}
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="subtitle1">
                                Currency
                            </Typography>
                            <FormControl>
                                <TextField
                                    error={!validateCurrency(state.currency)}
                                    helperText="Currency symbol or code (max 3 characters)"
                                    onBlur={event => setCurrency(event)}
                                    defaultValue={state.currency}
                                />
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {/* Date format */}
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="subtitle1">
                                Date format
                            </Typography>
                            <FormControl component="fieldset">
                                <Select
                                    onChange={event => setDateFormat(event)}
                                    value={state.dateFormat}
                                >
                                    <MenuItem value="dd.MM.yyyy">DD.MM.YYYY</MenuItem>
                                    <MenuItem value="dd-MM-yyyy">DD-MM-YYYY</MenuItem>
                                    <MenuItem value="dd/MM/yyyy">DD/MM/YYYY</MenuItem>
                                    <MenuItem value="MM.dd.yyyy">MM.DD.YYYY</MenuItem>
                                    <MenuItem value="MM-dd-yyyy">MM-DD-YYYY</MenuItem>
                                    <MenuItem value="MM/dd/yyyy">MM/DD/YYYY</MenuItem>
                                    <MenuItem value="yyyy.MM.dd">YYYY.MM.DD</MenuItem>
                                    <MenuItem value="yyyy-MM-dd">YYYY-MM-DD</MenuItem>
                                    <MenuItem value="yyyy/MM/dd">YYYY/MM/DD</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {/* Theme */}
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="subtitle1">
                                Theme
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup 
                                    row 
                                    name="theme" 
                                    onChange={event => setAppTheme(event)}
                                    value={state.appTheme} 
                                >
                                    <FormControlLabel 
                                        control={<Radio />} 
                                        label="Dark"
                                        value="dark" 
                                    />
                                    <FormControlLabel 
                                        control={<Radio />}
                                        label="Light" 
                                        value="light"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {/* Save button */}
                    <Button 
                        color="primary" 
                        onClick={saveSettings}
                        size="small"
                        variant="contained"
                    >
                        Apply changes
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export { Settings };