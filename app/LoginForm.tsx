import React from 'react'
import Input from './components/Input'
import Button from './components/Button'

const LoginForm = () => {
    return (
        <main className='flex flex-col gap-[33px] h-auto bg-white rounded-[20px] shadow-md max-w-[445px] py-[38px] px-[20px] m-auto'>
            <form className='flex flex-col gap-[33px] h-auto'>
                <div>
                    <div className='text-center'>
                        <h1 className='text-[32px] font-bold'>Admin Login</h1>
                        Use a valid username and password to gain access.
                    </div>
                </div>
                <div className='flex flex-col gap-[5px]'>
                    <label htmlFor="inputUsernameID"><b>Username</b></label>
                    <Input />
                </div>
                <div className='flex flex-col gap-[5px]'>
                    <label htmlFor="inputPasswordID"><b>Password</b></label>
                    <Input />
                </div>
                <Button label="Login"/>
            </form>
        </main>
    )
}

export default LoginForm