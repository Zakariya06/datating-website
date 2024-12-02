import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Logger from '../../../core/Logger';
import { useLocalstorage } from '../../../core/useLocalstorage';
import { ReactChildren } from '../../../models/core/ReactChildren';
import { getUser } from '../../../selectors/AuthenticationSelectors';
import { Language, Languages } from '../models/ILanguageDictionary';
import ResourceService from '../ResourcesService';
import ResourceContext, { IResourceContext } from './ResourceContext';

export interface IResourceContextProviderProps {
    children?: ReactChildren;
}

export const ResourceContextProvider = (props: IResourceContextProviderProps) => {
    const { children } = props;

    const user = useSelector(getUser);

    const { value, setValue } = useLocalstorage(`${user?.Userid ?? ''}-lang`);

    const initLang = useMemo(() => (value ? (value as Language) : navigator.language === 'en' ? Languages.EN : Languages.DE), [value]);

    Logger.log(initLang, navigator.language);

    const [lang, setLanguage] = useState<Language>(initLang);

    useEffect(() => {
        setLanguage(initLang);
    }, [initLang, user?.Userid]);

    const handleLanguageChange = useCallback(
        (newLanguage: Language) => {
            setValue(newLanguage);
            setLanguage(newLanguage);
        },
        [setValue]
    );

    const ctx = useMemo<IResourceContext>(() => {
        ResourceService.changeCurrentLanguage(lang);
        return { resources: ResourceService.getCurrentResources(), currentLanguage: lang, changeLanguage: handleLanguageChange };
    }, [handleLanguageChange, lang]);

    return <ResourceContext.Provider value={ctx}>{children}</ResourceContext.Provider>;
};

export default ResourceContextProvider;
