import Link from './(components)/link';

export default function Page() {
    return (
        <div className='flex flex-col gap-4 p-4'>
            <span className='text-3xl font-semibold'>Home Page</span>
            <Link href="/page1" className="text-primary-500 hover:underline hover:text-primary-300">Search</Link>
        </div>
    );
};

export const metadata = {
    title: 'Next.js 13'
};