import { faEye, faGem, faHeart, faHomeLgAlt, faPalette, faRuler, faSmoking, faStar, faVenusMars } from '@fortawesome/pro-light-svg-icons';

import isNullOrUndefined from '../../../../../core/typeguards/isNullOrUndefined';
import { formatHeight } from '../../../../../models/user/IUser';
import useTranslation from '../../../../../services/i18n/core/useTranslation';
import {
    AugenMap,
    BeziehungMap,
    GeschlechtMap,
    HaareMap,
    KoerperschmuckMap,
    SmokerTraitMap,
    SternzeichenMap,
    WohnenMap,
} from '../../../../../temp/models/BerndUserTraits';
import ChipsComponent from '../../../components/Chips';
import { Box } from '@mui/material';
import { useContext } from 'react';
import ThemeContext from 'theme/ThemeContext';

export interface IAttributeChipsProps {
    Gender: number;
    Smoker: number;
    Relationship: number;
    Eyes: number;
    Size: number;
    Starsign: number;
    Bodyjewelry: number;
    Hair: number;
    Living: number;
}

export function AttributeChips(props: IAttributeChipsProps) {
    const { Gender, Smoker, Relationship, Eyes, Size, Starsign, Bodyjewelry, Hair, Living } = props;
    const { type } = useContext(ThemeContext);

    const translations = useTranslation();

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
        }}>
            <ChipsComponent
                key="gender"
                label={translations[GeschlechtMap[Gender]]}
                color={type === 'light' ? 'black' : 'white'}
                backgroundColor="rgba(66, 165, 245, 0.3)"
                icon={faVenusMars}
            />

            {!isNullOrUndefined(Smoker) && Smoker !== 0 && (
                <ChipsComponent
                    key="smoker"
                    label={translations[SmokerTraitMap[Smoker]]}
                    color={type === 'light' ? 'black' : 'white'}
                    backgroundColor="rgb(255, 167, 38, 0.3)"
                    icon={faSmoking}
                />
            )}
            {!isNullOrUndefined(Relationship) && Relationship !== 0 && (
                <ChipsComponent
                    key="relationship"
                    label={translations[BeziehungMap[Relationship]]}
                    color={type === 'light' ? 'black' : 'white'}
                    backgroundColor="rgb(255, 23, 68, 0.3)"
                    icon={faHeart}
                />
            )}
            {!isNullOrUndefined(Eyes) && Eyes !== 0 && (
                <ChipsComponent
                    key="eyeColor"
                    label={translations[AugenMap[Eyes]]}
                    color={type === 'light' ? 'black' : 'white'}
                    backgroundColor="rgba(102, 187, 106, 0.3)"
                    icon={faEye}
                />
            )}
            {!isNullOrUndefined(Size) && Size !== 0 && (
                <ChipsComponent
                    key="height"
                    label={formatHeight(Size)}
                    color={type === 'light' ? 'black' : 'white'}
                    backgroundColor="rgba(38, 198, 218, 0.3)"
                    icon={faRuler}
                />
            )}
            {!isNullOrUndefined(Starsign) && Starsign !== 0 && (
                <ChipsComponent
                    key="zodiac"
                    label={translations[SternzeichenMap[Starsign]]}
                    color={type === 'light' ? 'black' : 'white'}
                    backgroundColor="rgba(92, 107, 192, 0.3)"
                    icon={faStar}
                />
            )}
            {!isNullOrUndefined(Bodyjewelry) && Bodyjewelry !== 0 && (
                <ChipsComponent
                    key="tatoos"
                    label={translations[KoerperschmuckMap[Bodyjewelry]]}
                    color={type === 'light' ? 'black' : 'white'}
                    backgroundColor="rgba(171, 71, 188, 0.3)"
                    icon={faGem}
                />
            )}
            {!isNullOrUndefined(Hair) && Hair !== 0 && (
                <ChipsComponent
                    key="hairColor"
                    label={translations[HaareMap[Hair]]}
                    color={type === 'light' ? 'black' : 'white'}
                    backgroundColor="rgba(84, 110, 122, 0.3)"
                    icon={faPalette}
                />
            )}
            {!isNullOrUndefined(Living) && Living !== 0 && (
                <ChipsComponent
                    key="housing"
                    label={translations[WohnenMap[Living]]}
                    color={type === 'light' ? 'black' : 'white'}
                    backgroundColor="rgba(236, 64, 122, 0.3)"
                    icon={faHomeLgAlt}
                />
            )}
        </Box>
    );
}

export default AttributeChips;
