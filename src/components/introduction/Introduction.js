import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Onboarding } from './Onboarding';
import { SettingsForm } from './SettingsForm';
import { AccountForm } from './AccountForm';
import { Offboarding } from './Offboarding';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        minWidth: '500px',
        maxHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        "& .icon": {
            color: theme.palette.primary.main,
            fontSize: '5em',
            marginBottom: '20px',
        },
        "& .button": {
            marginTop: '20px',
        },
    }
}));


const Introduction = () => {
    const classes = useStyles();
    const settings = useSelector(state => state.settings);

    const [currency, setCurrency] = React.useState(settings.currency);
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div>
            {
                activeIndex === 0 &&
                <Onboarding next={() => setActiveIndex(1)} />
            }
            {
                activeIndex === 1 && 
                <SettingsForm
                    currency={currency}
                    setCurrency={setCurrency}
                    next={() => setActiveIndex(2)}
                />
            }
            {
                activeIndex === 2 && 
                <AccountForm
                    currency={currency}
                    next={() => setActiveIndex(3)}
                />
            }
            {
                activeIndex === 3 && 
                <Offboarding
                    settings={{
                        currency: currency,
                        dateFormat: settings.dateFormat,
                        appTheme: settings.appTheme
                    }}
                />
            }
        </div>
    )
}

export { Introduction };