import {useState} from 'react';
import {Eye, EyeClosed, FilePdf, PencilSimple, PlusCircle, WarningCircle} from '@phosphor-icons/react';
import Google from '../assets/google-logo.png';
import Screen from '../assets/screen.png';
import Laptop from '../assets/laptop.png';
import {FooterLogin} from '../components/login/FooterLogin';
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';
import app from '../libs/firebaseconfig';
import api from '../libs/axios';
import cookies, {Check} from '../libs/cookies';
import {Navigate, useNavigate} from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const url = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  function HandlePassword() {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  }

  function GoogleLogin() {
    signInWithPopup(auth, provider)
      .then((googleData) => {
        api.post('/auth', googleData).then((token) => {
          console.log(token);
          api.defaults.headers.common = {
            Authorization: `Bearer ${token.data}`,
          };
          const cookiesLife = 60 * 60 * 24;
          cookies.set('token', token.data, {
            path: '/',
            maxAge: cookiesLife,
          });
          Check();
          url('/dashboard');
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {!Check() ? (
        <div className="my-screen flex flex-col items-center justify-between bg-neutral-50">
          <div className="mb-10 flex grow items-center">
            <div className="flex h-min flex-col items-center gap-16 lg:flex-row">
              <div className="m-2 mt-10 flex flex-col rounded bg-white p-5 shadow max-[1000px]:p-1 lg:mt-0 lg:animate-fade-in-left">
                <h1 className="mb-10 text-2xl font-bold">Entrar ou registrar-se</h1>

                <div className="flex flex-col">
                  <label htmlFor="e-mail">E-mail</label>
                  <input
                    className="mb-5 w-[320px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    id="e-mail"
                    type="email"
                  />

                  <label htmlFor="senha">Senha</label>
                  <div className="flex ">
                    <input
                      className="w-[320px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                      id="senha"
                      type={showPassword ? 'text' : 'password'}
                    />

                    {showPassword ? (
                      <label htmlFor="senha">
                        <EyeClosed size={22} className="cursor-pointer opacity-40" onClick={HandlePassword} />
                      </label>
                    ) : (
                      <label htmlFor="senha">
                        <Eye size={22} className="cursor-pointer opacity-40" onClick={HandlePassword} />{' '}
                      </label>
                    )}
                  </div>

                  <div className="mt-10 flex w-full flex-col items-center gap-4">
                    <button className="h-10 w-64 cursor-not-allowed rounded bg-gray-300 text-neutral-600">Entrar com e-mail</button>

                    <button className="h-10 w-64 rounded bg-gray-200 transition hover:bg-gray-100" onClick={GoogleLogin}>
                      <div className="flex items-center justify-center gap-3">
                        <img src={Google} className="w-7" alt="Google Logo" />
                        <span className="pr-7">Continuar com o Google</span>
                      </div>
                    </button>

                    <div className="flex items-center gap-1">
                      <WarningCircle size={25} className="opacity-30" />
                      <span className="italic text-zinc-400">Atualmente só é possível entrar com o Google</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-[23rem] flex-col justify-center p-5 lg:animate-fade-in-right">
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <img src={Screen} className="mb-2 w-20 animate-bounce-top" />
                    <img src={Laptop} className="mb-2 w-16 animate-bounce-bottom" />
                  </div>
                  <h1 className="mb-10 text-2xl font-bold">Organize os seus notebooks aqui.</h1>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex gap-3">
                    <PlusCircle size={40} color="green" weight="fill" className="pb-3 opacity-60" />
                    <span>Adicione as informações do notebook, fotos e organize as suas máquinas.</span>
                  </div>

                  <div className="flex gap-3">
                    <PencilSimple size={35} weight="fill" color="blue" className="opacity-60" />
                    <span>Mudou de configuração? Edite facilmente, arquive ou exclua.</span>
                  </div>

                  <div className="flex gap-3">
                    {/* <img src={PDF} className='h-6 opacity-80 mt-2'/> */}
                    <FilePdf size={32} weight="fill" color="red" className="opacity-60" />
                    <span>Baixe um PDF com todos os detalhes do aparelho.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterLogin />
        </div>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  );
}
