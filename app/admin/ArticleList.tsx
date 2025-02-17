
'use client'
// import prisma from '@/prisma/client'
import Link from "next/link"
import Image from "next/image";
import Button from "../_components/Button"
import { axiosHandler } from '../_lib/axiosHandler'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { store, useAppDispatch, useAppSelector } from "../redux/store";
import { getArticles } from "../redux/actions/articleListActions";

interface Company {
    id: number;
    logo: string;
    name: string;
    status: "Active" | "Inactive";
}

interface Writer {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    type: "Writer" | "Editor";
    status: "Active" | "Inactive";
};

interface Editor {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    type: "Writer" | "Editor";
    status: "Active" | "Inactive";
};

interface Article {
    id: number;
    image: string;
    title: string;
    link: string;
    status: "Published" | "For Edit";
    writer: Writer;
    editor: Editor;
    company: Company;
};


// export async function getArticles(): Promise<Article[]> {
//     try {
//         // await new Promise((resolve) => setTimeout(resolve, 3000));
//         const response = await axiosHandler.get('/api/article', {
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true
//         });
//         return response.data as Article[];
//     } catch (error) {
//         console.error("Error fetching articles:", error);
//     }

//     return []; // Always return an array to avoid undefined return errors
// }





const ArticleList = () => {
    // const [articles, setArticles] = useState<Article[]>([])
    // const articles: Article[] = await getArticles();
    // const articles = useSelector((state: RootState) => state.articleList.data);


    const dispatch = useAppDispatch();
    const articles = useAppSelector((state) => state.articleList.data);

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getArticlaData = async () => {
    //         try {
    //             // await new Promise((resolve) => setTimeout(resolve, 3000));
    //             const response = await axiosHandler.get('/api/article', {
    //                 signal: controller.signal
    //             });
    //             isMounted && setArticles(response.data)
    //         } catch (error) {
    //             console.error("Error fetching articles:", error);
    //         }
    //     }
    //     getArticlaData();
    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }
    // }, [])




    // useEffect(() => {
    //     const fetchArticles = async () => {
    //         try {
    //             await new Promise((resolve) => setTimeout(resolve, 3000));
    //             const response = await axiosHandler.get('/api/article')

    //             if (response.status === 200) {
    //                 setArticles(response.data)
    //             }
    //         } catch (error) {
    //             console.error('Error fetching articles:', error);
    //         }
    //     }
    //     fetchArticles();
    // }, [])

    // const articles = await prisma.article.findMany({
    //     include: {
    //         company: {
    //             select: { id: true, name: true, logo: true, status: true },
    //         },
    //         writer: {
    //             select: { id: true, firstName: true, lastName: true, type: true, status: true },
    //         },
    //         editor: {
    //             select: { id: true, firstName: true, lastName: true, type: true, status: true },
    //         },
    //     },
    // });



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
                                    <div className="w-[50px] h-[50px] overflow-hidden">
                                        <Image src={article.image} alt="" width={50} height={50} objectFit="cover" />
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {article.title}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={article.link} target="_blank" className="text-blue-600 dark:text-blue-500 hover:underline">View Link</Link>
                                </td>
                                <td className="px-6 py-4">
                                    {article.writer.firstName} {article.writer.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {article.editor
                                        ? `${article.editor.firstName} ${article.editor.lastName}`
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