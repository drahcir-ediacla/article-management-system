
import { Suspense } from 'react';
import ArticleList from './ArticleList'
import LogoutButton from '../components/LogoutButton';
import Loading from './loading';

const AdminHomePage = async () => {


  return (
    <main className="py-[20px]">
      <div className="flex justify-end px-[20px]"><LogoutButton /></div>
      <h1 className="text-center mb-[20px] text-[32px] font-bold m-[20px]">Article Management System</h1>
      <Suspense fallback={<Loading />}>
        <ArticleList />
      </Suspense>
    </main>
  )
}

export default AdminHomePage