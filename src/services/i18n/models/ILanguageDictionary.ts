import { IResourceDictionary } from './IResourceDicitionary';

export type Language = 'de' | 'en';
export enum Languages {
    DE = 'de',
    EN = 'en',
}

export type ILanguageDictionary = Record<Language, IResourceDictionary>;

export default ILanguageDictionary;
