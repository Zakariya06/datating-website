import { ListItemIcon, MenuItem, Select } from '@material-ui/core';
import React, { memo, useContext, useState } from 'react';

import image from '../../assets/images/modals/world.svg';
import ResourceContext from '../../services/i18n/context/ResourceContext';
import useTranslation from '../../services/i18n/core/useTranslation';
import { Language, Languages } from '../../services/i18n/models/ILanguageDictionary';
import IconModal from '../IconModal';

export interface IChangeLanguageDialogProps {
    isOpen: boolean;
    onClose(): void;
}

export const ChangeLanguageDialog = memo((props: IChangeLanguageDialogProps) => {
    const { isOpen, onClose } = props;

    const { currentLanguage, changeLanguage } = useContext(ResourceContext);
    const { SETTINGS_CHANGE_LANGUAGE_TITLE, LANG_DE, LANG_EN } = useTranslation();
    const [selectedLang, setselectedLang] = useState<Language>(currentLanguage);

    const handleChange = (e: React.ChangeEvent<{ name?: string | undefined; value: Language }>) => {
        //
        setselectedLang(e.target.value);
    };

    const handlePress = () => {
        changeLanguage(selectedLang);
        onClose();
    };

    return (
        <IconModal
            open={isOpen}
            onClose={onClose}
            button={{
                title: SETTINGS_CHANGE_LANGUAGE_TITLE,
                onClick: handlePress,
            }}
            icon={image}
            title={SETTINGS_CHANGE_LANGUAGE_TITLE}
        >
            <Select value={selectedLang} onChange={handleChange} variant="outlined" fullWidth>
                <MenuItem key={'DE'} value={Languages.DE}>
                    <ListItemIcon>🇩🇪</ListItemIcon>
                    {LANG_DE}
                </MenuItem>
                <MenuItem key={'US'} value={Languages.EN}>
                    <ListItemIcon>🇺🇸</ListItemIcon>
                    {LANG_EN}
                </MenuItem>
            </Select>
        </IconModal>
    );
});

export default ChangeLanguageDialog;
