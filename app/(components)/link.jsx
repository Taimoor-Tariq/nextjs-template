'use client';

import Link from 'next/link';
import { startNavigationProgress } from '@mantine/nprogress';

export default function MyLink({ children, href, ...props }) {
    return (
        <Link
            href={href}
            onClick={() => startNavigationProgress()}
            {...props}
        >
            {children}
        </Link>
    );
}