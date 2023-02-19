'use client';

import ContextMenuWrapper from "@/components/ContextMenuWrapper";

export default function Component() {
    return <ContextMenuWrapper menuItems={[
        { label: 'Item 1', action: () => console.log('Item 1') },
        { label: 'Item 2', action: () => console.log('Item 2'), group: 'Group 1', kbd: ['ctrl', 'd'] },
        { label: 'Item 3', action: () => console.log('Item 3'), group: 'Group 1' },
    ]}>
        <div className='bg-red-500'>
            <span>Right click me</span>
        </div>
    </ContextMenuWrapper>
}