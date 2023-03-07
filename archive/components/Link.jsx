'use client';

import { startNavigationProgress } from '@mantine/nprogress';
import Link from 'next/link';

export default function MyLink({ children, href, ...props }) {
    return (
        <Link href={href} onClick={() => startNavigationProgress()} {...props}>
            {children}
        </Link>
    );
}
