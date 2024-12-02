import { Gender, Genders } from './Gender';

export function getGender(gender: Gender) {
  switch (gender) {
    case Genders.MALE: {
      return 'Männlich';
    }
    case Genders.FEMALE: {
      return 'Weiblich';
    }
    case Genders.OTHER:
    case null:
      return 'Andere';
  }
}
