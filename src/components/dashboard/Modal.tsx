import {Notebook} from '../../types/notebook';
import './Modal.css';
import {AiOutlineClose} from 'react-icons/ai';
import {useEffect, useState, MouseEvent} from 'react';
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';
import api from '../../libs/axios';
import {useGetNotes} from '../../libs/swr';
import Pdfpage from './Pdfpage';
import {PDFDownloadLink} from '@react-pdf/renderer';

type props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  notebook: Notebook;
};

export function Modal({showModal, setShowModal, notebook}: props) {
  const {mutate} = useGetNotes();

  const [arrayURL, setArrayURL] = useState<string[]>([]);
  const [viewIndex, setViewIndex] = useState(0);

  function deleteNotebook(event: MouseEvent<HTMLButtonElement>) {
    mutate();
    event.preventDefault();
    api.delete('/notebook/' + notebook.id);
    setShowModal(!showModal);
    mutate();
  }

  function arquivar() {
    // console.log(props)
    mutate();
    const note = notebook;
    note.isArchived = true;
    note.photos = [''];
    api.put('/notebook', note).then((response) => {
      console.log(response);
    });
    setShowModal(!showModal);
    mutate();
  }

  useEffect(() => {
    const a: string[] = [];
    notebook.photos.map((items: string) => {
      a.push(items.toString());
      setArrayURL(a);
    });
  }, [notebook.photos]);

  function navigateImages(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (event.currentTarget.value == '1') {
      if (viewIndex + 1 > arrayURL.length - 1) setViewIndex(0);
      else setViewIndex(viewIndex + 1);
    } else {
      if (viewIndex - 1 < 0) setViewIndex(arrayURL.length - 1);
      else setViewIndex(viewIndex - 1);
    }
  }

  return (
    <div
      className={`myModal ${!showModal ? 'flex' : 'hidden'} items-center justify-center overflow-scroll bg-neutral-500 bg-opacity-50 p-10 font-roboto backdrop-blur-sm`}
    >
      <div className="flex  min-h-min w-full max-w-[900px] flex-col gap-10 rounded bg-white p-5">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">Notebook {notebook.code}</span>
          <AiOutlineClose
            size={30}
            className="transition hover:cursor-pointer hover:fill-neutral-700"
            onClick={() => {
              setShowModal(false);
            }}
          />
        </div>

        <div className="flex justify-between max-[900px]:flex-col">
          <div className="flex gap-10 max-[550px]:flex-col">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <div className="font-semibold">Marca</div>
                <span>{notebook.brand.name}</span>
              </div>

              <div className="flex flex-col">
                <div className="font-semibold">Modelo</div>
                <span>{notebook.model}</span>
              </div>

              <div className="flex flex-col">
                <div className="font-semibold">Sistema</div>
                <span>
                  {notebook.system.name} {notebook.system_version}
                </span>
              </div>

              <div className="flex flex-col">
                <div className="font-semibold">Processador</div>
                <span>
                  {notebook.processor.brand.name} {notebook.processor.model} {notebook.processor.clock}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <div className="font-semibold">Memória RAM</div>
                <span>{notebook.ram} GB</span>
              </div>

              {notebook.hd ? (
                <div className="flex flex-col">
                  <div className="font-semibold">Armazenamento HD</div>
                  <span>{notebook.hd} GB</span>
                </div>
              ) : (
                ''
              )}

              {notebook.ssd ? (
                <div className="flex flex-col">
                  <div className="font-semibold">Armazenamento SSD</div>
                  <span>{notebook.ssd} GB</span>
                </div>
              ) : (
                ''
              )}

              <div className="flex flex-col">
                <div className="font-semibold">Tela</div>
                <span>
                  {notebook.resolution}
                  {notebook.inch ? `p, ${notebook.inch}"` : ''}, {notebook.hertz}Hz
                </span>
              </div>

              {notebook.graphics_card ? (
                <div className="flex flex-col">
                  <div className="font-semibold">Placa de vídeo</div>
                  <span>
                    {notebook.graphics_card?.brand.name} {notebook.graphics_card?.model}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between">
            <div className="flex  items-center">
              <button type="button" value={0} className="h-min" onClick={navigateImages}>
                <BiChevronLeft size={30} className="transition hover:fill-sky-500" />
              </button>

              <img
                src={'https://notebooksbucket.s3.us-east-2.amazonaws.com/' + arrayURL[viewIndex]}
                className=" h-80 rounded border shadow-md"
                alt="a"
              />

              <button type="button" value={1} className="h-min" onClick={navigateImages}>
                <BiChevronRight size={30} className="transition hover:fill-sky-500" />
              </button>
            </div>

            <div className="flex gap-5">
              <PDFDownloadLink document={<Pdfpage notebook={notebook} />} fileName={`Notebook ${notebook.code}`}>
                {({loading}) =>
                  loading ? (
                    'isloading'
                  ) : (
                    <button className="rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600">
                      Gerar PDF
                    </button>
                  )
                }
              </PDFDownloadLink>

              <button
                className="rounded bg-slate-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-slate-600"
                onClick={arquivar}
              >
                Arquivar
              </button>

              <button
                className="rounded bg-red-700 pb-px pl-2 pr-2 pt-px text-slate-100 transition hover:bg-red-600"
                onClick={deleteNotebook}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
