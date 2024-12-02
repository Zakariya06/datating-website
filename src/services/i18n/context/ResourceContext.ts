import { createContext } from 'react';

import { Language, Languages } from './../models/ILanguageDictionary';
import { IResources } from '../models/IResources';
import { ResourceService } from '../ResourcesService';

export interface IResourceContext {
    currentLanguage: Language;
    resources: IResources;
    changeLanguage(newLanguage: Language): void;
}

export const ResourceContext = createContext<IResourceContext>({
    resources: ResourceService.getCurrentResources(),
    changeLanguage: () => null,
    currentLanguage: Languages.DE,
});

export default ResourceContext;
