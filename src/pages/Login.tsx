import {useState} from 'react';
import {Eye, EyeClosed, FilePdf, PencilSimple, PlusCircle, WarningCircle} from '@phosphor-icons/react';
import Google from '../assets/google-color-logo.png';
import Screen from '../assets/screen.png';
import Laptop from '../assets/laptop.png';
import {FooterLogin} from '../components/login/FooterLogin';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
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

  function GoogleLogin() {
    signInWithPopup(auth, provider)
      .then((googleData) => {
        api.post('/auth', googleData).then((token) => {
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
        <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-bl from-neutral-100 to-neutral-50">
          <div className="flex grow items-center">
            <div className="mb-20 flex flex-col items-center gap-10 min-[900px]:mb-0 min-[900px]:flex-row min-[900px]:gap-16">
              <div className="m-3 flex flex-col rounded bg-white p-5 shadow min-[900px]:animate-fade-in-left">
                <h1 className="mb-10 font-roboto text-2xl font-bold text-neutral-800">Entrar ou registrar-se</h1>
                <div className="flex flex-col">
                  <div className="flex gap-5">
                    <div className="flex grow flex-col">
                      <label className="font-roboto font-normal text-neutral-800" htmlFor="e-mail">
                        E-mail
                      </label>
                      <input
                        className="mb-5 border border-transparent border-b-gray-400 pb-1 font-roboto text-black outline-none transition focus:border-b-sky-500"
                        id="e-mail"
                        type="email"
                      />

                      <label className="font-roboto font-normal text-neutral-800" htmlFor="senha">
                        Senha
                      </label>
                      <input
                        className="border border-transparent border-b-gray-400 pb-1 font-roboto text-black outline-none transition focus:border-b-sky-500"
                        id="senha"
                        type={showPassword ? 'text' : 'password'}
                      />
                    </div>
                    <div className="mb-2 flex flex-col-reverse">
                      {showPassword ? (
                        <label htmlFor="senha">
                          <EyeClosed size={22} className="cursor-pointer opacity-40" onClick={() => setShowPassword(!showPassword)} />
                        </label>
                      ) : (
                        <label htmlFor="senha">
                          <Eye size={22} className="cursor-pointer opacity-40" onClick={() => setShowPassword(!showPassword)} />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col items-center gap-4">
                    <button className="h-10 w-64 cursor-not-allowed rounded bg-neutral-300 font-roboto text-neutral-600">
                      Entrar com e-mail
                    </button>

                    <button
                      className="h-10 w-64 rounded bg-slate-600 bg-opacity-95 transition hover:bg-slate-500"
                      onClick={GoogleLogin}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <img src={Google} className="w-6" alt="Google Logo" />
                        <span className="pr-4 font-roboto font-bold text-neutral-100">Continuar com o Google</span>
                      </div>
                    </button>

                    <div className="flex items-center gap-2">
                      <div className="w-min">
                        <WarningCircle size={25} className="opacity-30" />
                      </div>
                      <span className="font-roboto font-light italic text-neutral-400">
                        Atualmente só é possível entrar com o Google
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex max-w-[24rem] flex-col justify-center p-5 min-[900px]:animate-fade-in-right">
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <img src={Screen} className="mb-2 w-20 animate-bounce-top" />
                    <img src={Laptop} className="mb-2 w-16 animate-bounce-bottom" />
                  </div>
                  <h1 className="mb-10 font-roboto text-2xl font-bold text-neutral-800">Organize os seus notebooks aqui.</h1>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex gap-3">
                    <div className="flex min-w-8 items-center">
                      <PlusCircle size={25} color="green" weight="fill" className="opacity-60" />
                    </div>
                    <span className="font-roboto text-neutral-800">
                      Adicione as informações do notebook, fotos e organize as suas máquinas.
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex min-w-8 items-center">
                      <PencilSimple size={25} weight="fill" color="blue" className="opacity-60" />
                    </div>
                    <span className="font-roboto text-neutral-800">Mudou de configuração? Edite facilmente, arquive ou exclua.</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex min-w-8 items-center">
                      <FilePdf size={25} weight="fill" color="red" className="opacity-60" />
                    </div>
                    <span className="font-roboto text-neutral-800">Baixe um PDF com todos os detalhes do aparelho.</span>
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
