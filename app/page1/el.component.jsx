'use client';

import ContextMenuWrapper from '@/components/ContextMenuWrapper';
import { notifications } from '@mantine/notifications';
import { useHotkeys } from '@mantine/hooks';
import { modals } from '@mantine/modals';

export default function Component() {
    const openModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <span>
                This action is so important that you are required to confirm it with a modal. Please click
                one of these buttons to proceed.
            </span>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => console.log('Confirmed'),
    });

    useHotkeys([
        ['ctrl+d', openModal]
    ]);

    return (
        <ContextMenuWrapper
            menuItems={[
                {
                    label: 'Show Notification', action: () => notifications.show({
                        title: 'Default notification',
                        message: 'Hey there, your code is awesome! 🤥',
                    })
                },
                { type: 'divider', label: 'Group 1' },
                { label: 'Open Modal', action: openModal, kbd: ['ctrl', 'd'] },
                { label: 'Disabled Action', disabled: true },
                { type: 'divider' },
                {
                    label: 'Submenu', subMenu: [
                        { label: 'Submenu Action' },
                        { label: 'Submenu SubMenu', subMenu: [{ label: 'Submenu SubMenu Action' }] },
                    ]
                },
                { type: 'divider' },
                {
                    label: 'Red Action', action: () => {
                        modals.openConfirmModal({
                            title: 'Delete your profile',
                            children: (
                                <span>
                                    Are you sure you want to delete your profile? This action is destructive and you will have to contact support to restore your data.
                                </span>
                            ),
                            labels: { confirm: 'Delete account', cancel: "No don't delete it" },
                            confirmProps: { color: 'red' },
                            onCancel: () => console.log('Cancel'),
                            onConfirm: () => notifications.show({
                                title: 'Account deleted',
                                message: 'Your account has been deleted. We are sorry to see you go.',
                                color: 'red',
                            }),
                        });
                    }, color: 'red'
                },
            ]}
            menuWidth={250}
        >
            <div className="bg-gray-800">
                <span>Right click me</span>
            </div>
        </ContextMenuWrapper>
    );
}
