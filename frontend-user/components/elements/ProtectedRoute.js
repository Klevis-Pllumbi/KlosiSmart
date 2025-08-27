'use client'
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Preloader from "@/components/elements/Preloader";

const ProtectedRoute = ({ children, role }) => {
    const { user, loadingUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loadingUser) {
            if (!user) {
                const currentPath = window.location.pathname + window.location.search;
                router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
            } else if (role && user.role !== role) {
                router.push("/unauthorized");
            }
        }
    }, [user, loadingUser, role, router]);

    if (loadingUser || !user) return <Preloader/>;

    return children;
};

export default ProtectedRoute;
