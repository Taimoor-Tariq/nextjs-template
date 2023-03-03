/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
    theme: {
        extend: {
            boxShadow: {
                'ctx': '0 0 25px 10px rgba(0, 0, 0, 0.3)',
            },
            colors: {
                mantine: {
                    border: '#373A40',
                    'gray-hover': '#26262b',
                },
                plum: {
                    DEFAULT: '#9c3598',
                    50: '#fdf6fd',
                    100: '#faecfb',
                    200: '#f5d7f7',
                    300: '#eeb8ef',
                    400: '#e48de5',
                    500: '#d461d4',
                    600: '#b742b5',
                    700: '#9c3598',
                    800: '#7c2c78',
                    900: '#662961',
                },
                primary: {
                    DEFAULT: '#D6336C',
                    50: '#FFF0F6',
                    100: '#FFDEEB',
                    200: '#FCC2D7',
                    300: '#FAA2C1',
                    400: '#F783AC',
                    500: '#F06595',
                    600: '#E64980',
                    700: '#D6336C',
                    800: '#C2255C',
                    900: '#A61E4D',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
    corePlugins: {
        preflight: false,
    },
};
