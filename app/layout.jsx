import './(components)/globals.sass';
import Root from './(components)/emotion';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body>
                <Root children={children} />
            </body>
        </html>
    );
}
