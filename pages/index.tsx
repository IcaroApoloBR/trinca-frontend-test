import Head from "next/head";
import { signIn } from 'next-auth/react';;
import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from "next/image";
import { Button } from "../src/components/Button";
import { toast } from "react-toastify";

const loginUserSchema = z.object({
  email: z.string().nonempty('O e-mail é obrigatório').email('Formato de e-mail inválido').toLowerCase().trim(),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

type LoginUserDataProps = z.infer<typeof loginUserSchema>

// Credenciais de acesso:
// Login: trinca@teste.com
// Senha: trinca@teste

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginUserDataProps>({
    resolver: zodResolver(loginUserSchema)
  });

  const showPassword = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const loginUser = async (data: LoginUserDataProps) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("E-mail ou senha incorretos");
        toast.error("Credenciais inválidas");
      } else {
        router.push("/churras");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Trinca | Login</title>
      </Head>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-darkPrimary">

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-auto w-full bg-hero-login bg-no-repeat bg-left-bottom bg-cover brightness-50" />

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen bg-darkPrimary">
          <div className="max-w-md w-full">

            <div className="flex flex-col items-center my-4">
              <Image src="/logo.png" width={200} height={200} alt="Trinca Logo" />
            </div>

            {errorMessage && <p className="text-red-500 text-sm text-center mb-1">{errorMessage}</p>}

            <form className="space-y-4"
              onSubmit={handleSubmit(loginUser)}>
              <div className="relative">
                <div className="absolute top-3 pl-3 pointer-events-none">
                  <Icon className="text-colorPrimary" icon="mdi:user" width="24" />
                </div>
                <input
                  type="text"
                  {...register('email')}
                  autoComplete="email"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary pl-10 p-3 w-full  bg-darkSecondary placeholder-gray-400 text-gray-200 rounded-md focus:z-10 sm:text-sm"
                  placeholder="trinca@teste.com"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div className="relative">
                <div className="absolute top-3 pl-3 pointer-events-none">
                  <Icon className="text-colorPrimary" icon="mdi:password" width="24" />
                </div>
                <button type="button" onClick={showPassword} className="absolute top-3 right-0 pr-3">
                  {isPasswordVisible ?
                    <Icon className="text-colorPrimary hover:text-colorPrimary" icon="mdi:eye" width="24" />
                    :
                    <Icon className="text-colorPrimary hover:text-colorPrimary" icon="mdi:eye-off" width="24" />
                  }
                </button>
                <input
                  {...register('password')}
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  value={password || ''}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary pl-10 p-3 w-full  bg-darkSecondary placeholder-gray-400 text-gray-200 rounded-md focus:z-10 sm:text-sm"
                  placeholder="******"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </div>

            </form>
          </div>
        </motion.div>

      </div >
    </>
  )
}