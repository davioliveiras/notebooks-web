import {FiPlus} from 'react-icons/fi';
import api from '../libs/axios';
import {ChangeEvent, FormEvent, MouseEvent, useRef, useState} from 'react';
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';
import {Spinner} from '@phosphor-icons/react';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Notebook} from '../types/notebook';
import './new.css';

export default function New() {
  const [imagesURLs, setImagesURLs] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [filesToUpload, setFilesToUpload] = useState<FormData>();
  const [isPhotosUploaded, setIsPhotosUploaded] = useState(true);
  const [isStorageDefined, setIsStorageDefined] = useState<number[]>([NaN, NaN]);
  const [storageAlert, setStorageAlert] = useState(false);
  const [isGraphicsDefined, setIsGraphicsDefined] = useState<string[]>(['', '']);
  const [graphicsAlert, setGraphicsAlert] = useState('');
  const [statusUpload, setStatusUpload] = useState('Salvar');

  const url = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Notebook>();

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

  function extraValidation() {
    if (Number.isNaN(isStorageDefined[0]) && Number.isNaN(isStorageDefined[1])) {
      setStorageAlert(true);
    } else {
      setStorageAlert(false);
    }

    if (isGraphicsDefined[0] != '') {
      if (isGraphicsDefined[1] == '') {
        setGraphicsAlert('modelo');
      } else setGraphicsAlert('');
    }

    if (isGraphicsDefined[1] != '') {
      if (isGraphicsDefined[0] == '') {
        setGraphicsAlert('marca');
      } else setGraphicsAlert('');
    }

    if (isGraphicsDefined[0] == '' && isGraphicsDefined[1] == '') setGraphicsAlert('');
    console.log(isGraphicsDefined);
  }

  /**** SUBMIT ****/

  const onSubmit: SubmitHandler<Notebook> = async (data) => {
    if (imagesURLs.length == 0) {
      setIsPhotosUploaded(false);
      return;
    }

    if (!isStorageDefined) return;

    if (graphicsAlert != '') return;

    setStatusUpload('Salvando');

    data.isArchived = false;
    console.log(data);

    if (isGraphicsDefined[0] != '') {
      data.graphics_card = {
        brand: {
          name: isGraphicsDefined[0],
        },
        model: isGraphicsDefined[1],
      };
    } else {
      data.graphics_card = null;
    }

    const headers = {headers: {'Content-Type': 'multipart/form-data'}};

    await api
      .post('upload-images', filesToUpload, headers)
      .then((response) => {
        console.log(response.data);
        data.photos = response.data;
      })
      .catch((erro) => {
        console.log(erro);
      });

    await api
      .post('/notebook', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((erro) => {
        console.log(erro);
      });

    url('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex grow justify-center font-roboto ">
      <div className="mt-10 flex h-min gap-36 rounded pl-5 pr-5 max-[1300px]:flex-col max-[1300px]:gap-5">
        <div className="max-[1300px]:flex max-[1300px]:justify-center">
          <div className="flex flex-col pt-5">
            <div className="mb-2 flex flex-col gap-1">
              <span className="mb-3 text-xl font-bold">Detalhes gerais</span>
            </div>

            <label htmlFor="code" className={`${errors.code && 'text-red-500'}`}>
              Código
            </label>
            <input
              type="number"
              id="code"
              placeholder="123"
              className="bg mb-5 w-[200px] border border-transparent border-b-gray-400 bg-transparent pb-1 outline-none transition focus:border-b-sky-500"
              {...register('code', {required: true, valueAsNumber: true})}
            />

            <label htmlFor="marcaNotebook" className={`${errors.brand?.name && 'text-red-500'}`}>
              Marca*
            </label>
            <input
              type="text"
              id="marcaNotebook"
              placeholder="Acer"
              className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
              {...register('brand.name', {required: true})}
            />

            <label htmlFor="modeloNotebook" className={`${errors.model && 'text-red-500'}`}>
              Modelo*
            </label>
            <input
              type="text"
              id="modeloNotebook"
              placeholder="Aspire 3"
              className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
              {...register('model', {required: true})}
            />

            <label htmlFor="sistema" className={`${errors.system?.name && 'text-red-500'}`}>
              Sistema*
            </label>
            <input
              type="text"
              id="sistema"
              placeholder="Linux"
              className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
              {...register('system.name', {required: true})}
            />

            <label htmlFor="versaoSistema" className={`${errors.system_version && 'text-red-500'}`}>
              Versão do sistema*
            </label>
            <input
              type="text"
              id="versaoSistema"
              placeholder="Ubuntu 23.04"
              className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
              {...register('system_version', {required: true})}
            />

            <label htmlFor="marcaProcessador" className={`${errors.processor?.brand?.name && 'text-red-500'}`}>
              Marca do processador*
            </label>
            <input
              type="text"
              id="marcaProcessador"
              placeholder="Intel"
              className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
              {...register('processor.brand.name', {required: true})}
            />

            <label htmlFor="modeloProcessador" className={`${errors.processor?.model && 'text-red-500'}`}>
              Modelo do processador*
            </label>
            <input
              type="text"
              id="modeloProcessador"
              placeholder="i3-8130U"
              className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
              {...register('processor.model', {required: true})}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col justify-between pt-5 max-[500px]:gap-10">
            <div className="flex flex-col">
              <div className="mb-2 flex flex-col gap-1">
                <span className="mb-3 font-roboto text-xl font-bold">Armazenamento e memória</span>
              </div>
              <div className="flex max-[500px]:flex-col max-[500px]:items-center">
                <div className="flex flex-col min-[500px]:w-48">
                  <label htmlFor="clock" className={`${errors.processor?.clock && 'text-red-500'}`}>
                    Clock*
                  </label>
                  <div>
                    <input
                      type="number"
                      id="clock"
                      placeholder="2.2"
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                      {...register('processor.clock', {required: true, valueAsNumber: true})}
                    />
                    <span className="ml-px">GHz</span>
                  </div>

                  <label htmlFor="ram" className={`${errors.ram && 'text-red-500'}`}>
                    RAM*
                  </label>
                  <div>
                    <input
                      type="number"
                      id="ram"
                      placeholder="16"
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                      {...register('ram', {required: true, valueAsNumber: true})}
                    />
                    <span className="ml-px">GB</span>
                  </div>

                  <label htmlFor="ddr">DDR</label>
                  <select
                    id="ddr"
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 bg-transparent pb-1 outline-none transition focus:border-b-sky-500"
                    {...register('ddr', {valueAsNumber: true})}
                    defaultValue={4}
                  >
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>

                <div className="flex  flex-col">
                  <label htmlFor="hd">HD</label>
                  <div>
                    <input
                      type="number"
                      id="hd"
                      placeholder="1000"
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                      {...register('hd', {valueAsNumber: true})}
                      onChange={(event) => setIsStorageDefined([parseInt(event.target.value), isStorageDefined[1]])}
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
                      {...register('ssd', {valueAsNumber: true})}
                      onChange={(event) => setIsStorageDefined([isStorageDefined[0], parseInt(event.target.value)])}
                    />
                    <span className="ml-px">GB</span>
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`${storageAlert ? 'text-red-500' : ''} w-40 text-justify text-sm italic text-neutral-500 max-[500px]:w-36`}
                    >
                      Inserir espaço de HD ou SDD (ou os dois juntos).
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="mb-4 text-lg font-bold">Tela e resolução</span>
                <div className="flex max-[500px]:flex-col">
                  <div className="flex w-48 flex-col">
                    <label htmlFor="resolucao" className={`${errors.resolution && 'text-red-500'}`}>
                      Resolução*
                    </label>
                    <input
                      type="text"
                      id="resolucao"
                      placeholder="1080x720"
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                      {...register('resolution', {required: true})}
                    />

                    <label htmlFor="polegadas">Polegadas</label>
                    <input
                      type="number"
                      id="polegadas"
                      placeholder="14"
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                      {...register('inch', {valueAsNumber: true})}
                    />

                    <label htmlFor="frequenciaTela" className={`${errors.hertz && 'text-red-500'}`}>
                      Frequência*
                    </label>
                    <div>
                      <input
                        type="number"
                        id="frequenciaTela"
                        placeholder="120"
                        className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                        {...register('hertz', {required: true, valueAsNumber: true})}
                      />
                      <span className="ml-px">Hz</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="marcaPlaca" className={`${graphicsAlert == 'marca' ? 'text-red-500' : ''}`}>
                      Marca da placa
                    </label>
                    <input
                      type="text"
                      id="marcaPlaca"
                      placeholder="NVIDIA"
                      onChange={(event) => setIsGraphicsDefined([event.target.value, isGraphicsDefined[1]])}
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    />

                    <label htmlFor="moldePlaca" className={`${graphicsAlert == 'modelo' ? 'text-red-500' : ''}`}>
                      Modelo da placa
                    </label>
                    <input
                      type="text"
                      id="marcaPlaca"
                      placeholder="RTX 2000"
                      onChange={(event) => setIsGraphicsDefined([isGraphicsDefined[0], event.target.value])}
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    />

                    <div className="flex gap-2">
                      <input type="checkbox" id="touch" {...register('touch')} />
                      <label htmlFor="touch">Tela touch</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col items-center justify-between gap-5 pt-5">
          <span className="text-xl font-bold">Imagens</span>
          <input type="file" accept="image/png, image/jpeg" multiple={true} id="imagens" className="hidden" onChange={getImages} />

          {imagesURLs.length == 0 ? (
            <>
              <label htmlFor="imagens">
                <div className="flex items-center gap-5">
                  <button>
                    <BiChevronLeft size={30} className="h-min cursor-not-allowed fill-neutral-500" />
                  </button>
                  <div
                    className={`${isPhotosUploaded ? '' : 'border-red-600'} flex h-60 w-[180px] cursor-pointer items-center justify-center rounded border-[2px] border-dashed`}
                  >
                    <FiPlus color={`${isPhotosUploaded ? '' : 'red'}`} />
                  </div>
                  <button>
                    <BiChevronRight size={30} className={'} h-min cursor-not-allowed fill-neutral-500'} />
                  </button>
                </div>
              </label>
            </>
          ) : (
            <div className="flex h-60 items-center gap-5">
              <button type="button" value={0} className="h-min" onClick={navigateImages}>
                <BiChevronLeft size={30} className=" transition hover:fill-sky-500" />
              </button>
              <label htmlFor="imagens">
                <div className="flex items-center">
                  <img src={imagesURLs[previewIndex]} className="w-[180px] cursor-pointer rounded shadow" alt="" />
                </div>
              </label>

              <button type="button" value={1} className="h-min" onClick={navigateImages}>
                <BiChevronRight size={30} className="transition hover:fill-sky-500" />
              </button>
            </div>
          )}

          <textarea
            className="h-40 w-full resize-none rounded border border-neutral-300 p-2 outline-none transition focus:border-sky-500"
            id="notas"
            placeholder="Você pode escrever observações aqui..."
            {...register('note')}
          />

          <button
            type="submit"
            className={`h-min w-60 rounded bg-green-800 p-2 text-white ${statusUpload == 'Salvando' ? 'cursor-not-allowed pr-4 opacity-80' : ''}`}
            onClick={() => extraValidation()}
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
