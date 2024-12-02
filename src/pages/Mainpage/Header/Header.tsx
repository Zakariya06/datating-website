import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { AppBar, IconButton, Paper, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useCallback, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import CoinIcon from '../../../assets/images/coins/skipped-coin-80.svg';
import SkippedLogoAlt from '../../../assets/images/logos/logo-with-writing-white.svg';
import SkippedLogo from '../../../assets/images/logos/logo-with-writing.svg';
import LogoOnly from '../../../assets/images/logos/logoonly.svg';
import Icon from '../../../components/Icon';
import SignOutComponent from '../../../components/SignOutComponent';
import TurboRocket from '../../../components/TurboRocket';
import useHistoryPush from '../../../core/useHistoryPush';
import { HOME_PATH, SHOP_PATH } from '../../../models/Paths';
import { getBalance } from '../../../models/user/IUser';
import { getUser } from '../../../selectors/AuthenticationSelectors';
import { ThemeContext } from '../../../theme/ThemeContext';
import HeaderMenu from './HeaderMenu';
import { SearchPopover } from './SearchPopover/SearchPopover';
import WelcomeBar from './WelcomeBar';

export interface IHeaderProps {}

export const Header = memo((props: IHeaderProps) => {
    const [signOutDialogOpen, setSignOutDialogOpen] = useState<boolean>(false);

    const user = useSelector(getUser);
    const { type } = useContext(ThemeContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleSearchOpen = useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget), []);
    const handleSearchClose = useCallback(() => setAnchorEl(null), []);

    const openSignOutDialog = useCallback(() => setSignOutDialogOpen(true), []);
    const closeSignOutDialog = useCallback(() => setSignOutDialogOpen(false), []);

    const handleCoinClick = useHistoryPush(SHOP_PATH);
    const handleLogoClick = useHistoryPush(HOME_PATH);

    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });

    if (!user) return null;

    return (
        <>
            <AppBar position="sticky" color="transparent">
                <Paper elevation={2}>
                    <Toolbar className="flex container justify-content-space-between align-items-center">
                        <div className="flex no-grow pointer logoDiv" onClick={handleLogoClick}>
                            <img
                                draggable={false}
                                src={!isDesktop ? LogoOnly : type === 'dark' ? SkippedLogoAlt : SkippedLogo}
                                alt="verpaar-logo"
                                style={{ height: 38, width: 'auto', userSelect: 'none' }}
                            />
                        </div>

                        <div className="flex no-grow align-items-center">
                        {!isDesktop && (
                            <div className="flex no-grow align-items-center">
                                <IconButton onClick={handleSearchOpen}>
                                    <Icon icon={faSearch} />
                                </IconButton>
                                <TurboRocket />
                                <SearchPopover anchorEl={anchorEl} closePopper={handleSearchClose} open={Boolean(anchorEl)} />
                                <div onClick={handleCoinClick} style={{ marginRight: 20, cursor: 'pointer' }}>
                                    <img draggable={false} src={CoinIcon} alt="coin-icon" style={{ alignSelf: 'center', height: 40, width: 'auto' }} />
                                    <div className="header-coins">
                                        <Typography color="inherit" variant="caption">
                                            {getBalance(user)}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        )}
                        <HeaderMenu user={user} openSignOutDialog={openSignOutDialog} />
                        </div>
                    </Toolbar>
                    <WelcomeBar name={user?.Username} id={user?.Userid} />
                </Paper>
            </AppBar>

            <SignOutComponent onClose={closeSignOutDialog} open={signOutDialogOpen} />
        </>
    );
});

export default Header;
