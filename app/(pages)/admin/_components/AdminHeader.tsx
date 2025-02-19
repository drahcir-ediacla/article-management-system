
import Link from 'next/link'
// import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store'

const AdminHeader = () => {
  // const user = useSelector((state: RootState) => state.auth.data);

  return (
    <header className='flex justify-between items-center p-[20px] text-very-light-green bg-dark-blue'>
      <div className='col1'><h2 className='font-bold text-2xl'><Link href='/admin'>Admin Panel</Link></h2></div>
      <div className='col2'>Richard - Editor</div>
    </header>
  )
}

export default AdminHeader