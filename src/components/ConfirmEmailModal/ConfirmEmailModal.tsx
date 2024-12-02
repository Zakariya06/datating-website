import React, { useCallback, useEffect } from 'react';

import image from '../../assets/images/modals/email.svg';
import useTranslation from '../../services/i18n/core/useTranslation';
import IconModal from '../IconModal';
import {Button} from '@material-ui/core';
import { DirectInteractionActionCreator } from '../../actions/DirectInteractionActionCreator';
// import {IUser} from '../../models/user/IUser';
import useUserAndToken from '../../core/useUserAndToken';
import CookieStorageAPI from '../../core/storage/CookieStorageAPI';
// import useUserAndToken from '../../core/useUserAndToken';
// import {useSelector} from 'react-redux';
// import {getUser} from '../../selectors/AuthenticationSelectors';



export interface IConfirmEmailModalProps {

    isOpen: boolean;
    onClose(): void;
}

export const ConfirmEmailModal = (props: IConfirmEmailModalProps) => {
    const { user } = useUserAndToken();
    const {  onClose  } = props;
    const { EMAIL_NOT_APPROVED_TITLE, EMAIL_NOT_APPROVED_TEXT, EMAIL_NOT_APPROVED_BUTTON } = useTranslation();


    // const [email, setEmail] = useState<string>(Email);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);
   // const user = useSelector(getUser);
    const handlePress = useCallback(() => {
        // TODO
        // if (token && user) {
        //     void DirectInteractionActionCreator.triggerVerficationEmail(token, user);
        // }
        onClose();
    }, [onClose]);
    const handlePress2 = () => {
        // TODO
        if (user) {

         void DirectInteractionActionCreator.triggerVerficationEmail(user);

         }
        onClose();

    };

    useEffect(() => {
        if (user?.Verifiy === 1) {
            if (CookieStorageAPI.getItem('last-verified-check')) {
                CookieStorageAPI.removeItem('last-verified-check');
            }
        }
    }, [user?.Verifiy]);

console.log(user?.Verifiy);
console.log(user?.PartnerDoi);
    return (
        <IconModal
            open={user?.Verifiy=== 0 && user?.PartnerDoi === 1 ? true:false}
            onClose={onClose}
            button={{
                title: EMAIL_NOT_APPROVED_BUTTON,
                onClick: handlePress,
            }}
            icon={image}
            title={EMAIL_NOT_APPROVED_TITLE}
            text={EMAIL_NOT_APPROVED_TEXT}
        >
            <Button color="secondary" onClick={handlePress2} >
                E-Mail erneut senden
            </Button>


        </IconModal>

    );
};

export default ConfirmEmailModal;
