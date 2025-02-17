"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ Use Next.js router instead of window.location.href
import { axiosHandler } from "../lib/axiosHandler";
import { clearAccessToken } from "../redux/reducer/tokenSlice"; // ✅ Updated action name for clarity
import { TbLogout2 } from "react-icons/tb";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const router = useRouter(); // ✅ Use Next.js router for better UX

    const logoutUser = async () => {
        try {
            await axiosHandler.get("/api/auth/logout");

            // ✅ Clear token in Redux
            dispatch(clearAccessToken());

            // ✅ Redirect using Next.js router (prevents full page reload)
            router.push("/");

        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="flex justify-end px-[20px]">
            <button 
                className="flex items-center gap-[5px] text-[#555c] font-semibold border-none px-[5px] py-[10px]"
                onClick={logoutUser}
            >
                <TbLogout2 className="text-xl" /> Logout
            </button>
        </div>
    );
};

export default LogoutButton;
