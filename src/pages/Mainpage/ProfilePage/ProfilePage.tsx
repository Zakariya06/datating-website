import './ProfilePage.scss';

import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Typography, useMediaQuery } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserActionCreator from '../../../actions/UserActionCreator';
import Icon from '../../../components/Icon';
import RoundButton from '../../../components/RoundButton';
import { getUser } from '../../../selectors/AuthenticationSelectors';
import useTranslation from '../../../services/i18n/core/useTranslation';
import ImageGallery from '../components/ImageGallery';
import AttributesPaper from './components/AttributesPaper';
import OwnProfileCard from './components/OwnProfileCard';
import { PictureComponent } from './components/PictureComponent/PictureComponent';
import UploadPictureDialog from './components/UploadPictureDialog';
import UploadProfilePictureDialog from './components/UploadProfilePictureDialog';

export interface IProfilePageProps {}

export const ProfilePage = (props: IProfilePageProps) => {
    const [openUploadProfilePicture, setOpenUploadProfilePicture] = useState<boolean>(false);
    const isDesktop = useMediaQuery('(min-width:1000px)', { defaultMatches: true });
    const [openImageGallery, setOpenImageGallery] = useState<boolean>(false);
    const [openUploadPicture, setOpenUploadPicture] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const { OWN_PROFILE_YOUR_PICTURES } = useTranslation();
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const handleClick = useCallback((index: number) => {
        setCurrentIndex(index);
        setOpenImageGallery(true);
    }, []);

    useEffect(() => {
        dispatch(UserActionCreator.refreshUser());
    }, [dispatch]);

    const { Pictures = [] } = user ?? {};

    const filteredPictures = useMemo(() => Pictures.filter((picture) => !picture.ProfileImage), [Pictures]);

    if (!user) {
        return null;
    }

    return (
        <>
            <section className="flex">
                <div style={isDesktop ? { marginLeft: 24, marginRight: 24 } : {}} className="flex column spacing margin left right">
                    <article className="flex column no-grow">
                        <div className={isDesktop ? 'flex row' : 'flex column'}>
                            <OwnProfileCard user={user} onClick={() => setOpenUploadProfilePicture(true)} />

                            <AttributesPaper user={user} />
                        </div>
                    </article>
                    <article className="full-width">
                        <div style={{ marginTop: 16, marginBottom: 16 }} className="flex no-grow align-items-center">
                            <Typography variant="h6">{OWN_PROFILE_YOUR_PICTURES}</Typography>

                            <div>
                                <RoundButton
                                    onClick={() => setOpenUploadPicture(true)}
                                    className="spacing margin left"
                                    dense
                                    style={{ backgroundImage: 'unset', backgroundColor: '#42a5f5' }}
                                >
                                    <Icon iconColor="inherit" icon={faPlus} fontSize="small" />
                                </RoundButton>
                            </div>
                        </div>
                        <div className="flex wrap image-gallery justify-content-start">
                            {filteredPictures.map((picture, index) => (
                                <PictureComponent
                                    key={picture.Picture}
                                    onClick={handleClick}
                                    index={index}
                                    image={picture.Picture}
                                    coins={picture.Coins}
                                />
                            ))}
                        </div>
                        <ImageGallery
                            //pictures={user.Pictures}
                            pictures={filteredPictures}
                            currentIndex={currentIndex}
                            open={openImageGallery}
                            onClose={() => setOpenImageGallery(false)}
                        />
                    </article>
                </div>
            </section>
            <UploadPictureDialog open={openUploadPicture} onClose={() => setOpenUploadPicture(false)} />
            <UploadProfilePictureDialog open={openUploadProfilePicture} onClose={() => setOpenUploadProfilePicture(false)} />
        </>
    );
};

export default ProfilePage;
