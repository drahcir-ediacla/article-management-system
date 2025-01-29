
import prisma from '@/prisma/client'
import Link from "next/link"
import Button from "../components/Button"

const ArticleList = async () => {

    const articles = await prisma.articles.findMany({
        include: {
            company: {
                select: { id: true, name: true, logo: true, status: true },
            },
            writer: {
                select: { id: true, firstname: true, lastname: true, type: true, status: true },
            },
            editor: {
                select: { id: true, firstname: true, lastname: true, type: true, status: true },
            },
        },
    });

    return (
        <>
            <div className='flex gap-[15px] justify-center font-medium m-[20px]'>
                <Button label="Add New Article" />
                <Button label="Add New User" />
                <Button label="Add New Company" />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-[20px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Link
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Writer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Editor
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img src={article.image} alt="" className="w-[50px] h-[50px] object-cover" />
                                </th>
                                <td className="px-6 py-4">
                                    {article.title}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={article.link} target="_blank" className="text-blue-600 dark:text-blue-500 hover:underline">View Link</Link>
                                </td>
                                <td className="px-6 py-4">
                                    {article.writer.firstname} {article.writer.lastname}
                                </td>
                                <td className="px-6 py-4">
                                    {article.editor
                                        ? `${article.editor.firstname} ${article.editor.lastname}`
                                        : "No editor assigned"}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-block text-xs py-[4px] px-[8px] rounded-md  ${article.status === 'Published' ? 'text-[#155724] bg-[#d4edda]' : 'text-[#721c24] bg-[#f8d7da]'}`}>{article.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ArticleList