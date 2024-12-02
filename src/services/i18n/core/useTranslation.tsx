import { useContext } from 'react';

import ResourceContext from '../context/ResourceContext';
import { IResourceDictionary } from '../models/IResourceDicitionary';
import { IResources } from '../models/IResources';
import ResourceService from '../ResourcesService';

export function useTranslation<T extends keyof IResources>(...keys: T[]): Pick<IResourceDictionary, T> {
    const { resources } = useContext(ResourceContext);

    return ResourceService.pick(resources, ...keys);
}

export default useTranslation;
