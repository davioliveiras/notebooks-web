import { NavLink, useNavigate } from "react-router-dom";
import Hero from "./Hero";
import cookies from "../../libs/cookies";
import { RiArchiveLine, RiHome6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";

export default function Header(){

  const url = useNavigate()

  function Exit(){
    cookies.remove('token')
    url('/login')
  }
  
  return(
    <>
      <div className="flex items-center bg-neutral-50 bg-opacity-50 p-3 mb-1 border-b-[1px] border-neutral-200">
        <div className="flex grow gap-4 ml-2 font-medium text-sm">

          <NavLink to='/' className="flex items-center gap-1 pl-2 pr-2 pt-px pb-px rounded-md transition">
            <RiHome6Line size={18}/>            
            Dashboard
          </NavLink>  

          <NavLink to='/novo' className="flex items-center gap-1 pl-2 pr-2 pt-px pb-px rounded-md transition">
            <FiPlus size={18}/>            
            Criar
          </NavLink>

          <NavLink to='/Arquivos' className="flex items-center gap-1 pl-2 pr-2 pt-px pb-px rounded-md transition">
            <RiArchiveLine size={18}/>            
            Arquivados
          </NavLink>    

        </div>

        {/* <Archive size={20} weight="light"/> */}
        {/* <Trash size={20} weight="light"/> */}
        {/* <HiOutlineArchiveBox size={20}/>
        <SlTrash  size={18} className="opacity-80"/> */}

        <Hero/>
        <button onClick={Exit}>
          {/* <SignOut size={20} weight="bold" className="mr-6"/> */}
          {/* <LuLogOut size={20}/> */}
        </button>
      </div>
    </>
  )
}