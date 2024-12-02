import { Avatar, MobileStepper, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useCallback, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import generateValidUrl from '../../core/fetch/generateValidUrl';
import { IPaginatedCollection } from '../../models/collections/IPaginatedCollection';
import { IStrangerUserPreview } from '../../models/user/IStrangerUser/IStrangerUserPreview';
import { getProfileImage } from '../../models/user/IUser';
import useTranslation from '../../services/i18n/core/useTranslation';

export const MatchAvatars = memo(({ matches }: { matches: any }) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const containerRef = useRef<HTMLElement | null>(null);
    const { CHAT_MATCHES } = useTranslation();
    const items = [...matches._embedded.items].reverse();
    const isLargeDesktop = useMediaQuery('(min-width:1000px)', { defaultMatches: true });
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: false });
    const isTablet = useMediaQuery('(min-width:500px)', { defaultMatches: false });
    const isMobile = useMediaQuery('(min-width:400px)', { defaultMatches: false });
    const isSmallMobile = useMediaQuery('(max-width:340px)', { defaultMatches: false });
    const ItemCount = isLargeDesktop ? 5 : isDesktop ? 4 : isTablet ? 5 : isMobile ? 4 : isSmallMobile ? 2 : 3;
    const handleStepChange = useCallback((step: number) => setActiveStep(step), [setActiveStep]);
    const divArray = new Array(Math.ceil(items.length / ItemCount)).fill(0);

    if (items.length === 0) {
        return null;
    }

    return (
        <article className="flex no-grow column align-items-center" ref={containerRef}>
            <Typography variant="h5">{CHAT_MATCHES}</Typography>

            {items.length > 0 && (
                <div
                    className="flex column spacing double margin top bottom align-items-center"
                    style={{
                        overflow: 'auto',
                        maxWidth: (containerRef.current?.clientWidth ?? 700) - 16,
                        minWidth: '100%',
                        width: 0,
                        minHeight: 150,
                    }}
                >
                    <SwipeableViews
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                        index={activeStep}
                        style={{ width: '100%' }}
                        slideStyle={{ textAlign: 'center' }}
                    >
                        {divArray.map((_, index) => (
                            <div className="flex" style={{ margin: 'auto', display: 'inline-flex', textAlign: 'center' }}>
                                {items.slice(ItemCount * index, ItemCount * (index + 1)).map((x) => (
                                    <div key={x.Profilid} className="spacing margin left right text-align-center">
                                        <Avatar
                                            src={generateValidUrl(getProfileImage(x))}
                                            style={{ width: 80, height: 80 }}
                                            className="spacing margin bottom"
                                        ></Avatar>
                                        <Typography variant="overline">{x.Username}</Typography>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </SwipeableViews>

                    {divArray.length > 0 && (
                        <MobileStepper
                            steps={divArray.length}
                            position="static"
                            variant="dots"
                            nextButton={null}
                            backButton={null}
                            activeStep={activeStep}
                        />
                    )}
                </div>
            )}
        </article>
    );
});

export default MatchAvatars;
