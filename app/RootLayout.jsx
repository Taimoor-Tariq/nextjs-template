'use client';

import { CacheProvider } from '@emotion/react';
import { MantineProvider, useEmotionCache } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { NavigationProgress, completeNavigationProgress } from '@mantine/nprogress';
import { usePathname, useSearchParams, useServerInsertedHTML } from 'next/navigation';
import { useEffect, useState } from 'react';
import { theme } from './Theme.js';

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
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
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
