import { faChevronRight, faLanguage, faUsersSlash, faEnvelope, faKey } from '@fortawesome/pro-regular-svg-icons';
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
    useMediaQuery,
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
import { Avatar, Box, IconButton, Stack } from '@mui/material';
import CoinIcon from '../../../assets/images/coins/skipped-coin-80.svg';

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

    const isMobile = useMediaQuery('(max-width:430px)', { defaultMatches: true });

    return (
        <div className="flex column full-width spacing padding triple right left">
            {isMobile ? null : (
                <h1 className="text-2xl font-semibold mb-8 text-center text-gray-800" style={{ color: '#ed6c02' }}>
                    {MENU_SETTINGS}
                </h1>
            )}

            {isMobile ? (
                <Avatar sx={{ width: 130, height: 130, borderRadius: 13, boxShadow: '2px 4px 12px lightGray', display: 'flex', m: 'auto', mb: 2 }} />
            ) : null}

            {isMobile ? (
                <Typography style={{ textAlign: 'center', fontSize: '20px', fontWeight: 600, marginBottom: 8 }}>
                    {user?.Username}, {user?.MaxAge}
                </Typography>
            ) : null}

            {isMobile ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 'auto', gap: '8px' }}>
                    <Box component="img" src={CoinIcon} style={{ width: 40, height: 40 }} />
                    <Typography style={{ fontWeight: 600 }}>
                        {user?.CoinsFree}
                        <br />
                        credits
                    </Typography>
                </Box>
            ) : (
                <div className="flex column">
                    <div className={isSmallScreen ? 'flex column no-grow full-width' : 'flex no-grow full-width'}>
                        <ListItem
                            button
                            component={Link}
                            to={SHOP_PATH}
                            style={{ padding: '16px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', borderRadius: '8px', marginRight: '20px' }}
                        >
                            <ListItemIcon>
                                <SvgIcon style={{ height: 40, width: 40, marginRight: 8 }}>
                                    <Coin />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { fontWeight: 700 } }} primary={SETTINGS_SHOP_TITLE} />
                        </ListItem>

                        {isSmallScreen && <div className="spacing margin double bottom" />}

                        <ListItem
                            button
                            onClick={() => setOpenBonusCodeDialog(true)}
                            style={{ padding: '16px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', borderRadius: '8px', marginRight: '20px' }}
                        >
                            <ListItemIcon>
                                <SvgIcon style={{ height: 40, width: 40, marginRight: 8 }}>
                                    <CoinStack />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { fontWeight: 700 } }} primary={SETTINGS_BONUS_CODE_TEXT} />
                        </ListItem>
                    </div>
                    <>
                        <Typography
                            className="spacing  double top bottom"
                            variant="h6"
                            style={{ fontWeight: 600, color: '#ed6c02', marginTop: '20px', marginBottom: '10px' }}
                        >
                            {SETTINGS_ACCOUNT_SETTINGS}
                        </Typography>
                        <div className={isSmallScreen ? 'flex column no-grow' : 'flex no-grow'}>
                            <Paper
                                className="flex align-items-center spacing padding top bottom right"
                                style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                            >
                                <Typography className="spacing padding double left right" style={{ whiteSpace: 'pre', color: '#ed6c02' }}>
                                    {LOGIN_EMAIL_INPUT}:{' '}
                                </Typography>
                                <TextField
                                    inputProps={{ style: { cursor: 'pointer', color: '#ed6c02', background: '#FFF8E1' } }}
                                    disabled
                                    onClick={() => setOpenConfirmEmailDialog(true)}
                                    fullWidth
                                    defaultValue={Email}
                                    variant="outlined"
                                    style={{ borderRadius: '8px' }}
                                />
                            </Paper>
                            {isSmallScreen && <div className="spacing margin double bottom" />}
                            <Paper
                                className="full-width"
                                style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', marginLeft: '20px' }}
                            >
                                <List>
                                    <ListItem button onClick={() => setOpenForgotPasswordDialog(true)} style={{ padding: '16px' }}>
                                        <ListItemIcon>
                                            <Icon icon={faKey} style={{ color: '#ed6c02' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={PASSWORD_BUTTON} />
                                        <ListItemSecondaryAction>
                                            <Icon icon={faChevronRight} style={{ color: '#ed6c02' }} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Paper>
                        </div>

                        <Typography
                            className="spacing  double top bottom"
                            variant="h6"
                            style={{ fontWeight: 600, color: '#ed6c02', marginTop: '20px', marginBottom: '10px' }}
                        >
                            {SETTINGS_APP_SETTINGS}
                        </Typography>
                        <div className={isSmallScreen ? 'flex column no-grow' : 'flex no-grow'}>
                            <Paper
                                className="full-width spacing margin triple right"
                                style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                            >
                                <List>
                                    <ListItem onClick={() => setOpenBlockedUsersDialog(true)} button style={{ color: '#FE0000', padding: '16px' }}>
                                        <ListItemIcon>
                                            <Icon icon={faUsersSlash} style={{ color: '#FE0000' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={BLOCKED_USERS_TITLE} />
                                        <ListItemSecondaryAction>
                                            <Icon color="inherit" icon={faChevronRight} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Paper>
                            {isSmallScreen && <div className="spacing margin double bottom" />}
                            <Paper className="full-width" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                <List>
                                    <ListItem button onClick={() => setChangeLanguageDialogOpen(true)} style={{ padding: '16px' }}>
                                        <ListItemIcon>
                                            <Icon icon={faLanguage} style={{ color: '#ed6c02' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={SETTINGS_CHANGE_LANGUAGE_TITLE} />
                                        <ListItemSecondaryAction>
                                            <Icon icon={faChevronRight} style={{ color: '#ed6c02' }} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Paper>
                        </div>
                    </>

                    <div className={isSmallScreen ? 'flex no-grow full-width column' : 'flex no-grow full-width'}>
                        <div className="full-width flex column spacing margin triple right">
                            <Typography
                                className="spacing  double top bottom"
                                variant="h6"
                                style={{ fontWeight: 600, color: '#ed6c02', marginTop: '20px', marginBottom: '10px' }}
                            >
                                {SETTINGS_HELP_SUPPORT_TITLE}
                            </Typography>
                            <Paper className="flex column full-width" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                <List>
                                    <ListItem component={MuiLink} href={`mailto:info@${Config.GLOBAL_SITE_DOMAIN}`} style={{ padding: '16px' }}>
                                        <ListItemText primary={SETTINGS_HELP_SUPPORT_BUSINESS_REQUEST} />
                                    </ListItem>
                                    <ListItem button component={Link} to={SUPPORT_PATH} style={{ padding: '16px' }}>
                                        <ListItemText primary={SETTINGS_HELP_SUPPORT_CONTACT} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </div>
                        <div className="full-width">
                            <Typography
                                className="spacing  double top bottom"
                                variant="h6"
                                style={{ fontWeight: 600, color: '#ed6c02', marginTop: '20px', marginBottom: '10px' }}
                            >
                                {SETTINGS_LAW}
                            </Typography>
                            <Paper className="full-width" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                <List>
                                    <ListItem button component={Link} to={IMPRESSUM_PATH} style={{ padding: '16px' }}>
                                        <ListItemText primary={SETTINGS_IMPRINT} />
                                    </ListItem>
                                    <ListItem button component={Link} to={DATA_PROTECTION_POLICY_PATH} style={{ padding: '16px' }}>
                                        <ListItemText primary={SETTINGS_DATASAFETY} />
                                    </ListItem>
                                    <ListItem button component={Link} to={AGB_PATH} style={{ padding: '16px' }}>
                                        <ListItemText primary={SETTINGS_AGB} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </div>
                    </div>
                    <div className={isSmallScreen ? 'flex column no-grow' : 'flex no-grow'} style={{ marginTop: '16px' }}>
                        <Paper
                            className="full-width spacing margin triple right"
                            style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                        >
                            <List>
                                <ListItem button onClick={() => setChangeLocationDialogOpen(true)} style={{ padding: '16px' }}>
                                    <ListItemIcon>
                                        <Icon icon={faLocation} style={{ color: '#ed6c02' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={CHANGE_LOCATION_TITLE} />
                                    <ListItemSecondaryAction>
                                        <Icon icon={faChevronRight} style={{ color: '#ed6c02' }} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Paper>
                        {isSmallScreen && <div className="spacing margin double bottom" />}
                        <Paper className="full-width" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                            <List>
                                <ListItem button onClick={() => setContactFormOpen(true)} style={{ padding: '16px' }}>
                                    <ListItemIcon>
                                        <Icon icon={faEnvelope} style={{ color: '#ed6c02' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={SETTINGS_CONTACT_FORM} />
                                    <ListItemSecondaryAction>
                                        <Icon icon={faChevronRight} style={{ color: '#ed6c02' }} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Paper>
                    </div>
                </div>
            )}

            {isMobile && (
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: 12 }}>
                    CREDITS KAUFEN
                </Button>
            )}

            {isMobile && (
                <div>
                    <Box sx={{mx: 'auto', p: 1 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography style={{ fontSize: '16px' }}>Matches</Typography>
                            <Typography noWrap>{user?.CoinsFree}</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{mx: 'auto', p: 1 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography style={{ fontSize: '16px' }}>Profilbesuche</Typography>
                            <Typography noWrap>{user?.Verifiy}</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{mx: 'auto', p: 1 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography style={{ fontSize: '16px' }}>Hat mich geliked</Typography>
                            <Typography noWrap>{user?.Relationship}</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{mx: 'auto', p: 1 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography style={{ fontSize: '16px' }}>Mine Likes</Typography>
                            <Typography noWrap>{user?.Eyes}</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{mx: 'auto', p: 1 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography style={{ fontSize: '16px' }}>Einstellungen</Typography>
                            <Typography noWrap></Typography>
                        </Stack>
                    </Box>
                </div>
            )}

            <div className="flex no-grow justify-content-center align-items-center column spacing margin triple bottom top">
                <Button
                    onClick={() => setOpenDeleteAccountDialog(true)}
                    variant="outlined"
                    style={{ color: '#FE0000', fontWeight: 600, textTransform: 'none' }}
                >
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
            <ForgotPasswordModal open={openForgotPassword} />
        </div>
    );
};

export default SettingsPage;

