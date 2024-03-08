import {Notebook} from '../../types/notebook';
import api from '../../libs/axios';
import {MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGetNotes} from '../../libs/swr';

type props = {
  notebook: Notebook;
};

export default function Card(props: props) {
  const url = useNavigate();

  const notebook = props.notebook;

  function deleteNotebook(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    api.delete('/notebook/' + notebook.id);
    url(0);
  }

  const {mutate} = useGetNotes();

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

  if (!props.notebook.isArchived) return;
  else
    return (
      <>
        <div className="flex h-56 w-96 items-center rounded bg-white bg-opacity-90 font-normal shadow">
          <div className="flex grow flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              {/* <FaChevronLeft/> */}
              <img
                src={'https://notebooksbucket.s3.us-east-2.amazonaws.com/' + props.notebook.photos[0].path}
                alt=""
                className="w-32 rounded-sm shadow-md"
                onLoad={() => console.log('carreguei')}
                loading="lazy"
              />
              {/* <FaChevronRight /> */}
            </div>
            <div className="flex justify-center gap-2">
              <button
                className="rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600"
                onClick={desarquivar}
              >
                Desarquivar
              </button>
              <button
                className="rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600"
                onClick={deleteNotebook}
              >
                Deletar
              </button>
            </div>
          </div>

          <div className="mr-5 flex min-w-24 flex-col gap-2">
            <div className="flex flex-col">
              <span className="rounded bg-neutral-200 bg-opacity-60 text-center font-medium shadow-sm">{props.notebook.id}</span>
            </div>

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
        </div>
      </>
    );
}
