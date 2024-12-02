import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Dialog, DialogContent, DialogTitle, IconButton, SvgIcon, useMediaQuery } from '@material-ui/core';
import React, { CSSProperties } from 'react';

import generateValidUrl from '../../core/fetch/generateValidUrl';
import Icon from '../Icon';

export interface IProfileImageDialogProps {
    image: string;
    open: boolean;
    ownProfile?: boolean;
    onClose(): void;
}

export const ProfileImageDialog = (props: IProfileImageDialogProps) => {
    const { open, onClose, image } = props;

    //const dispatch = useDispatch();
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });

    const imageDivStyle: CSSProperties = {
        width: isDesktop ? 680 : '100vw',
        height: isDesktop ? 500 : '80vh',
        backgroundImage: 'url("' + generateValidUrl(image) + '")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        marginTop: 8,
    };

    // const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // const handleClick = useCallback(
    //     (event: React.MouseEvent<HTMLButtonElement>) => {
    //         setAnchorEl(event.currentTarget);
    //     },
    //     [setAnchorEl]
    // );

    // const handleCloseMenu = useCallback(() => {
    //     setAnchorEl(null);
    // }, [setAnchorEl]);

    /* const handleDeleteProfilePicture = async () => {
        await dispatch(UserActionCreator.deletePicture(image));

    }; */

    /* const handleRemoveAsProfilePicture = async () => {
        await dispatch(UserActionCreator.updateProfilePicture(''));
    }; */

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
                PaperProps={{
                    style: {
                        padding: 0,
                        margin: 0,
                        width: 'fit-content',
                        maxWidth: 'unset',
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        boxShadow: 'unset',
                    },
                }}
            >
                <DialogTitle disableTypography style={{ padding: 0, width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                    <IconButton style={{ backgroundColor: 'rgb(67, 67, 67)' }} onClick={onClose}>
                        <Icon iconColor="#FFFFFF" icon={faTimes} />
                    </IconButton>

                    <Icon icon={faUserCircle} color="primary" />

                    {/* {ownProfile ? (
                        <IconButton style={{ backgroundColor: 'rgb(67, 67, 67)' }} onClick={handleClick}>
                            <Icon iconColor="#FFFFFF" icon={faEllipsisH} />
                        </IconButton>
                    ) : ( */}
                    <SvgIcon color="primary"></SvgIcon>
                    {/* )} */}
                </DialogTitle>
                <DialogContent>
                    <div className="flex" style={{ width: '100%', height: '100%' }}>
                        <div style={imageDivStyle}></div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* {ownProfile ? <ProfilePictureMenu anchorEl={anchorEl} closeMenu={handleCloseMenu} open={Boolean(anchorEl)} /> : null} */}
        </>
    );
};

export default ProfileImageDialog;
