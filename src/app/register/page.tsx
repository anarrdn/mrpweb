import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Register for MedTech
      </h1>
      <RegisterForm />
    </div>
  );
}
