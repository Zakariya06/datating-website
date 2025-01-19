import { Button, IconButton, SvgIcon } from '@material-ui/core';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import DirectInteractionActionCreator from '../../actions/DirectInteractionActionCreator';
import NearbyActionCreator from '../../actions/NearbyActionCreator';
import { isError } from '../../models/core/error/IError';
import { IRelation } from '../../models/user/IRelation';
import { IStrangerUser } from '../../models/user/IStrangerUser/IStrangerUser';
import { IStrangerUserPreview } from '../../models/user/IStrangerUser/IStrangerUserPreview';
import { IUser } from '../../models/user/IUser';
import CardActionButton from '../../pages/Mainpage/components/CardActionButton';
import { MatchDialog } from '../../pages/Mainpage/components/MatchDialog/MatchDialog';
import ResourceService from '../../services/i18n';
import useTranslation from '../../services/i18n/core/useTranslation';
import NotificationActionCreator from '../../services/Notifications/actions/NotificationActionCreator';
import MatchIcon from './MatchIcon';
import Config from '../../config';
import { useHistory } from 'react-router-dom';
import { REGISTER_USER } from 'models/Paths';

export interface ILikeButtonProps {
    profilId: string;
    strangerUser: IStrangerUserPreview | IStrangerUser;

    isLiked?: boolean;
    token?: string;
    user?: IUser;
    variant?: 'icon' | 'fab';
}

export const LikeButton = memo((props: ILikeButtonProps) => {
    const { profilId, strangerUser, token, user, variant } = props;

    const [isLiked, setisLiked] = useState<boolean>(props.isLiked || false);
    const [isMatch, setIsMatch] = useState<boolean>(false);
    const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);
    const history = useHistory();

    const dispatch = useDispatch();
    const { MATCHED, LIKE_SUCCESS } = useTranslation();

    useEffect(() => {
        if (props.isLiked) {
            setisLiked(props.isLiked);
        }
    }, [props.isLiked]);

    const handleLikeClick = useCallback(async () => {
        const res = await DirectInteractionActionCreator.triggerStrangerUserRelation(profilId, 'like', token, user);
        if (!user && !token) {
            history.push(REGISTER_USER, { from: location.pathname });
        }

        if (res.ok) {
            const [response] = (await res.json()) as [IRelation];

            setisLiked(true);

            if (response.isMatch) {
                setIsMatchModalOpen(true);
                setIsMatch(true);
            } else {
                if (!isError(res) && response['Note'] === 'Success') {
                    batch(() => {
                        dispatch(NearbyActionCreator.likeStrangerUser(profilId));

                        dispatch(
                            NotificationActionCreator.enqueueSnackbar({
                                key: `like-${profilId}`,
                                message: ResourceService.replace(LIKE_SUCCESS, { name: strangerUser.Username }),
                                options: { variant: 'default' },
                            })
                        );
                    });
                }
            }
        }
    }, [profilId, token, user, dispatch, LIKE_SUCCESS, strangerUser.Username]);

    // try {
    //     Logger.log(<MatchDialog open onClose={() => setIsMatch(false)} user={user} strangerUser={strangerUser} />);
    // } catch (e) {
    //     Logger.warn(e);
    // }

    return (
        <>
            {isMatch ? (
                variant === 'fab' ? (
                    <Button
                        color="default"
                        variant="contained"
                        disableRipple
                        fullWidth
                        className="card-action-button fab match-button"
                        style={{ backgroundImage: `linear-gradient(180deg, ${Config.GLOBAL_PRIMARY_COLOR} 0%, #ab5d9a 100%)` }}
                        disableFocusRipple
                        disableTouchRipple
                        disabled
                        startIcon={
                            <SvgIcon color="error" fontSize="small">
                                <MatchIcon />
                            </SvgIcon>
                        }
                    >
                        {MATCHED}
                    </Button>
                ) : (
                    <IconButton disabled>
                        <SvgIcon color="error" fontSize="small">
                            <MatchIcon />
                        </SvgIcon>
                    </IconButton>
                )
            ) : (
                <CardActionButton type="like" outlined={!isLiked} onClick={handleLikeClick} variant={variant} />
            )}
            {isMatchModalOpen && (
                <MatchDialog open={isMatchModalOpen} onClose={() => setIsMatchModalOpen(false)} user={user} strangerUser={strangerUser} />
            )}
        </>
    );
});

export default LikeButton;

