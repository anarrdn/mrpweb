import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Login to MedTech</h1>
      <LoginForm />
    </div>
  );
}
