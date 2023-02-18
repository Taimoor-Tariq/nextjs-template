import Link from '@/components/Link';

export default async function Page() {
    const data = new Promise((resolve) => {
        setTimeout(() => {
            resolve('Page 1');
        }, 3000);
    });

    let info = await data;

    return (
        <div className="flex flex-col gap-4 p-4">
            <span className="text-3xl font-semibold">{info}</span>
            <Link href="/" className="text-primary-500 hover:text-primary-300 hover:underline">
                Home Page
            </Link>
        </div>
    );
}

export async function generateMetadata({ params, searchParams }) {
    return {
        title: 'Page 1',
    };
}
