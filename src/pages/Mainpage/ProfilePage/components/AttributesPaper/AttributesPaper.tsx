import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button, Paper, SvgIcon, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as CoinIcon } from '../../../../../assets/images/coins/skipped-coin-80.svg';
import Icon from '../../../../../components/Icon';
import RoundButton from '../../../../../components/RoundButton';
import { SHOP_PATH } from '../../../../../models/Paths';
import { IUser, getAge, getBalance } from '../../../../../models/user/IUser';
import ResourceService from '../../../../../services/i18n';
import useTranslation from '../../../../../services/i18n/core/useTranslation';
import { AttributeChips } from './AttributeChips';
import EditPropsDialog from './components/EditPropsDialog';
import Config from 'config/config';

export interface IAttributesPaperProps {
    user: IUser;
}

export const AttributesPaper = memo((props: IAttributesPaperProps) => {
    const { user } = props;
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const history = useHistory();
    const isDesktop = useMediaQuery('(min-width:1000px)', { defaultMatches: true });
    const margin = isDesktop ? 16 : 0;
    const { OWN_PROFILE_COINAMOUNT, LOCATION_FROM } = useTranslation();

    const { Size, Eyes, Gender, Bodyjewelry, Smoker, Living, Starsign, Relationship, Hair } = user;
    const { Username, Birthday, City } = user;

    return (
        <>
            <Paper style={{ marginLeft: margin }} square className="flex column spacing double padding all full-height">
                <div className="flex justify-content-space-between">
                    <div className="flex column ">
                        <Typography variant="overline">
                            {Username}, {getAge(Birthday)}
                        </Typography>
                        <Typography>
                            {LOCATION_FROM} {City}
                        </Typography>
                    </div>

                    <div>
                        <RoundButton
                            style={{
                                backgroundImage: 'unset',
                                backgroundColor: Config.GLOBAL_PRIMARY_COLOR,
                            }}
                            onClick={() => setOpenEditDialog(true)}
                            dense
                        >
                            <Icon icon={faPen} fontSize="small" />
                        </RoundButton>
                    </div>
                </div>

                <AttributeChips
                    Gender={Gender}
                    Smoker={Smoker}
                    Relationship={Relationship}
                    Eyes={Eyes}
                    Size={Size}
                    Starsign={Starsign}
                    Bodyjewelry={Bodyjewelry}
                    Hair={Hair}
                    Living={Living}
                />

                <div className="flex column" />
                <div className="flex column align-items-end">
                    <Button
                        style={{
                            backgroundColor: '#f3cc30',
                            color: '#FFFF',
                            fontWeight: 600,
                            borderRadius: 8,
                        }}
                        color="secondary"
                        onClick={() => history.push(SHOP_PATH)}
                        startIcon={
                            <SvgIcon style={{ border: '2px solid #FFF', borderRadius: 50 }}>
                                <CoinIcon />
                            </SvgIcon>
                        }
                        variant="text"
                        size="large"
                    >
                        {ResourceService.replace(OWN_PROFILE_COINAMOUNT, { coins: getBalance(user).toString() })}
                    </Button>
                </div>
            </Paper>
            {openEditDialog && <EditPropsDialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} user={user} />}
        </>
    );
});

export default AttributesPaper;
