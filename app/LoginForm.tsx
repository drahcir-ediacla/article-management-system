// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { store, useAppDispatch } from "./redux/store";
// import { axiosInstance } from "./_lib/axiosInstance";
// import { setAccessToken } from "./redux/reducer/tokenSlice";
// import axios from "axios";
// import { IoInformationCircleSharp } from "react-icons/io5";
// import Input from './_components/Input'
// import Button from './_components/Button'

// const LoginForm = () => {

//     const router = useRouter()
//     const dispatch = useAppDispatch();
//     const [userName, setUserName] = useState("");
//     const [password, setPassword] = useState("");
//     const [userNameError, setUserNameError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [error, setError] = useState("");
//     const [authenticating, setAuthenticating] = useState<boolean>(false)

//     const validateForm = () => {
//         let hasErrors = false;

//         if (!userName) {
//             setUserNameError('Username is required');
//             hasErrors = true;
//         } else {
//             setUserNameError('');
//         }

//         if (!password) {
//             setPasswordError('Password is required');
//             hasErrors = true;
//         } else {
//             setPasswordError('');
//         }

//         return !hasErrors;
//     };

//     const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         setError("");

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             setAuthenticating(true)
//             const response = await axiosInstance.post(
//                 "/api/auth",
//                 { userName, password } // Correctly send the data payload
//             );

//             if (response.status === 200) {
//                 dispatch(setAccessToken(response.data.accessToken));
//                 console.log("Stored Access Token in Redux:", store.getState().token.accessToken);
//                 router.push('/admin');
//             }
//             setAuthenticating(false)

//         } catch (error) {
//             setAuthenticating(false)
//             console.error("Error sending request:", error);
//             if (axios.isAxiosError(error) && error.response) {
//                 if (error.response.status === 401) {
//                     setError("Invalid username or password. Please try again.");
//                 } else {
//                     setError(error.response.data?.message || "An unknown error occurred.");
//                 }
//             } else {
//                 setError("An unexpected error occurred.");
//             }
//         }
//     };


//     return (
//         <main className='flex flex-col gap-[33px] h-auto bg-white rounded-[20px] shadow-md max-w-[445px] py-[38px] px-[20px] m-auto'>
//             <form className='flex flex-col gap-[33px] h-auto'>
//                 <div>
//                     <div className='text-center'>
//                         <h1 className='text-[32px] font-bold'>Admin Login</h1>
//                         Use a valid username and password to gain access.
//                     </div>
//                 </div>
//                 <div className='flex flex-col gap-[5px]'>
//                     <label htmlFor="inputUsernameID"><b>Username</b></label>
//                     {userNameError && <div className="flex gap-[2px] text-red-600"><IoInformationCircleSharp className="text-xl" /> {userNameError}</div>}
//                     <Input
//                         id="inputUsernameID"
//                         value={userName}
//                         onChange={(e) => setUserName(e.target.value)}
//                     />
//                 </div>
//                 <div className='flex flex-col gap-[5px]'>
//                     <label htmlFor="inputPasswordID"><b>Password</b></label>
//                     {passwordError && <div className="flex gap-[2px] text-red-600"><IoInformationCircleSharp className="text-xl" /> {passwordError}</div>}
//                     <Input
//                         id="inputPasswordID"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 {error && <div className="flex gap-[2px] text-red-600 items-center"><IoInformationCircleSharp className="text-xl" /> {error}</div>}
//                 <span className="loading loading-dots loading-lg"></span>
//                 {!authenticating ? (<Button label="Login" onClick={handleLogin} />
//                 ) : (
//                     <button type="button" className="flex justify-center items-center text-very-light-green font-medium p-[10px] bg-navy-blue border-none rounded-md" disabled>
//                         <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                         Authenticating…
//                     </button>
//                 )}
//             </form>
//         </main>
//     )
// }

// export default LoginForm

'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { axiosInstance } from "./_lib/axiosInstance";
import { LoginFormSchema } from '@/app/_schemas/auth';
import { IoInformationCircleSharp } from "react-icons/io5";
import Input from './_components/Input';
import Button from './_components/Button';

export function LoginForm() {
    const [state, setState] = useState<{ errors?: Record<string, string[]> }>({});
    const router = useRouter();
    const [authenticating, setAuthenticating] = useState<boolean>(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const validatedFields = LoginFormSchema.safeParse({
            userName: formData.get('inputUsername'),
            password: formData.get('inputPassword'),
        });

        if (!validatedFields.success) {
            setState({ errors: validatedFields.error.flatten().fieldErrors });
            return;
        }

        const { userName, password } = validatedFields.data;

        try {
            setAuthenticating(true)
            const response = await axiosInstance.post("/api/auth", { userName, password });

            if (response.status === 200) {
                router.push('/admin');
            }
            setAuthenticating(false)
        } catch (error) {
            setAuthenticating(false)
            console.error("Error sending request:", error);
            if (axios.isAxiosError(error) && error.response) {
                if (error.response?.status === 401) {
                    setState({ errors: { general: ["Invalid username or password."] } });
                } else {
                    setState({ errors: { general: [error.response?.data?.message || "An unknown error occurred."] } });
                }
            } else {
                setState({ errors: { general: ["An unexpected error occurred."] } });
            }

        }
    };

    return (
        <main className='flex flex-col gap-[33px] h-auto bg-white rounded-[20px] shadow-md max-w-[445px] py-[38px] px-[20px] m-auto'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-[33px] h-auto'>
                <div className='text-center'>
                    <h1 className='text-[32px] font-bold'>Admin Login</h1>
                    <p>Use a valid username and password to gain access.</p>
                </div>

                <div className='flex flex-col gap-[5px]'>
                    <label htmlFor="inputUsernameID"><b>Username</b></label>
                    <Input id="inputUsernameID" name="inputUsername" />
                    {state.errors?.userName && <div className="flex gap-[2px] text-red-600"><IoInformationCircleSharp className="text-xl" /> <p>{state.errors.userName[0]}</p></div>}
                </div>

                <div className='flex flex-col gap-[5px]'>
                    <label htmlFor="inputPasswordID"><b>Password</b></label>
                    <Input id="inputPasswordID" name="inputPassword" type="password" />
                    {state.errors?.password && (
                        <div className="flex flex-col gap-[2px] text-red-600">
                            <div className='flex gap-[2px]'><IoInformationCircleSharp className="text-xl" /><span>Password must:</span></div>
                            <ul>
                                {state.errors.password.map((error, index) => (
                                    <li key={index}>- {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {state.errors?.general && (
                    <div className="flex flex-row gap-[2px] text-red-600">
                        <IoInformationCircleSharp className="text-xl" /> {state.errors.general[0]}
                    </div>
                )}
                {!authenticating ? (<Button label="Login" type='submit' />
                ) : (
                    <button type="button" className="flex justify-center items-center text-very-light-green font-medium p-[10px] bg-navy-blue border-none rounded-md" disabled>
                        <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Authenticating…
                    </button>
                )}
            </form>
        </main>
    );
}
