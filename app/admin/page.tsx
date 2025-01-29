

import ArticleList from './ArticleList'
import { TbLogout2 } from "react-icons/tb";

const AdminHomePage = () => {
  


  return (
    <main className="py-[20px]">
      <div className="flex justify-end px-[20px]"><button className="flex items-center gap-[5px] text-[#555c] font-semibold border-none px-[5px] py-[10px]"><TbLogout2 className="text-xl" /> Logout</button></div>
      <h1 className="text-center mb-[20px] text-[32px] font-bold m-[20px]">Article Management System</h1>
      <ArticleList />
    </main>
  )
}

export default AdminHomePage