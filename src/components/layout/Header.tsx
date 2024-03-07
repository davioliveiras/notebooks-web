import {NavLink, useNavigate} from 'react-router-dom';
import Hero from './Hero';
import cookies from '../../libs/cookies';
import {RiArchiveLine, RiHome6Line, RiMenuLine} from 'react-icons/ri';
import {GoGear, GoSignOut} from 'react-icons/go';
import {FiPlus} from 'react-icons/fi';
import {useState} from 'react';

const eu = document.getElementById('eu');
function focar() {
  console.log(eu);
}

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const url = useNavigate();

  function Exit() {
    cookies.remove('token');
    url('/login');
  }

  return (
    <>
      <div className="fixed mb-1 w-full justify-center border-b-[1px] border-neutral-200 bg-neutral-50 bg-opacity-50 backdrop-blur-3xl">
        <div className="flex w-full max-w-[1366px] items-center p-3">
          <div className="ml-2 hidden h-min grow gap-4 text-sm font-medium min-[800px]:flex">
            <NavLink to="/dashboard" className="flex items-center gap-1 rounded-md pb-px pl-2 pr-2 pt-px transition">
              <RiHome6Line size={18} />
              Dashboard
            </NavLink>

            <div className="min-h-max w-px bg-neutral-300" />

            <NavLink to="/criar" className="bgs flex items-center gap-1 rounded-md pb-px pl-2 pr-2 pt-px transition">
              <FiPlus size={18} />
              Criar
            </NavLink>

            <div className="min-h-max w-px bg-neutral-300" />

            <NavLink to="/arquivos" className="flex items-center gap-1 rounded-md pb-px pl-2 pr-2 pt-px transition">
              <RiArchiveLine size={18} />
              Arquivados
            </NavLink>
          </div>

          <div className="flex grow min-[800px]:invisible">
            <RiMenuLine
              size={20}
              className={`${showMenu ? 'fill-neutral-400' : ''} transition`}
              onClick={() => {
                setShowMenu(!showMenu);
                focar();
              }}
            />
            <div
              id="eu"
              onFocus={() => console.log('olha pra mim')}
              className={`fixed left-1 top-[64px] rounded bg-neutral-200 p-4 font-semibold text-neutral-700 ${!showMenu ? 'invisible' : 'flex'}`}
            >
              <div className="flex w-28 flex-col gap-2">
                <span
                  onClick={() => {
                    url('/dashboard');
                    setShowMenu(false);
                  }}
                >
                  Dashboard
                </span>
                <div className="h-px w-full bg-neutral-400" />
                <span
                  onClick={() => {
                    url('/criar');
                    setShowMenu(false);
                  }}
                >
                  Criar
                </span>
                <div className="h-px w-full bg-neutral-400" />
                <span
                  onClick={() => {
                    url('/arquivos');
                    setShowMenu(false);
                  }}
                >
                  Arquivos
                </span>
              </div>
            </div>
          </div>

          {/* filter search */}

          <div className="flex justify-center">
            <GoGear size={20} className="mr-4 mt-px" />
            <div className="mr-4 min-h-max w-px bg-neutral-300" />
          </div>
          <Hero />
          <GoSignOut size={20} onClick={Exit} className="hover:cursor-pointer" />
        </div>
      </div>
    </>
  );
}
