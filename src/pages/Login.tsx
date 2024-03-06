import { useState } from 'react'
import {Eye, EyeClosed, FilePdf, PencilSimple, PlusCircle, WarningCircle} from "@phosphor-icons/react"
import Google from "../assets/google-logo.png"
import Screen from '../assets/screen.png'
import Laptop from '../assets/laptop.png'
import { FooterLogin } from '../components/login/FooterLogin'
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'
import app from '../libs/firebase'
import api from '../libs/axios'
import cookies, { Check } from '../libs/cookies'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const url = useNavigate()

  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: 'select_account'
  })

  function HandlePassword(){
    if(showPassword)
      setShowPassword(false)
    else
      setShowPassword(true)
  }

  
  function GoogleLogin(){
    signInWithPopup(auth, provider).then((googleData) => {
      api.post('/auth', googleData).then((token) => {
        console.log(token)
        api.defaults.headers.common = {'Authorization': `Bearer ${token.data}` }
        const cookiesLife = 60 * 60 * 24;
        cookies.set('token', token.data, {path: '/', maxAge: cookiesLife})
        Check()
        url('/dashboard')
      })
      
    }).catch((error) => {
      console.log(error)
    })
    
  }

  return (
    <>
      {!Check() ? 
        <div className="flex my-screen flex-col items-center justify-between bg-neutral-50">
          <div className='flex items-center grow mb-10'>
            <div className='flex flex-col items-center h-min gap-16 lg:flex-row'>
              <div className="flex flex-col rounded shadow bg-white p-5 m-2 mt-10 lg:mt-0 lg:animate-fade-in-left">
                <h1 className="text-2xl font-bold mb-10">Entrar ou registrar-se</h1>

                <div className="flex flex-col">

                  
                                  
                      <label htmlFor="e-mail">E-mail</label>
                      <input 
                        className="border w-[320px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1" 
                        id="e-mail" type="email"/>
                    

                    
                      <label htmlFor="senha">Senha</label>
                      <div className='flex '>
                        <input 
                          className="border w-[320px] border-b-gray-400 border-transparent outline-none transition focus:border-b-sky-500 pb-1" 
                          id="senha" type={showPassword ? "text" : "password"}
                        />

                        {showPassword ? <label htmlFor='senha'> <EyeClosed size={22} className='opacity-40 cursor-pointer' onClick={HandlePassword}/> </label>
                        : <label htmlFor='senha'><Eye size={22} className='opacity-40 cursor-pointer' onClick={HandlePassword}/> </label>}
                      </div>
                    
                    
                  

                  <div className='flex flex-col items-center w-full mt-10 gap-4'>
                    <button className="h-10 w-64 bg-gray-300 text-neutral-600 rounded cursor-not-allowed">Entrar com e-mail</button>

                    <button className="h-10 w-64 bg-gray-200 rounded hover:bg-gray-100 transition" 
                    onClick={GoogleLogin}>
                      <div className="flex justify-center items-center gap-3">
                        <img src={Google} className="w-7" alt="Google Logo"/>
                        <span className='pr-7'>Continuar com o Google</span>
                      </div>  
                    </button>

                    <div className="flex items-center gap-1">
                      <WarningCircle size={25} className='opacity-30'/>
                      <span className="italic text-zinc-400">Atualmente só é possível entrar com o Google</span>
                    </div>
                  </div>

                  
                </div>
              </div>

              <div className="flex flex-col justify-center w-[23rem] p-5 lg:animate-fade-in-right">
                <div className='flex flex-col'>
                  <div className='flex gap-3'>
                    <img src={Screen} className='w-20 mb-2 animate-bounce-top'/>
                    <img src={Laptop} className='w-16 mb-2 animate-bounce-bottom'/>
                  </div>
                  <h1 className="text-2xl font-bold mb-10">Organize os seus notebooks aqui.</h1>
                </div>

                <div className='flex flex-col gap-5'>
                  <div className='flex gap-3'>
                    <PlusCircle size={40} color='green' weight='fill' className='opacity-60 pb-3'/>
                    <span>Adicione as informações do notebook, fotos e organize as suas máquinas.</span>
                  </div>

                  <div className='flex gap-3'>
                    <PencilSimple size={35} weight='fill' color='blue' className='opacity-60'/>
                    <span>Mudou de configuração? Edite facilmente, arquive ou exclua.</span>
                  </div>

                  <div className='flex gap-3'>
                    {/* <img src={PDF} className='h-6 opacity-80 mt-2'/> */}
                    <FilePdf size={32} weight='fill' color='red' className='opacity-60'/>
                    <span>Baixe um PDF com todos os detalhes do aparelho.</span> 
                  </div>
                </div>      

              </div>
            </div>    

          </div>    
          <FooterLogin/>
        </div>
      : <Navigate to='/dashboard'/>}
    </>
  )
}