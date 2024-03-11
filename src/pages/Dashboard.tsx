import Laptop from '../assets/laptop.png';
import Card from '../components/dashboard/Card';
import {Notebook} from '../types/notebook';
import {FiPlus} from 'react-icons/fi';
import {NavLink} from 'react-router-dom';
import {useGetNotes} from '../libs/swr';
import {useState} from 'react';
import {Modal} from '../components/dashboard/Modal';

export default function Dashboard() {
  const {data, error, isLoading} = useGetNotes();

  if (error) {
    return <div>ocorreu um erro</div>;
  }

  if (isLoading) {
    return <div>carregando</div>;
  }

  let allArchived = true;

  if (data != 'No notebooks')
    data.map((items: Notebook) => {
      if (!items.isArchived) allArchived = false;
    });

  if (data == 'No notebooks' || allArchived) {
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
  } else {
    return (
      <div className="flex w-full justify-center">
        <div className="flex">
          <div className="min flex min-h-min flex-wrap gap-10 max-[800px]:flex-col max-[800px]:flex-nowrap">
            {data.map((items: Notebook) => (
              <div key={items.code}>
                <Card notebook={items} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
