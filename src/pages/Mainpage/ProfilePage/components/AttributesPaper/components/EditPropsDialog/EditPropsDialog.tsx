import { faEye, faGem, faHeart, faHomeLgAlt, faPalette, faSmoking } from '@fortawesome/pro-light-svg-icons';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import UserActionCreator from '../../../../../../../actions/UserActionCreator';
import Button from '../../../../../../../components/Button';
import Modal from '../../../../../../../components/Modal';
import { IUser } from '../../../../../../../models/user/IUser';
import useTranslation from '../../../../../../../services/i18n/core/useTranslation';
import { IResources } from '../../../../../../../services/i18n/models/IResources';
import { AugenMap, BeziehungMap, HaareMap, KoerperschmuckMap, SmokerTraitMap, WohnenMap } from '../../../../../../../temp/models/BerndUserTraits';
import PropsListItem from './List/ListItem';
import HeightListItem from './List/ListItem/HeightListItem';

export interface IEditPropsDialogProps {
    user: IUser;
    open: boolean;
    onClose(): void;
}

export const EditPropsDialog = memo((props: IEditPropsDialogProps) => {
    const { user, open, onClose } = props;
    const {
        Smoker: smoker,
        Relationship: relationshipProp,
        Eyes: eyeColor,
        Size: height = 0,
        Bodyjewelry: bodyjewelry,
        Hair: haircolor,
        Living: livingProp,
        Userid,
        Username,
        City,
        Zip,
        Gender,
        SearchGender,
        MinAge,
        MaxAge,
        Distance,
    } = user;

    const dispatch = useDispatch();
    const translation = useTranslation();

    const [Smoker, setSmoker] = useState<number | undefined>(smoker);
    const [relationship, setRelationship] = useState<number | undefined>(relationshipProp);
    const [userEyecolor, setUserEyecolor] = useState<number | undefined>(eyeColor);
    const [userSize, setUserSize] = useState<number>(height);
    const [Bodyjewelry, setBodyjewelry] = useState<number | undefined>(bodyjewelry);
    const [hairColor, setHairColor] = useState<number | undefined>(haircolor);
    const [living, setLiving] = useState<number | undefined>(livingProp);


    useEffect(() => {
        dispatch(UserActionCreator.getUserAttributes());

    }, [dispatch]);

    const handleSave = useCallback(async () => {



        // TODO: check data type
        await dispatch(
            UserActionCreator.updateProfile({
                id: Userid,
                userName: Username,
                city: City || '',
                postalCode: Zip,
                gender: Gender,
                smoker: Smoker,
                relationship: relationship,
                eyes: userEyecolor || 0,
                height: Number(userSize),
                bodyjewelry: Bodyjewelry,
                hair: hairColor,
                living: living,
                preferredGender: SearchGender,
                preferredMaxAge: MaxAge,
                preferredMinAge: MinAge,
                preferredMaxDistance: Distance,
            })
        );


        onClose();
        // TODO: set update user
        // setSnackbar(true);
    }, [
        Bodyjewelry,
        City,
        Distance,
        Gender,
        MaxAge,
        MinAge,
        SearchGender,
        Smoker,
        Userid,
        Username,
        Zip,
        dispatch,
        hairColor,
        living,
        onClose,
        relationship,
        userEyecolor,
        userSize,
    ]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={translation.OWN_PROFILE_EDIT}
            actionsClassName="flex column"
            actions={
                <Button color="primary" onClick={handleSave} mediumFont>
                    {translation.SAVE}
                </Button>
            }
        >
            <PropsListItem
                text={translation.TRAITS_SMOKER_TITLE}
                value={Smoker}
                menuItems={createMap(translation, Object.entries(SmokerTraitMap))}
                color="rgb(255, 167, 38)"
                icon={faSmoking}
                onChange={setSmoker}
            />
            <PropsListItem
                text={translation.TRAITS_RELATIONSHIP_TITLE}
                value={relationship}
                menuItems={createMap(translation, Object.entries(BeziehungMap))}
                color="rgb(255, 23, 68)"
                icon={faHeart}
                onChange={setRelationship}
            />
            <PropsListItem
                text={translation.TRAITS_EYECOLOR_TITLE}
                value={userEyecolor}
                menuItems={createMap(translation, Object.entries(AugenMap))}
                color="rgb(102, 187, 106)"
                icon={faEye}
                onChange={setUserEyecolor}
            />
            <PropsListItem
                text={translation.TRAITS_BODYJEWELRY_TITLE}
                value={Bodyjewelry}
                menuItems={createMap(translation, Object.entries(KoerperschmuckMap))}
                color="rgb(171, 71, 188)"
                icon={faGem}
                onChange={setBodyjewelry}
            />
            <PropsListItem
                text={translation.TRAITS_HAIRCOLOR_TITLE}
                value={hairColor}
                menuItems={createMap(translation, Object.entries(HaareMap))}
                color="rgb(84, 110, 122)"
                icon={faPalette}
                onChange={setHairColor}
            />
            <PropsListItem
                text={translation.TRAITS_LIVING_TITLE}
                value={living}
                menuItems={createMap(translation, Object.entries(WohnenMap))}
                color="rgb(236, 64, 122)"
                icon={faHomeLgAlt}
                onChange={setLiving}
            />

            <HeightListItem text={translation.TRAITS_SIZE_TITLE} value={userSize} onChange={setUserSize} />
        </Modal>
    );
});

export default EditPropsDialog;

function createMap(translation: IResources, keys: Array<[string, string]>) {
    for (let i = 0, max = keys.length; i < max; i++) {
        keys[i][1] = translation[keys[i][1]];
    }

    return keys;
}
