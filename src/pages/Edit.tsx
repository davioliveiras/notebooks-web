import {FiPlus} from 'react-icons/fi';
import api from '../libs/axios';
import {ChangeEvent, FormEvent, MouseEvent, useEffect, useState} from 'react';
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';
import {Spinner} from '@phosphor-icons/react';
import {useNavigate, useParams} from 'react-router-dom';
import {Notebook} from '../types/notebook';

export default function Edit() {
  const [imagesURLs, setImagesURLs] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [filesToUpload, setFilesToUpload] = useState<FormData>();
  const [statusUpload, setStatusUpload] = useState('Editar');

  const [id, setId] = useState<number>(0);
  const [code, setCode] = useState<number>(0);
  const [marcaNotebook, setMarcaNotebook] = useState<string>('');
  const [modeloNotebook, setModeloNotebook] = useState<string>('');
  const [sistema, setSistema] = useState<string>('');
  const [versaoSistema, setVersaoSistema] = useState<string>('');
  const [marcaProcessador, setMarcaProcessador] = useState<string>('');
  const [modeloProcessador, setModeloProcessador] = useState<string>('');
  const [clock, setClock] = useState<number>(0);
  const [ram, setRam] = useState<number>(0);
  const [ddr, setDdr] = useState<number>(0);
  const [hd, setHd] = useState<number>(0);
  const [ssd, setSsd] = useState<number>(0);
  const [resolucao, setResolucao] = useState<string>('');
  const [polegadas, setPolegadas] = useState<number>(0);
  const [frequenciaTela, setFrequenciaTela] = useState<number>(0);
  const [touch, setTouch] = useState<boolean>(false);
  const [notas, setNotas] = useState<string>('');
  const [marcaPlaca, setMarcaPlaca] = useState<string>('');
  const [modeloPlaca, setModeloPlaca] = useState<string>('');

  const url = useNavigate();
  const {noteCode} = useParams();

  useEffect(() => {
    api.get('/notebook/' + noteCode).then((response) => {
      const b: Notebook = response.data;
      setId(b.id);
      setCode(b.code);
      setMarcaNotebook(b.brand.name);
      setModeloNotebook(b.model);
      setSistema(b.system.name);
      setVersaoSistema(b.system_version);
      setMarcaProcessador(b.processor.brand.name);
      setModeloProcessador(b.processor.model);
      setClock(b.processor.clock);
      setRam(b.ram);
      setDdr(b.ddr);
      setHd(b.hd);
      setSsd(b.ssd);
      setResolucao(b.resolution);
      setPolegadas(b.inch);
      setFrequenciaTela(b.hertz);
      setTouch(b.touch);
      setNotas(b.note);
      setMarcaPlaca(b.graphics_card.brand.name);
      setModeloPlaca(b.graphics_card.model);
      const a: string[] = [];

      b.photos.forEach((item) => {
        item.path = 'https://notebooksbucket.s3.us-east-2.amazonaws.com/' + item.path;
        a.push(item.path);
      });

      setImagesURLs(a);
    });
  }, [noteCode]);

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
    setStatusUpload('Editando');

    const notebook = {
      id: id,
      code: code,
      ram: ram,
      ddr: ddr,
      hd: hd,
      ssd: ssd,
      model: modeloNotebook,
      note: notas,
      resolution: resolucao,
      inch: polegadas,
      hertz: frequenciaTela,
      touch: touch,
      system_version: versaoSistema,
      isArchived: false,

      processor: {
        model: modeloProcessador,
        clock: clock,
        brand: {
          name: marcaProcessador,
        },
      },

      system: {
        name: sistema,
      },

      brand: {
        name: marcaNotebook,
      },

      graphics_card: {
        model: modeloPlaca,
        brand: {
          name: marcaPlaca,
        },
      },

      photos: [''],
    };

    console.log(notebook);

    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (!imagesURLs[0].includes('amazonaws')) {
      await api
        .post('upload-images', filesToUpload, headers)
        .then((response) => {
          console.log(response.data);
          notebook.photos = response.data;
        })
        .catch((erro) => {
          console.log(erro);
        });
    }

    await api
      .put('/notebook', notebook)
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

  return (
    <form onSubmit={submit} className="flex justify-center">
      <div className="flex gap-36 rounded bg-white pl-5 pr-5 shadow">
        <div className="flex flex-col pt-5">
          <div className="mb-2 flex flex-col gap-1">
            <span className="text-lg font-semibold italic">Detalhes gerais</span>
            <div className="mb-5 h-px w-36 bg-neutral-200" />
          </div>

          <label htmlFor="code">Código*</label>
          <input
            type="number"
            id="code"
            placeholder="123"
            disabled={true}
            onChange={(event) => {
              setCode(parseInt(event.target.value));
            }}
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            value={code}
          />

          <label htmlFor="marcaNotebook">Marca*</label>
          <input
            type="text"
            id="marcaNotebook"
            placeholder="Acer"
            onChange={(event) => {
              setMarcaNotebook(event.target.value);
            }}
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            value={marcaNotebook}
          />

          <label htmlFor="modeloNotebook">Modelo*</label>
          <input
            type="text"
            id="modeloNotebook"
            placeholder="Aspire 3"
            onChange={(event) => {
              setModeloNotebook(event.target.value);
            }}
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            value={modeloNotebook}
          />

          <label htmlFor="sistema">Sistema*</label>
          <input
            type="text"
            id="sistema"
            placeholder="Linux"
            onChange={(event) => {
              setSistema(event.target.value);
            }}
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            value={sistema}
          />

          <label htmlFor="versaoSistema">Versão do sistema*</label>
          <input
            type="text"
            id="versaoSistema"
            placeholder="Ubuntu 23.04"
            onChange={(event) => {
              setVersaoSistema(event.target.value);
            }}
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            value={versaoSistema}
          />

          <label htmlFor="marcaProcessador">Marca do processador*</label>
          <input
            type="text"
            id="marcaProcessador"
            placeholder="Intel"
            onChange={(event) => {
              setMarcaProcessador(event.target.value);
            }}
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            value={marcaProcessador}
          />

          <label htmlFor="modeloProcessador">Modelo do processador*</label>
          <input
            type="text"
            id="modeloProcessador"
            placeholder="i3-8130U"
            onChange={(event) => {
              setModeloProcessador(event.target.value);
            }}
            className="mb-5 w-[200px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
            value={modeloProcessador}
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
                    onChange={(event) => {
                      setClock(parseInt(event.target.value));
                    }}
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    value={clock}
                  />
                  <span className="ml-px">GHz</span>
                </div>

                <label htmlFor="ram">RAM*</label>
                <div>
                  <input
                    type="number"
                    id="ram"
                    placeholder="16"
                    onChange={(event) => {
                      setRam(parseInt(event.target.value));
                    }}
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    value={ram}
                  />
                  <span className="ml-px">GB</span>
                </div>

                <label htmlFor="ddr">DDR*</label>

                <input
                  type="number"
                  id="ddr"
                  placeholder="4"
                  onChange={(event) => {
                    setDdr(parseInt(event.target.value));
                  }}
                  className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                  value={ddr}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="hd">HD</label>
                <div>
                  <input
                    type="number"
                    id="hd"
                    placeholder="1000"
                    onChange={(event) => {
                      setHd(parseInt(event.target.value));
                    }}
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    value={hd}
                  />
                  <span className="ml-px">GB</span>
                </div>

                <label htmlFor="ssd">SSD</label>
                <div>
                  <input
                    type="number"
                    id="ssd"
                    placeholder="256"
                    onChange={(event) => {
                      setSsd(parseInt(event.target.value));
                    }}
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    value={ssd}
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
                    onChange={(event) => {
                      setResolucao(event.target.value);
                    }}
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    value={resolucao}
                  />

                  <label htmlFor="polegadas">Polegadas</label>
                  <input
                    type="number"
                    id="polegadas"
                    placeholder="14"
                    onChange={(event) => {
                      setPolegadas(parseInt(event.target.value));
                    }}
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    value={polegadas}
                  />

                  <label htmlFor="frequenciaTela">Frequência</label>
                  <div>
                    <input
                      type="number"
                      id="frequenciaTela"
                      placeholder="120"
                      onChange={(event) => {
                        setFrequenciaTela(parseInt(event.target.value));
                      }}
                      className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                      value={frequenciaTela}
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
                    onChange={(event) => {
                      setMarcaPlaca(event.target.value);
                    }}
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    value={marcaPlaca}
                  />

                  <label htmlFor="moldePlaca">Modelo da placa</label>
                  <input
                    type="text"
                    id="marcaPlaca"
                    placeholder="RTX 2000"
                    onChange={(event) => {
                      setModeloPlaca(event.target.value);
                    }}
                    className="mb-5 w-[100px] border border-transparent border-b-gray-400 pb-1 outline-none transition focus:border-b-sky-500"
                    value={modeloPlaca}
                  />

                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="touch"
                      onChange={() => {
                        touch == true ? setTouch(false) : setTouch(true);
                      }}
                      checked={touch}
                    />
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
          <input type="file" accept="image/png, image/jpeg" multiple={true} id="imagens" className="hidden" onChange={getImages} />
          {imagesURLs.length == 0 ? (
            <>
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
              <label htmlFor="imagens">
                <div className="flex items-center">
                  <img src={imagesURLs[previewIndex]} className="w-[180px] rounded shadow" alt="" />
                </div>
              </label>
              <button type="button" value={1} className="h-min" onClick={navigateImages}>
                <BiChevronRight size={30} className="transition hover:fill-sky-500" />
              </button>
            </div>
          )}

          <textarea
            className="h-40 w-60 resize-none rounded border p-2 outline-none transition focus:border-sky-500"
            id="notas"
            placeholder="Você pode escrever observações aqui..."
            onChange={(event) => {
              setNotas(event.target.value);
            }}
            value={notas}
          />

          <button
            type="submit"
            className={`h-min w-60 rounded bg-green-800 p-2 text-white 
              ${statusUpload == 'Editando' ? 'cursor-not-allowed pr-4 opacity-80' : ''}`}
          >
            <div className="flex w-full items-center justify-center gap-2">
              <Spinner size={23} className={`animate-spin ${statusUpload == 'Editando' ? 'visible' : 'hidden'}`} />
              {statusUpload}
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
