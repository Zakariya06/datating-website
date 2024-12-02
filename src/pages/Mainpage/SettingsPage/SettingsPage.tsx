import { faChevronRight, faLanguage, faUsersSlash, faEnvelope , faKey } from '@fortawesome/pro-regular-svg-icons';
import {
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Link as MuiLink,
    Paper,
    SvgIcon,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as CoinStack } from '../../../assets/images/coins/new-lovecoin.svg';
import { ReactComponent as Coin } from '../../../assets/images/coins/new-lovecoin.svg';
import ChangeLanguageDialog from '../../../components/ChangeLanguageDialog';
import ConfirmEmailModal from '../../../components/ConfirmEmailModal';
import Icon from '../../../components/Icon';
import { AGB_PATH, DATA_PROTECTION_POLICY_PATH, IMPRESSUM_PATH, SHOP_PATH, SUPPORT_PATH } from '../../../models/Paths';
import { getUser } from '../../../selectors/AuthenticationSelectors';
import useTranslation from '../../../services/i18n/core/useTranslation';
import BlockedUsersDialog from '../components/BlockedUsersDialog';
import BonusCodeDialog from '../components/BonusCodeDialog';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import Config from '../../../config';
import ChangeLocationDialog from '../../../components/ChangeLocationDialog';
import { faLocation } from '@fortawesome/pro-light-svg-icons';
import ContactForm from '../../../components/ContactForm';
import ForgotPasswordModal from '../../../components/ForgotPasswordModal/ForgotPasswordModal';

export interface ISettingsPageProps {}

