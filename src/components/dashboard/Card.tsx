import {Notebook} from '../../types/notebook';
import api from '../../libs/axios';
import {MouseEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGetNotes} from '../../libs/swr';
import {Modal} from './Modal';

type props = {
  notebook: Notebook;
};

export default function Card(props: props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const url = useNavigate();
  const {mutate} = useGetNotes();

  const notebook = props.notebook;

  if (props.notebook.isArchived) return;
  else
    return (
      <>
        <Modal showModal={!showModal} setShowModal={setShowModal} notebook={notebook} />
        <div className="flex h-60 max-w-[340px] justify-between rounded bg-white bg-opacity-90 p-3 font-normal shadow">
          <div className="ml-4 mr-2 flex flex-col gap-1">
            <span className="mb-4 min-w-20 rounded bg-neutral-200 bg-opacity-60 text-center font-medium shadow-sm">
              {props.notebook.code}
            </span>
            <div className="flex flex-col">
              <span className="font-semibold">Marca</span>
              <span>{props.notebook.brand.name}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Modelo</span>
              <span>{props.notebook.model}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Sistema</span>
              <span>{props.notebook.system.name}</span>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-1">
            <div className="flex h-[180px] justify-center">
              <img
                src={'https://notebooksbucket.s3.us-east-2.amazonaws.com/' + props.notebook.photos[0].path}
                alt=""
                className="h-[175px]  rounded-sm shadow-md"
                // onLoad={() => console.log('hm')}
                // loading="lazy"
              />
            </div>
            <div className="flex gap-1">
              <button
                className="min-w-20 rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Detalhes
              </button>

              <button
                className="min-w-20 rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600"
                onClick={() => {
                  url(`/notebook/${notebook.code}`);
                }}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
        <div className="flex grow flex-col gap-2"></div>
      </>
    );
}
