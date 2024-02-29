import { FiPlus } from "react-icons/fi";
import api from "../libs/axios";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function New(){

  const [ images, setImages ] = useState<FileList>()

  const filesToUpload = new FormData()

  //CÓDIGO
  const marcaNotebook = useRef<HTMLInputElement>(null)
  const modeloNotebook = useRef<HTMLInputElement>(null)
  const sistema = useRef<HTMLInputElement>(null)
  const versaoSistema = useRef<HTMLInputElement>(null)
  const marcaProcessador = useRef<HTMLInputElement>(null)
  const modeloProcessador = useRef<HTMLInputElement>(null)
  const clock = useRef<HTMLInputElement>(null)
  const ram = useRef<HTMLInputElement>(null)
  const ddr = useRef<HTMLInputElement>(null)
  const hd = useRef<HTMLInputElement>(null)
  const ssd = useRef<HTMLInputElement>(null)
  const resolucao = useRef<HTMLInputElement>(null)
  const polegadas = useRef<HTMLInputElement>(null)
  const frequenciaTela = useRef<HTMLInputElement>(null)
  const touch = useRef<HTMLInputElement >(null)
  const notas = useRef<HTMLTextAreaElement>(null)

  function getImages(event: ChangeEvent<HTMLInputElement>){
    const { files } = event.target
    // console.log(files[0])

    if(files){
      Array.from(files).forEach((item) => {
        const link = URL.createObjectURL(item)
        console.log(link)
        filesToUpload.append('photo', item)
      })

      // setImages(files)
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const notebook = {
      code: 80,
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

      processor: {
        model: modeloProcessador.current?.value,
        clock: clock.current?.value ? parseInt(clock.current?.value) : null,
        brand: {
          name: marcaProcessador.current?.value,
        }
      },

      system: {
        name: sistema.current?.value,
      },

      brand: {
        name: marcaNotebook.current?.value,
      },

      graphics_card: {
        model: 'RTX 4060',
        brand: {
          name: 'Gigabyte'
        }
      },

      photos: []
    }

    console.log(JSON.stringify(notebook))

    const headers = { 
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    await api.post('upload-images', filesToUpload, headers).then((response) => {
      console.log(response.data)
      notebook.photos = response.data
    })

    await api.post('/notebook', notebook).then((response) => {
      console.log(response.data)
    }).catch((erro) => {
      console.log(erro)
    })
  }

  return(
    <form onSubmit={submit} className="flex justify-center">
      <div className="flex bg-white gap-2 rounded shadow">
        <div className="flex flex-col  pl-10 pr-10 pt-5">
          <span className="text-lg font-semibold mb-5">Detalhes e processador</span>

          <label htmlFor="marcaNotebook">Marca</label>
          <input type="text" id="marcaNotebook" placeholder="Acer"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
          ref={marcaNotebook}/>

          <label htmlFor="modeloNotebook">Modelo</label>
          <input type="text" id="modeloNotebook" placeholder="Aspire 3"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
            ref={modeloNotebook}/>

          <label htmlFor="sistema">Sistema</label>
          <input type="text" id="sistema" placeholder="Linux"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
            ref={sistema}/>

          <label htmlFor="versaoSistema">Versão do sistema</label>
          <input type="text" id="versaoSistema" placeholder="Ubuntu 23.04"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
            ref={versaoSistema}/>

          <label htmlFor="marcaProcessador">Marca do processador</label>
          <input type="text" id="marcaProcessador" placeholder="Ubuntu 23.04"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
            ref={marcaProcessador}/>
          
          <label htmlFor="modeloProcessador">Modelo do processador</label>
          <input type="text" id="modeloProcessador" placeholder="Ubuntu 23.04"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
            ref={modeloProcessador}/>

          <label htmlFor="clock">Clock</label>
          <div>
          <input type="number" id="clock" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"
            ref={clock}/>
          <span className="ml-2">GHz</span>
          </div>           
                  
        </div>

        <div className="flex w-80 flex-col  pl-5 pr-5 pt-5">
          <span className="text-lg font-semibold mb-5">Armazenamento e memória</span>

          <label htmlFor="ram">RAM</label>
          <div>
          <input type="number" id="ram" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-tr outline-none transition focus:border-sky-500 p-1"
            ref={ram}/>
          <span className="ml-2">GB</span>
          </div>

          <label htmlFor="ddr">DDR</label>

          <input type="number" id="ddr" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-tr outline-none transition focus:border-sky-500 p-1"
            ref={ddr}/>

          <label htmlFor="hd">HD</label>
          <div>
          <input type="number" id="hd" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-tr outline-none transition focus:border-sky-500 p-1"
            ref={hd}/>
          <span className="ml-2">GB</span>
          </div>

          <label htmlFor="ssd">SSD</label>
          <div>
          <input type="number" id="ssd" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-tr outline-none transition focus:border-sky-500 p-1"
            ref={ssd}/>
          <span className="ml-2">GB</span>
          </div>

          <div className="flex flex-col">
            {/* <WarningCircle size={18}/> */}
            <span className="w-52 text-sm italic text-justify text-neutral-500">
              Você deve inserir a quantidade de pelo menos um tipo de armazenamento, HD ou SSD (ou os dois juntos).
            </span>
          </div>
        </div>

        <div className="flex flex-col  pl-5 pr-5 pt-5">
          <span className="text-lg font-semibold mb-5">Tela e resolução</span>

          <label htmlFor="resolucao">Resolução</label>
          <input type="text" id="resolucao" placeholder="1080x720"
            className="border w-[100px] border-gray-400 rounded mb-5 border-tr outline-none transition focus:border-sky-500 p-1"
            ref={resolucao}/>

          <label htmlFor="polegadas">Polegadas</label>
          <input type="number" id="polegadas" placeholder="14"
            className="border w-[100px] border-gray-400 rounded mb-5 outline-none transition focus:border-sky-500 p-1"
            ref={polegadas}/>

          <label htmlFor="frequenciaTela">Frequência</label>
          <div>
          <input type="number" id="frequenciaTela" placeholder="120"
            className="border w-[100px] border-gray-400 rounded mb-5 outline-none transition focus:border-sky-500 p-1"
            ref={frequenciaTela}/>
          <span className="ml-2">Hz</span>
          </div>

          <div className="flex gap-2">
            <input type="checkbox" id="touch"
              ref={touch}/>            
            <label htmlFor="touch">Tela touch</label>          
          </div>
        </div>

        <div className="flex flex-col w-80 items-center pl-5 pr-5 pt-5">

          <span className="text-lg font-semibold mb-5">Imagens</span>

          <input type="file" accept="image/png, image/jpeg" multiple={true} id="imagens" className="hidden" onChange={getImages}/>
          <label htmlFor="imagens">
            <div className="flex justify-center items-center w-40 h-60 border-[2px] rounded border-dashed cursor-pointer">
              <FiPlus/>
            </div>
          </label>

          {/* <img src={images} alt="" /> */}

          <textarea className="outline-none border resize-none" id="notas" cols={30} rows={10}
            ref={notas}/>

          <button type="submit" className="bg-green-800 rounded p-2 text-white">
            Enviar
          </button>
        </div>

      </div>
    </form>
  )
}