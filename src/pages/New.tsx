import {FiPlus} from 'react-icons/fi';
import api from '../libs/axios';
import {ChangeEvent, FormEvent, MouseEvent, useRef, useState} from 'react';
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';
import {Spinner} from '@phosphor-icons/react';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Notebook} from '../types/notebook';

export default function New() {
  const [imagesURLs, setImagesURLs] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [filesToUpload, setFilesToUpload] = useState<FormData>();
  const [statusUpload, setStatusUpload] = useState('Salvar');
  const url = useNavigate();

  type Inputs = {example: string; exampleRequired: string};

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Notebook>();

  const code = useRef<HTMLInputElement>(null);
  const marcaNotebook = useRef<HTMLInputElement>(null);
  const modeloNotebook = useRef<HTMLInputElement>(null);
  const sistema = useRef<HTMLInputElement>(null);
  const versaoSistema = useRef<HTMLInputElement>(null);
  const marcaProcessador = useRef<HTMLInputElement>(null);
  const modeloProcessador = useRef<HTMLInputElement>(null);
  const clock = useRef<HTMLInputElement>(null);
  const ram = useRef<HTMLInputElement>(null);
  const ddr = useRef<HTMLInputElement>(null);
  const hd = useRef<HTMLInputElement>(null);
  const ssd = useRef<HTMLInputElement>(null);
  const resolucao = useRef<HTMLInputElement>(null);
  const polegadas = useRef<HTMLInputElement>(null);
  const frequenciaTela = useRef<HTMLInputElement>(null);
  const touch = useRef<HTMLInputElement>(null);
  const notas = useRef<HTMLTextAreaElement>(null);
  const marcaPlaca = useRef<HTMLInputElement>(null);
  const modeloPlaca = useRef<HTMLInputElement>(null);

  function getImages(event: ChangeEvent<HTMLInputElement>) {
    const {files} = event.target;
    const photos: string[] = [];
    const filesData = new FormData();

    if (files) {
      Array.from(files).forEach((item) => {
        photos.push(URL.createObjectURL(item));
        filesData.append('photo', item);
        setFilesToUpload(filesData);
      });
      setImagesURLs(photos);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusUpload('Salvando');

    const notebook = {
      code: code.current?.value ? parseInt(code.current.value) : null,
      ram: ram.current?.value ? parseInt(ram.current?.value) : null,
      ddr: ddr.current?.value ? parseInt(ddr.current?.value) : null,
      hd: hd.current?.value ? parseInt(hd.current?.value) : null,
      ssd: ssd.current?.value ? parseInt(ssd.current?.value) : null,
      model: modeloNotebook.current?.value,
      note: notas.current?.value,
      resolution: resolucao.current?.value,
      inch: polegadas.current?.value ? parseInt(polegadas.current?.value) : null,
      hertz: frequenciaTela.current?.value ? parseInt(frequenciaTela.current?.value) : null,
      touch: touch.current?.checked,
      system_version: versaoSistema.current?.value,
      isArchived: false,

      processor: {
        model: modeloProcessador.current?.value,
        clock: clock.current?.value ? parseInt(clock.current?.value) : null,
        brand: {name: marcaProcessador.current?.value},
      },

      system: {name: sistema.current?.value},

      brand: {name: marcaNotebook.current?.value},

      graphics_card: {
        model: modeloPlaca.current?.value,
        brand: {
          name: marcaPlaca.current?.value,
        },
      },

      photos: [],
    };

    const headers = {headers: {'Content-Type': 'multipart/form-data'}};

    await api
      .post('upload-images', filesToUpload, headers)
      .then((response) => {
        console.log(response.data);
        notebook.photos = response.data;
      })
      .catch((erro) => {
        console.log(erro);
      });

    await api
      .post('/notebook', notebook)
      .then((response) => {
        console.log(response.data);
      })
      .catch((erro) => {
        console.log(erro);
      });

    url('/dashboard');
  }

  function navigateImages(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (event.currentTarget.value == '1') {
      if (previewIndex + 1 > imagesURLs.length - 1) setPreviewIndex(0);
      else setPreviewIndex(previewIndex + 1);
    } else {
      if (previewIndex - 1 < 0) setPreviewIndex(imagesURLs.length - 1);
      else setPreviewIndex(previewIndex - 1);
    }
  }

  const testehook: SubmitHandler<Notebook> = (data) => {
    // console.log(data.exampleRequired)
    console.log(data.model);
  };

  return (
    <form onSubmit={submit} className="flex justify-center">
      <div className="flex gap-36 rounded bg-white pl-5 pr-5 shadow max-[1150px]:flex-col max-[1150px]:gap-5">
        <div className="flex flex-col pt-5">
          <div className="mb-2 flex flex-col gap-1">
            <span className="text-lg font-semibold italic">Detalhes gerais</span>
            <div className="mb-5 h-px w-36 bg-neutral-200" />
          </div>

          <label htmlFor="code">Código*</label>
          <input
            type="text"
            id="code"
            placeholder="123"
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            ref={code}
          />

          <label htmlFor="marcaNotebook" className={`${errors.model && 'text-red-500'}`}>
            Marca*{' '}
          </label>
          <input
            type="text"
            id="marcaNotebook"
            placeholder="Acer"
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            ref={marcaNotebook}
          />

          <label htmlFor="modeloNotebook">Modelo*</label>
          <input
            type="text"
            id="modeloNotebook"
            placeholder="Aspire 3"
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            ref={modeloNotebook}
          />

          <label htmlFor="sistema">Sistema*</label>
          <input
            type="text"
            id="sistema"
            placeholder="Linux"
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            ref={sistema}
          />

          <label htmlFor="versaoSistema">Versão do sistema*</label>
          <input
            type="text"
            id="versaoSistema"
            placeholder="Ubuntu 23.04"
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            ref={versaoSistema}
          />

          <label htmlFor="marcaProcessador">Marca do processador*</label>
          <input
            type="text"
            id="marcaProcessador"
            placeholder="Intel"
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            ref={marcaProcessador}
          />

          <label htmlFor="modeloProcessador">Modelo do processador*</label>
          <input
            type="text"
            id="modeloProcessador"
            placeholder="i3-8130U"
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            ref={modeloProcessador}
          />
        </div>

        <div className="flex flex-col justify-between pt-5">
          <div className="flex flex-col">
            <div className="mb-2 flex flex-col gap-1">
              <span className="text-lg font-semibold italic">Armazenamento e memória</span>
              <div className="mb-5 h-px w-60 bg-neutral-200" />
            </div>
            <div className="flex">
              <div className="flex w-48 flex-col">
                <label htmlFor="clock">Clock*</label>
                <div>
                  <input
                    type="number"
                    id="clock"
                    placeholder="2.2"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    ref={clock}
                  />
                  <span className="ml-px">GHz</span>
                </div>

                <label htmlFor="ram">RAM*</label>
                <div>
                  <input
                    type="number"
                    id="ram"
                    placeholder="16"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    ref={ram}
                  />
                  <span className="ml-px">GB</span>
                </div>

                <label htmlFor="ddr">DDR*</label>

                <input
                  type="number"
                  id="ddr"
                  placeholder="4"
                  className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                  ref={ddr}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="hd">HD</label>
                <div>
                  <input
                    type="number"
                    id="hd"
                    placeholder="1000"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    ref={hd}
                  />
                  <span className="ml-px">GB</span>
                </div>

                <label htmlFor="ssd">SSD</label>
                <div>
                  <input
                    type="number"
                    id="ssd"
                    placeholder="256"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    ref={ssd}
                  />
                  <span className="ml-px">GB</span>
                </div>

                <div className="flex flex-col">
                  <span className="w-40 text-justify text-sm italic text-neutral-500">
                    Inserir espaço de HD ou SDD (ou os dois juntos).
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="mb-2 flex flex-col gap-1">
                <span className="text-lg font-semibold italic">Tela e resolução</span>
                <div className="mb-5 h-px w-36 bg-neutral-200" />
              </div>
              <div className="flex">
                <div className="flex w-48 flex-col">
                  <label htmlFor="resolucao">Resolução</label>
                  <input
                    type="text"
                    id="resolucao"
                    placeholder="1080x720"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    ref={resolucao}
                  />

                  <label htmlFor="polegadas">Polegadas</label>
                  <input
                    type="number"
                    id="polegadas"
                    placeholder="14"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    ref={polegadas}
                  />

                  <label htmlFor="frequenciaTela">Frequência</label>
                  <div>
                    <input
                      type="number"
                      id="frequenciaTela"
                      placeholder="120"
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                      ref={frequenciaTela}
                    />
                    <span className="ml-px">Hz</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="marcaPlaca">Marca da placa</label>
                  <input
                    type="text"
                    id="marcaPlaca"
                    placeholder="NVIDIA"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    ref={marcaPlaca}
                  />

                  <label htmlFor="moldePlaca">Modelo da placa</label>
                  <input
                    type="text"
                    id="marcaPlaca"
                    placeholder="RTX 2000"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    ref={modeloPlaca}
                  />

                  <div className="flex gap-2">
                    <input type="checkbox" id="touch" ref={touch} />
                    <label htmlFor="touch">Tela touch</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 pt-5">
          <div className="mb-2 flex flex-col items-center gap-1">
            <span className="text-lg font-semibold italic">Imagens</span>
            <div className="mb-5 h-px w-24 bg-neutral-200" />
          </div>
          {imagesURLs.length == 0 ? (
            <>
              <input type="file" accept="image/png, image/jpeg" multiple={true} id="imagens" className="hidden" onChange={getImages} />
              <label htmlFor="imagens">
                <div className="flex items-center">
                  <button>
                    <BiChevronLeft size={30} className="h-min cursor-not-allowed fill-neutral-500" />
                  </button>
                  <div className="flex h-60 w-[180px] cursor-pointer items-center justify-center rounded border-[2px] border-dashed">
                    <FiPlus />
                  </div>
                  <button>
                    <BiChevronRight size={30} className="h-min cursor-not-allowed fill-neutral-500" />
                  </button>
                </div>
              </label>
            </>
          ) : (
            <div className="flex h-60 items-center">
              <button type="button" value={0} className="h-min" onClick={navigateImages}>
                <BiChevronLeft size={30} className="transition hover:fill-sky-500" />
              </button>
              <div className="flex items-center">
                <img src={imagesURLs[previewIndex]} className="w-[180px] rounded shadow" alt="" />
              </div>
              <button type="button" value={1} className="h-min" onClick={navigateImages}>
                <BiChevronRight size={30} className="transition hover:fill-sky-500" />
              </button>
            </div>
          )}

          <textarea
            className="h-40 w-60 resize-none rounded border p-2 outline-none transition focus:border-sky-500"
            id="notas"
            placeholder="Você pode escrever observações aqui..."
            ref={notas}
          />

          <button
            type="submit"
            className={`h-min w-60 rounded bg-green-800 p-2 text-white 
              ${statusUpload == 'Salvando' ? 'cursor-not-allowed pr-4 opacity-80' : ''}`}
          >
            <div className="flex w-full items-center justify-center gap-2">
              <Spinner size={23} className={`animate-spin ${statusUpload == 'Salvando' ? 'visible' : 'hidden'}`} />
              {statusUpload}
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
