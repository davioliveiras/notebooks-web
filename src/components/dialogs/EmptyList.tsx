import {NavLink} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import Laptop from '../../assets/laptop.png';

export default function EmptyList() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="mb-10 flex gap-2">
        <img src={Laptop} alt="" className="w-20 opacity-50 grayscale" />
        <img src={Laptop} alt="" className="w-20 opacity-30 grayscale" />
        <img src={Laptop} alt="" className="w-20 opacity-20 grayscale" />
        <img src={Laptop} alt="" className="hidden w-20 opacity-20 grayscale min-[600px]:flex" />
        <img src={Laptop} alt="" className="hidden w-20 opacity-10 grayscale min-[600px]:flex" />
      </div>
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="font-roboto text-4xl font-medium text-neutral-400">A lista está vazia!</span>
        <span className=" flex text-justify font-roboto text-base text-neutral-400">
          Quando você cadastrar novos aparelhos eles aparecerão aqui.
        </span>
        <NavLink
          to={'/criar'}
          className="mt-5 flex h-8 items-center gap-2 rounded bg-green-900 bg-opacity-80 pb-1 pl-4 pr-4 pt-1 font-roboto text-lg font-medium text-white transition hover:bg-opacity-90"
        >
          <FiPlus size={20} color="white" />
          <span className="text-neutral-100">Criar</span>
        </NavLink>
      </div>
    </div>
  );
}
