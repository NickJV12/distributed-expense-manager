import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import BackgroundBlobs from "../../components/auth/BackgroundBlobs";
import LoginHeader from "../../components/auth/LoginHeader";
import LoginForm from "../../components/auth/LoginForm";

import GlassCard from "../../components/ui/GlassCard";
import ThemeToggle from "../../components/ui/ThemeToggle";

import { login } from "../../features/auth/authApi";
import { loginSuccess } from "../../features/auth/authSlice";

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try{
            const response = await login(data);
            
            const {user, token} = response;

            dispatch(
                loginSuccess({
                    user,
                    token,
                })
            );

            toast.success(response.data.message);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(
                error?.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--bg) px-4 ">
        <BackgroundBlobs />

         <div className="absolute right-6 top-6">
            <ThemeToggle />
         </div>

         <GlassCard className="relative z-10 w-full max-w-md">
            <LoginHeader />

            <LoginForm
             register={register}
             errors={errors}
             handleSubmit={handleSubmit}
             onSubmit={onSubmit}
             isSubmitting={isSubmitting}
            />
            
            <p className="mt-8 text-center text-sm">
              Don't have an account?
              <Link to="/register" className="ml-2 font-semibold text-[#3A7F7A] hover:underline">
               Register
              </Link>
            </p>
         </GlassCard>
        </div>
    );
}

export default Login;