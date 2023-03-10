'use client';

import { useDisclosure, useClickOutside, useSetState } from '@mantine/hooks';
import { Menu, Kbd } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { Fragment, useEffect, useRef } from 'react';

export default function ContextMenuWrapper({ children, menuItems, menuWidth, ...props }: ContextMenuWrapperProps) {
    const [menuOpen, contextMenu] = useDisclosure(false);
    const menuRef = useClickOutside(() => contextMenu.close(), ['mousedown', 'touchstart']);
    const menuOrigin = useRef<HTMLDivElement>(null);
    const [state, setState] = useSetState({
        menuPosition: { x: 0, y: 0 },
    });

    const RenderMenuItems = ({ menuItems }: { menuItems: MenuItem[] }) => {
        const RenderItem = ({ item }: { item: MenuItemProp }) => {
            const RenderKbd = ({ kbd }: { kbd: string[] }) => {
                return (
                    <>
                        {kbd.map((key: string, i: number) => {
                            return (
                                <span key={key}>
                                    <Kbd>{key}</Kbd>
                                    {i != kbd.length - 1 && <span> + </span>}
                                </span>
                            );
                        })}
                    </>
                );
            };

            return (
                <Menu.Item
                    onClick={() => {
                        if (item.action) item.action();
                        contextMenu.close();
                    }}
                    icon={item.icon}
                    disabled={item.disabled}
                    color={item.color}
                    className={`font-semibold ${item.color == 'red' ? 'text-red-500' : ''}`}
                    rightSection={item.subMenu ? <IconChevronRight size={14} /> : item.kbd && <RenderKbd kbd={item.kbd} />}
                >
                    {item.label}
                </Menu.Item>
            );
        };

        return (
            <>
                {menuItems.map((item: MenuItem, i: number) => {
                    if (item.type == 'divider')
                        return (
                            <Fragment key={Math.random()}>
                                <Menu.Divider />
                                {item.label && <Menu.Label>{item.label}</Menu.Label>}
                            </Fragment>
                        );

                    if (item.subMenu)
                        return (
                            <Menu
                                key={i}
                                trigger="hover"
                                position="right-start"
                                shadow="lg"
                                width={menuWidth || 200}
                                closeOnItemClick={true}
                                classNames={{
                                    dropdown: 'shadow-ctx',
                                }}
                            >
                                <Menu.Target>
                                    <div>
                                        <RenderItem item={item} />
                                    </div>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <RenderMenuItems menuItems={item.subMenu} />
                                </Menu.Dropdown>
                            </Menu>
                        );

                    return <RenderItem key={i} item={item} />;
                })}
            </>
        );
    };

    const openMenu = (e: React.MouseEvent) => {
        setState({
            menuPosition: {
                x: e.clientX,
                y: e.clientY,
            },
        });
        contextMenu.open();
    };

    useEffect(() => {
        if (menuOrigin.current) {
            menuOrigin.current.style.top = state.menuPosition.y + 'px';
            menuOrigin.current.style.left = state.menuPosition.x + 'px';
        }
    }, [state.menuPosition]);

    return (
        <span
            onContextMenu={(e) => {
                e.preventDefault();
                if (!menuOpen) return openMenu(e);
                contextMenu.close();
                setTimeout(() => openMenu(e));
            }}
            {...props}
            className={`cursor-context-menu ${props.className}`}
        >
            <Menu
                shadow="lg"
                width={menuWidth || 200}
                opened={menuOpen}
                position="bottom-start"
                trigger="click"
                closeOnItemClick={true}
                offset={0}
                classNames={{
                    dropdown: 'shadow-ctx',
                }}
            >
                <div ref={menuRef}>
                    <Menu.Target>
                        <div className="fixed" ref={menuOrigin} />
                    </Menu.Target>

                    <Menu.Dropdown
                        style={{
                            zIndex: 1000,
                            position: 'fixed',
                        }}
                    >
                        <RenderMenuItems menuItems={menuItems} />
                    </Menu.Dropdown>
                </div>
            </Menu>
            {children}
        </span>
    );
}

interface MenuItemProp {
    label: string | React.ReactNode;
    icon?: React.ReactNode;
    action?: () => void;
    disabled?: boolean;
    type?: 'default' | 'divider';
    color?: 'default' | 'red';
    kbd?: string[];
    subMenu?: MenuItem[];
}

interface MenuDivider {
    type: 'divider';
    label?: string;
}

type MenuItem = MenuItemProp | MenuDivider;

interface ContextMenuWrapperProps {
    menuItems: MenuItem[];
    menuWidth?: number;
    children: React.ReactNode;
    [key: React.Key]: any;
}
