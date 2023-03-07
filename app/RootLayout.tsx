'use client';

import { CacheProvider } from '@emotion/react';
import { MantineProvider, useEmotionCache } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress, completeNavigationProgress } from '@mantine/nprogress';
import { usePathname, useSearchParams, useServerInsertedHTML } from 'next/navigation';
import { useEffect, useState } from 'react';
import { theme } from './Theme';

export default function RootStyleRegistry({ children }: { children: React.ReactNode }) {
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
                <ModalsProvider
                    modalProps={{
                        centered: true,
                        closeOnClickOutside: true,
                        classNames: {
                            content: 'border-2 border-gray-700 rounded-lg bg-gray-800',
                            header: 'bg-transparent',
                            overlay: 'z-0',
                            title: 'text-xl font-semibold',
                            close: 'text-red-400',
                        },
                    }}
                >
                    <Notifications />
                    <NavigationProgress autoReset={true} size={2} />
                    {children}
                </ModalsProvider>
            </MantineProvider>
        </CacheProvider>
    );
}
