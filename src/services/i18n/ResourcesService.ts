import de from './locales/de';
import en from './locales/en';
import ILanguageDictionary, { Language, Languages } from './models/ILanguageDictionary';
import { IResourceDictionary } from './models/IResourceDicitionary';
import { IResources } from './models/IResources';

export class ResourceService {
    private static _currentLanguage: Language = Languages.DE;
    private static _languageDictionary: ILanguageDictionary = {
        [Languages.DE]: de,
        [Languages.EN]: en,
    };

    public static changeCurrentLanguage(language: Language): void {
        this._currentLanguage = language;
    }

    public static getCurrentResources<T extends keyof IResources>(...keys: T[]) {
        const resources = this._languageDictionary[this._currentLanguage] ?? this._languageDictionary[Languages.DE];

        return this.pick(resources, ...keys);
    }

    public static pick<T extends keyof IResources>(dictionary: IResourceDictionary, ...keys: T[]): Pick<IResourceDictionary, T> {
        if (keys.length === 0) {
            return dictionary;
        }

        const res: Record<string, string> = {};
        for (const key of keys) {
            res[key] = dictionary[key] ?? '';
        }

        return res as Pick<IResourceDictionary, T>;
    }

    public static replace(text: string, context: Record<string, string>) {
        let replacedText = String(text);
        const entries = Object.entries(context);

        for (const [k, v] of entries) {
            replacedText = replacedText.replace(`{${k}}`, v);
        }

        return replacedText;
    }

    public static getCurrentLanguage() {
        return this._currentLanguage;
    }
}

// ResourceService.pick(de, 'ALERT_DELETE_CHAT_TEXT', 'ALERT_DELETE_CHAT_TITLE').ALERT_DELETE_CHAT_TEXT;

// ResourceService.replace("test {text} {text2}",{ text: 'test', text2: 'test2'}) //  => "test test"

export default ResourceService;
