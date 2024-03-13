import {Notebook} from '../../types/notebook';
import api from '../../libs/axios';
import {useState} from 'react';
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

  function desarquivar() {
    mutate();
    const note = props.notebook;
    note.isArchived = false;
    note.photos = [''];
    api.put('/notebook', note).then((response) => {
      console.log(response);
    });
    mutate();
  }

  function deletar() {
    mutate();
    const note = props.notebook;
    api.delete('/notebook/' + note.id).then((response) => {
      console.log(response);
    });
    mutate();
  }

  return (
    <>
      {!props.notebook.isArchived ? <Modal showModal={!showModal} setShowModal={setShowModal} notebook={notebook} /> : ''}
      <div className="flex h-60 max-w-[340px] justify-center gap-8 rounded bg-white bg-opacity-90 pb-2 pt-2 font-roboto  font-normal shadow">
        <div className="mb-2 ml-2 mt-2 flex flex-col items-center justify-between">
          <div>
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

          <div className="flex flex-col gap-1">
            {!props.notebook.isArchived ? (
              <button
                className="min-w-20 rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Detalhes
              </button>
            ) : (
              <button
                className="min-w-20 rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600"
                onClick={() => {
                  desarquivar();
                }}
              >
                Desarquivar
              </button>
            )}

            {!props.notebook.isArchived ? (
              <button
                className="min-w-20 rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600"
                onClick={() => {
                  url(`/notebook/${notebook.code}`);
                }}
              >
                Editar
              </button>
            ) : (
              <button
                className="min-w-20 rounded bg-red-600 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-red-500"
                onClick={() => {
                  deletar();
                }}
              >
                Deletar
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="flex h-full w-full flex-col items-center justify-center ">
            <span className="mb-2 mt-2 min-w-20 rounded bg-neutral-200 bg-opacity-60 pl-2 pr-2 text-center font-medium shadow-sm">
              Notebook {props.notebook.code}
            </span>
            <div className="flex h-full items-center justify-center ">
              <img
                src={'https://notebooksbucket.s3.us-east-2.amazonaws.com/' + props.notebook.photos[0]}
                alt=""
                className="h-min w-[132px] rounded-sm shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow flex-col gap-2"></div>
    </>
  );
}