export const SettingsPage = (props: ISettingsPageProps) => {
    const isSmallScreen = useMediaQuery('(max-width:1175px)', { defaultMatches: true });
    const [openBlockedUsersDialog, setOpenBlockedUsersDialog] = useState<boolean>(false);
    const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState<boolean>(false);
    const [openBonusCodeDialog, setOpenBonusCodeDialog] = useState<boolean>(false);
    const [openConfirmEmailDialog, setOpenConfirmEmailDialog] = useState<boolean>(false);
    const user = useSelector(getUser);
    const { Email = '' } = user ?? {};
    const [changeLanguageDialogOpen, setChangeLanguageDialogOpen] = useState<boolean>(false);
    const [changeLocationDialogOpen, setChangeLocationDialogOpen] = useState<boolean>(false);
    const [contactFormOpen, setContactFormOpen] = useState<boolean>(false);
    const [openForgotPassword, setOpenForgotPasswordDialog] = useState<boolean>(false);

    const {
        MENU_SETTINGS,
        SETTINGS_IMPRINT,
        SETTINGS_DATASAFETY,
        SETTINGS_AGB,
        DELETE_ACCOUNT_TITLE,
        SETTINGS_CHANGE_LANGUAGE_TITLE,
        BLOCKED_USERS_TITLE,
        LOGIN_EMAIL_INPUT,
        SETTINGS_LAW,
        SETTINGS_HELP_SUPPORT_TITLE,
        SETTINGS_ACCOUNT_SETTINGS,
        SETTINGS_APP_SETTINGS,
        SETTINGS_HELP_SUPPORT_BUSINESS_REQUEST,
        SETTINGS_HELP_SUPPORT_CONTACT,
        SETTINGS_BONUS_CODE_TEXT,
        SETTINGS_SHOP_TITLE,
        SETTINGS_SHOP_TEXT,
        CHANGE_LOCATION_TITLE,
        SETTINGS_CONTACT_FORM,
        PASSWORD_BUTTON,
    } = useTranslation();

    return (
        <div className="flex column full-width spacing padding triple right left">
            <Typography variant="h5" className="text-align-center spacing margin double bottom">
                {MENU_SETTINGS}
            </Typography>
            <div className="flex column">
                <div className={isSmallScreen ? 'flex column no-grow full-width' : 'flex no-grow full-width'}>
                    <Paper className="full-width spacing margin triple right" square>
                        <ListItem button component={Link} to={SHOP_PATH}>
                            <ListItemIcon>
                                <SvgIcon style={{ height: 40, width: 40, marginRight: 8 }}>
                                    <Coin />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ style: { color: '#F3CC30' } }}
                                secondaryTypographyProps={{ style: { color: '#F3CC30' } }}
                                primary={SETTINGS_SHOP_TITLE}
                                secondary={SETTINGS_SHOP_TEXT}
                            />
                        </ListItem>
                    </Paper>

                    {isSmallScreen && <div className="spacing margin double bottom" />}
                    <Paper className="full-width" square>
                        <List>
                            <ListItem button onClick={() => setOpenBonusCodeDialog(true)}>
                                <ListItemIcon>
                                    <SvgIcon style={{ height: 40, width: 40, marginRight: 8 }}>
                                        <CoinStack />
                                    </SvgIcon>
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ style: { fontWeight: 700 } }} primary={SETTINGS_BONUS_CODE_TEXT} />
                            </ListItem>
                        </List>
                    </Paper>
                </div>
                    <>
                    <Typography className="spacing margin double top bottom" variant="h6">
                        {SETTINGS_ACCOUNT_SETTINGS}
                    </Typography>
                    <div className={isSmallScreen ? 'flex column no-grow' : 'flex no-grow'}>
                        <Paper className="flex align-items-center spacing padding top bottom right" square>
                            <Typography className="spacing padding double left right" style={{ whiteSpace: 'pre' }}>
                                {LOGIN_EMAIL_INPUT}:{' '}
                            </Typography>
                            <TextField
                                inputProps={{ style: { cursor: 'pointer' } }}
                                disabled
                                onClick={() => setOpenConfirmEmailDialog(true)}
                                fullWidth
                                defaultValue={Email}
                            />
                        </Paper>
                        {isSmallScreen && <div className="spacing margin double bottom" />}
                        <Paper className="full-width" square>
                            <List>
                                <ListItem button onClick={() => setOpenForgotPasswordDialog(true)}>
                                    <ListItemIcon>
                                        <Icon icon={faKey} />
                                    </ListItemIcon>
                                    <ListItemText primary={PASSWORD_BUTTON} />
                                    <ListItemSecondaryAction>
                                        <Icon icon={faChevronRight} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Paper>                        
                    </div>

                    <Typography className="spacing margin double top bottom" variant="h6">
                        {SETTINGS_APP_SETTINGS}
                    </Typography>
                    <div className={isSmallScreen ? 'flex column no-grow' : 'flex no-grow'}>
                        <Paper className="full-width spacing margin triple right" square>
                            <List>
                                <ListItem onClick={() => setOpenBlockedUsersDialog(true)} button color="error" style={{ color: '#FE0000' }}>
                                    <ListItemIcon>
                                        <Icon icon={faUsersSlash} />
                                    </ListItemIcon>
                                    <ListItemText primary={BLOCKED_USERS_TITLE} />
                                    <ListItemSecondaryAction>
                                        <Icon color="inherit" icon={faChevronRight} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Paper>
                        {isSmallScreen && <div className="spacing margin double bottom" />}
                        <Paper className="full-width" square>
                            <List>
                                <ListItem button onClick={() => setChangeLanguageDialogOpen(true)}>
                                    <ListItemIcon>
                                        <Icon icon={faLanguage} />
                                    </ListItemIcon>
                                    <ListItemText primary={SETTINGS_CHANGE_LANGUAGE_TITLE} />
                                    <ListItemSecondaryAction>
                                        <Icon icon={faChevronRight} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Paper>
                    </div>
                </>

                <div className={isSmallScreen ? 'flex no-grow full-width column' : 'flex no-grow full-width'}>
                    <div className="full-width flex column spacing margin triple right">
                        <Typography className="spacing margin double top bottom" variant="h6">
                            {SETTINGS_HELP_SUPPORT_TITLE}
                        </Typography>
                        <Paper className="flex column full-width" square>
                            <List>
                                <ListItem component={MuiLink} href={`mailto:info@${Config.GLOBAL_SITE_DOMAIN}`}>
                                    <ListItemText primary={SETTINGS_HELP_SUPPORT_BUSINESS_REQUEST} />
                                </ListItem>
                                <ListItem button component={Link} to={SUPPORT_PATH}>
                                    <ListItemText primary={SETTINGS_HELP_SUPPORT_CONTACT} />
                                </ListItem>
                            </List>
                        </Paper>
                    </div>
                    <div className="full-width">
                        <Typography className="spacing margin double top bottom" variant="h6">
                            {SETTINGS_LAW}
                        </Typography>
                        <Paper className="full-width" square>
                            <List>
                                <ListItem button component={Link} to={IMPRESSUM_PATH}>
                                    <ListItemText primary={SETTINGS_IMPRINT} />
                                </ListItem>
                                <ListItem button component={Link} to={DATA_PROTECTION_POLICY_PATH}>
                                    <ListItemText primary={SETTINGS_DATASAFETY} />
                                </ListItem>
                                <ListItem button component={Link} to={AGB_PATH}>
                                    <ListItemText primary={SETTINGS_AGB} />
                                </ListItem>
                            </List>
                        </Paper>
                    </div>
                </div>
                <div className={isSmallScreen ? 'flex column no-grow' : 'flex no-grow'} style={{marginTop:'16px'}}>
                            <Paper className="full-width spacing margin triple right" square>
                                    <List>
                                        <ListItem button onClick={() => setChangeLocationDialogOpen(true)}>
                                            <ListItemIcon>
                                                <Icon icon={faLocation} />
                                            </ListItemIcon>
                                            <ListItemText primary={CHANGE_LOCATION_TITLE} />
                                            <ListItemSecondaryAction>
                                                <Icon icon={faChevronRight} />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                            </Paper> 
                            {isSmallScreen && <div className="spacing margin double bottom" />}
                            <Paper className="full-width" square>
                                <List>
                                    <ListItem button onClick={() => setContactFormOpen(true)}>
                                        <ListItemIcon>
                                            <Icon icon={faEnvelope} />
                                        </ListItemIcon>
                                        <ListItemText primary={SETTINGS_CONTACT_FORM} />
                                        <ListItemSecondaryAction>
                                            <Icon icon={faChevronRight} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Paper>                                                   
                        </div>               
                </div>
            <div className="flex no-grow justify-content-center align-items-center column spacing margin triple bottom top">

                <Button onClick={() => setOpenDeleteAccountDialog(true)} variant="text" style={{ color: '#FE0000' }}>
                    {DELETE_ACCOUNT_TITLE}
                </Button>
            </div>
            <BlockedUsersDialog open={openBlockedUsersDialog} handleClose={() => setOpenBlockedUsersDialog(false)} />
            <DeleteAccountDialog open={openDeleteAccountDialog} handleClose={() => setOpenDeleteAccountDialog(false)} />
            <ChangeLanguageDialog isOpen={changeLanguageDialogOpen} onClose={() => setChangeLanguageDialogOpen(false)} />
            <ConfirmEmailModal isOpen={openConfirmEmailDialog} onClose={() => setOpenConfirmEmailDialog(false)} />
            <BonusCodeDialog open={openBonusCodeDialog} onClose={() => setOpenBonusCodeDialog(false)} />
            <ChangeLocationDialog isOpen={changeLocationDialogOpen} onClose={() => setChangeLocationDialogOpen(false)} />
            <ContactForm isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />
            <ForgotPasswordModal open={openForgotPassword}  />
        </div>
    );
};

export default SettingsPage;
