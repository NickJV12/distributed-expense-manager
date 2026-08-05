import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BackgroundBlobs from "../../components/auth/BackgroundBlobs";
import RegisterHeader from "../../components/auth/RegisterHeader";
import RegisterForm from "../../components/auth/RegisterForm";

import GlassCard from "../../components/ui/GlassCard";
import ThemeToggle from "../../components/ui/ThemeToggle";

import { register as registerUser } from "../../features/auth/authApi";

function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
    } = useForm();

    const onSubmit = async(data) => {
        try{
            const payload = {
                name: data.name,
                email: data.email,
                password: data.password,
            };

            const response = await registerUser(payload);

            toast.success(response.message);
            navigate("/login");
        } catch(error){
            toast.error(error?.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--bg) px-4">
           <BackgroundBlobs />
           <div className="absolute right-6 top-6">
            <ThemeToggle />
           </div>
           <GlassCard className="relative z-10 w-full max-w-md">
             <RegisterHeader />
             <RegisterForm
             register={register}
             handleSubmit={handleSubmit}
             onSubmit={onSubmit}
             watch={watch}
             errors={errors}
             isSubmitting={isSubmitting}
             />
           </GlassCard>
        </div>
    );
}

export default Register;