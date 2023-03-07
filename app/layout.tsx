import './globals.sass';
import RootLayout from './RootLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                <RootLayout children={children} />
            </body>
        </html>
    );
}
