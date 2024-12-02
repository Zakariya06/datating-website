import { errorCodes } from './errorCodes';
import Config from '../config';

export const getRegistrationMessage = (value: string) => {
  switch (value) {
    case errorCodes.ERR_PASSWORD_REQUIRES_SPECIAL_CHARACTER:
      return 'Dein Passwort muss mindestens ein Sonderzeichen beinhalten';
    case errorCodes.ERR_FACEBOOK_TOKEN_REQUIRED:
      return 'Anmeldung über Facebook derzeit nicht möglich';
    case errorCodes.ERR_EMAIL_REQUIRED:
      return 'Du musst deine E-Mail eingeben um dich Registrieren zu können';
    case errorCodes.ERR_EMAIL_ALREADY_IN_USE:
      return 'Die eingegebene E-Mail Adresse wird bereits verwendet';
    case errorCodes.ERR_EMAIL_INVALID:
      return 'Die eingegebene E-Mail Adresse ist keine richtige E-Mail Adresse';
    case errorCodes.ERR_PASSWORD_TOO_SHORT:
      return 'Dein Password muss mindestens 6 Zeichen lang sein';
    case errorCodes.ERR_USER_ALREADY_EXISTS:
      return 'Die eingegebene E-Mail Adresse wird bereits verwendet';
    case errorCodes.ERR_POSTAL_CODE_NOT_FOUND:
      return 'Die eingegebene Postleitzahl konnte nicht gefunden werden';
    case errorCodes.ERR_POSTAL_CODE_REQUIRED:
      return 'Du musst deine Postleitzahl eingeben um dich Registrieren zu können';
    case errorCodes.ERR_DATE_OF_BIRTH_REQUIRED:
      return 'Du musst dein Geburtsdatum eingeben um dich Registrieren zu können';
    case errorCodes.ERR_DATE_OF_BIRTH_INCORRECT:
      return 'Du musst mindestens 18 Jahre alt sein um ' + Config.GLOBAL_SITE_NAME + ' verwenden zu dürfen';
    case errorCodes.ERR_GENDER_REQUIRED:
      return 'Du musst dein Geschlecht eingeben um dich Registrieren zu können';
    case errorCodes.ERR_CITY_REQUIRED:
      return 'Du musst deine Stadt eingeben um dich Registrieren zu können';
    case errorCodes.ERR_DEVICE_ALREADY_EXISTS:
      return 'Du bist mit dem Gerät bereits bei ' + Config.GLOBAL_SITE_NAME + ' registriert';
    case errorCodes.ERR_PUSH_PREFERENCE_REQUIRED_AND_MUST_BE_BOOLEAN:
      return 'Wir müssen wissen ob du von ' + Config.GLOBAL_SITE_NAME + ' Benachrichtigt werden möchtest';
    case errorCodes.ERR_IS_PROFILE_IMAGE_IS_REQUIRED:
      return 'Du musst ein Bild von dir hochladen um dich Registrieren zu können';
    case errorCodes.ERR_UNHANDLED_EXCEPTION:
      return 'Bitte versuche es nocheinmal.';
    default:
      return 'Bitte versuche es nocheinmal.';
  }
};
