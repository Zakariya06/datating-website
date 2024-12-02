import Config from '../config/config';
import { IImage } from '../models/core/image/IImage';

export const fallbackPicture: IImage = {
    Picture: Config.FALLBACK_IMAGE,
    ProfileImage: true,
    Coins: 0,
};
