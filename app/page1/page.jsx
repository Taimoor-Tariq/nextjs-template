import Link from '../(components)/link';

export default async function Page() {
    const data = new Promise((resolve) => {
        setTimeout(() => {
            resolve('Page 1');
        }, 3000);
    });

    let info = await data;

    return (
        <div className='flex flex-col gap-4 p-4'>
            <span className='text-3xl font-semibold'>{info}</span>
            <Link href="/" className="text-primary-500 hover:underline hover:text-primary-300">Home Page</Link>
        </div>
    );
};

export async function generateMetadata({ params, searchParams }) {
    return {
        title: 'Page 1',
    };
};