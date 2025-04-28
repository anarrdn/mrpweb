import AuthForm from "@/components/auth/AuthForm";

export default function RegisterForm() {
  return <AuthForm mode="register" redirectTo="/dashboard" />;
}
