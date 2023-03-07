import colors from 'tailwindcss/colors';
import { MantineThemeOverride } from '@mantine/core';

const ignoreValues = ['transparent', 'current', 'inherit', 'warmGray', 'trueGray', 'coolGray', 'blueGray', 'black', 'white', 'lightBlue'];

interface ThemeColors {
    [key: string]: string[];
}

let themeColors: ThemeColors = {};
Object.keys(colors).forEach((color) => {
    const c: any = colors;
    if (ignoreValues.includes(color)) return;
    themeColors[color] = [c[color]['50'], ...Object.values(c[color])];
});

export const theme: MantineThemeOverride = {
    colorScheme: 'dark',
    loader: 'dots',
    primaryColor: 'pink',
    primaryShade: 7,
    colors: {
        dark: [colors.gray['100'], colors.gray['200'], colors.gray['300'], colors.gray['400'], colors.gray['500'], colors.gray['600'], colors.gray['700'], colors.gray['900'], colors.gray['900'], colors.gray['900']],
        ...themeColors,
    },
};
