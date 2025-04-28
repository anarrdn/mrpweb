import AuthForm from "@/components/auth/AuthForm";

export default function LoginForm() {
  return <AuthForm mode="login" redirectTo="/dashboard" />;
}
