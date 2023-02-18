'use client';

import { useServerInsertedHTML, usePathname, useSearchParams } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { NavigationProgress, completeNavigationProgress } from '@mantine/nprogress';

export default function RootStyleRegistry({ children }) {
    const cache = useEmotionCache();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isMounted, setIsMounted] = useState(false);

    cache.compat = true;

    useServerInsertedHTML(() => (
        <style
            key={cache.key}
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(' '),
            }}
        />
    ));

    useEffect(() => {
        if (!isMounted) setIsMounted(true);
        else completeNavigationProgress();
    }, [pathname, searchParams]);

    return (
        <CacheProvider value={cache}>
            <MantineProvider
                theme={{
                    colorScheme: 'dark',
                    loader: 'dots',
                    primaryColor: 'pink',
                    primaryShade: 7,
                }}
                withGlobalStyles
                withNormalizeCSS
            >
                <NotificationsProvider>
                    <ModalsProvider>
                        <NavigationProgress autoReset={true} size={2} />
                        {children}
                    </ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </CacheProvider>
    );
}
