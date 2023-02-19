'use client';

import { useDisclosure, useClickOutside, useSetState } from '@mantine/hooks';
import { Menu, Kbd } from '@mantine/core';

export default function ContextMenuWrapper({ children, menuItems, menuStyles, menuWidth = 200, ...props }) {
    const [menuOpen, contextMenu] = useDisclosure(false);
    const menuRef = useClickOutside(() => contextMenu.close(), ['mousedown', 'touchstart', 'contextmenu']);
    const [state, setState] = useSetState({
        menuPosition: { x: 0, y: 0 },
    });

    const parseMenuItems = (items) => {
        let groups = {};

        items.forEach((item) => {
            if (item.group) {
                if (!groups[item.group]) groups[item.group] = [];
                groups[item.group].push(item);
            } else {
                if (!groups['']) groups[''] = [];
                groups[''].push(item);
            }
        });

        return groups;
    };

    const RenderMenuItems = () => {
        let groups = parseMenuItems(menuItems);

        if (groups['']) groups = {
            '': groups[''],
            ...groups,
        }

        const RenderKbd = ({ kbd }) => {
            return (
                <>
                    {kbd.map((key, i) => {
                        return (
                            <span key={key}>
                                <Kbd>{key}</Kbd>
                                {i != kbd.length - 1 && <span> + </span>}
                            </span>
                        );
                    })}
                </>
            );
        }

        return (
            <>
                {Object.keys(groups).map((group, i) => {
                    return (
                        <div key={group}>
                            {group && (
                                <>
                                    <Menu.Divider hidden={i == 0} />
                                    <Menu.Label>{group}</Menu.Label>
                                </>
                            )}
                            {parseMenuItems(menuItems)[group].map((item) => {
                                return (
                                    <Menu.Item
                                        key={item.label}
                                        onClick={() => {
                                            item.action();
                                            contextMenu.close();
                                        }}
                                        icon={item.icon}
                                        disabled={item.disabled}
                                        rightSection={item.kbd && <RenderKbd kbd={item.kbd} />}
                                    >
                                        {item.label}
                                    </Menu.Item>
                                );
                            })}
                        </div>
                    );
                })}
            </>
        );
    };

    const openMenu = (e) => {
        setState({
            menuPosition: {
                x: e.clientX,
                y: e.clientY,
            },
        });
        contextMenu.open();
    }

    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault();
                if (!menuOpen) return openMenu(e);
                contextMenu.close();
                setTimeout(() => openMenu(e));
            }}
            {...props}
        >
            <Menu
                shadow="md"
                width={menuWidth}
                opened={menuOpen}
                position="bottom-start"
                closeOnItemClick={true}
                offset={0}
            >
                <div ref={menuRef}>
                    <Menu.Target>
                        <div style={{
                            position: 'fixed',
                            top: state.menuPosition.y,
                            left: state.menuPosition.x,
                        }} />
                    </Menu.Target>

                    <Menu.Dropdown>
                        {/* {Object.keys(parseMenuItems(menuItems)).map((group) => {
                            return (
                                <div key={group}>
                                    {group && (
                                        <>
                                            <Menu.Divider />
                                            <Menu.Label>{group}</Menu.Label>
                                        </>
                                    )}
                                    {parseMenuItems(menuItems)[group].map((item) => {
                                        return (
                                            <Menu.Item
                                                key={item.label}
                                                onClick={() => {
                                                    item.action();
                                                    contextMenu.close();
                                                }}
                                                disabled={item.disabled}
                                            >
                                                {item.label}
                                            </Menu.Item>
                                        );
                                    })}
                                </div>
                            );
                        })} */}
                        <RenderMenuItems />
                    </Menu.Dropdown>
                </div>
            </Menu>
            {children}
        </div>
    );
}
