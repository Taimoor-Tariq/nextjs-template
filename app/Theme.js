import { MantineThemeOverride } from '@mantine/core';
import colors from 'tailwindcss/colors';

const ignoreValues = ['transparent', 'current', 'inherit', 'warmGray', 'trueGray', 'coolGray', 'blueGray', 'black', 'white', 'lightBlue'];

let themeColors = {};
Object.keys(colors).forEach((color) => {
    if (ignoreValues.includes(color)) return;
    themeColors[color] = [colors[color]['50'], ...Object.values(colors[color])];
});

/** @type {MantineThemeOverride} */
export const theme = {
    colorScheme: 'dark',
    loader: 'dots',
    primaryColor: 'pink',
    primaryShade: 7,
    colors: {
        dark: [colors.gray['100'], colors.gray['200'], colors.gray['300'], colors.gray['400'], colors.gray['500'], colors.gray['600'], colors.gray['700'], colors.gray['900'], colors.gray['900'], colors.gray['900']],
        ...themeColors,
    },
};
