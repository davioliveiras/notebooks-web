import {NavLink, useNavigate} from 'react-router-dom';
import Hero from './Hero';
import cookies from '../../libs/cookies';
import {RiArchiveLine, RiHome6Line, RiMenuLine} from 'react-icons/ri';
import {FiPlus} from 'react-icons/fi';
import {GoGear} from 'react-icons/go';

export default function Header() {
  const url = useNavigate();

  function Exit() {
    cookies.remove('token');
    url('/login');
  }

  return (
    <>
      <div className="mb-1 flex justify-center border-b-[1px] border-neutral-200 bg-neutral-50 bg-opacity-50 ">
        <div className="flex w-full max-w-[1366px] items-center p-3">
          <div className="ml-2 hidden h-min grow gap-4 text-sm font-medium min-[800px]:flex">
            <NavLink to="/dashboard" className="flex items-center gap-1 rounded-md pb-px pl-2 pr-2 pt-px transition">
              <RiHome6Line size={18} />
              Dashboard
            </NavLink>

            <div className="min-h-max w-px bg-neutral-300" />

            <NavLink to="/criar" className="flex items-center gap-1 rounded-md pb-px pl-2 pr-2 pt-px transition">
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
            <RiMenuLine size={18} />
          </div>

          {/* filter search */}

          <div className="flex justify-center">
            <GoGear size={18} className="mr-4 mt-px" />
            <div className="mr-4 min-h-max w-px bg-neutral-300" />
          </div>
          <Hero />

          <button onClick={Exit}>s</button>
        </div>
      </div>
    </>
  );
}
