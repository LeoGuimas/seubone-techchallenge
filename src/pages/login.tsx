import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      password,
    });

    if (res?.ok) {
      router.push("/recortes");
    } else {
      setError(res?.error || "Erro ao fazer login");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-purple-900 py-4 px-8 flex items-center">
        <img src="/logo-branco.svg" alt="Logo Fanation" className="h-6" />
      </header>
      <main className="flex justify-center items-center flex-grow pb-56">
        <div className="bg-white p-10 rounded-lg text-center max-w-md w-full">
          <img src="/logo-default.svg" alt="Logo Fanation" className="w-36 mb-5 mx-auto" />
          <h1 className="text-2xl font-normal mb-1 text-primary">
            Bem-vindo ao Fanation
          </h1>
          <p className="text-base text-gray-600 mb-5">Acesse a sua conta para iniciar</p>
          {error && <p className="text-red-500 mb-5">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="password" className="block text-left mb-2 font-medium text-gray-700">
              Inserir senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="w-full p-3 border-2 border-gray-200 rounded-md text-base font-light focus:outline-none focus:border-purple-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-black text-white w-full text-sm rounded-md cursor-pointer flex transition-all font-light py-4 px-6 justify-center items-center hover:bg-gray-800 mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Acessar"}
            </button>
          </form>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 flex justify-center items-center">
        <img src="/Footer-desenvolvido.svg" alt="Desenvolvido por" className="h-6" />
      </footer>
    </div>
  );
};

export default LoginPage;
