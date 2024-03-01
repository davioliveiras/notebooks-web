import { FiPlus } from "react-icons/fi";
import api from "../libs/axios";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function New(){

  const [ imagesURLs, setImagesURLs ] = useState<string[]>([])
  const [ previewIndex, setPreviewIndex ] = useState(0)

  console.log(imagesURLs.length)

  const filesToUpload = new FormData()

  const code = useRef<HTMLInputElement>(null)
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
  const marcaPlaca = useRef<HTMLInputElement>(null)
  const modeloPlaca = useRef<HTMLInputElement>(null)

  function getImages(event: ChangeEvent<HTMLInputElement>){
    const { files } = event.target
    const photos : string[] = []

    if(files){
      Array.from(files).forEach((item) => {
        photos.push(URL.createObjectURL(item))
        filesToUpload.append('photo', item)
      })
      setImagesURLs(photos)
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

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
        model: modeloPlaca.current?.value,
        brand: {
          name: marcaPlaca.current?.value
        }
      },

      photos: []
    }

    console.log(JSON.stringify(notebook))

    console.log(notebook)

    // const headers = { 
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // }

    // await api.post('upload-images', filesToUpload, headers).then((response) => {
    //   console.log(response.data)
    //   notebook.photos = response.data
    // })

    // await api.post('/notebook', notebook).then((response) => {
    //   console.log(response.data)
    // }).catch((erro) => {
    //   console.log(erro)
    // })
  }

  function navigateImages(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault()

    if(event.currentTarget.value == '1'){
      if(previewIndex + 1 > imagesURLs.length -1)
        setPreviewIndex(0)
      else
        setPreviewIndex(previewIndex + 1)
    }
    else{
      if(previewIndex - 1 < 0)
        setPreviewIndex(imagesURLs.length - 1)
      else
        setPreviewIndex(previewIndex - 1)
    }

  }

  return(
    <form onSubmit={submit} className="flex justify-center">
      <div className="flex bg-white gap-14 pb-5 rounded shadow">
        <div className="flex flex-col  pl-10 pr-10 pt-5">
          <span className="text-lg font-semibold mb-5">Detalhes gerais</span>

          <label htmlFor="code">Código</label>
          <input type="text" id="code" placeholder="123"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
          ref={code}/>

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
          <input type="text" id="marcaProcessador" placeholder="Intel"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
            ref={marcaProcessador}/>
          
          <label htmlFor="modeloProcessador">Modelo do processador</label>
          <input type="text" id="modeloProcessador" placeholder="i3-8130U"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
            ref={modeloProcessador}/>                 
        </div>

        <div className="flex flex-col pl-5 pr-5 pt-5">          
          <span className="text-lg font-semibold mb-5">Armazenamento e memória</span>
          <div className="flex gap-20">
            <div className="flex flex-col">
              <label htmlFor="clock">Clock</label>
              <div>
              <input type="number" id="clock" placeholder="2.2"
                className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                ref={clock}/>
              <span className="ml-px">GHz</span>
              </div> 

              <label htmlFor="ram">RAM</label>
              <div>
              <input type="number" id="ram" placeholder="16"
                className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                ref={ram}/>
              <span className="ml-px">GB</span>
              </div>

              <label htmlFor="ddr">DDR</label>

              <input type="number" id="ddr" placeholder="4"
                className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                ref={ddr}/>
            </div>

            <div className="flex flex-col">
              <label htmlFor="hd">HD</label>
              <div>
              <input type="number" id="hd" placeholder="1000"
                className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                ref={hd}/>
              <span className="ml-px">GB</span>
              </div>

              <label htmlFor="ssd">SSD</label>
              <div>
              <input type="number" id="ssd" placeholder="256"
                className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                ref={ssd}/>
              <span className="ml-px">GB</span>
              </div>

              {/* <div className="flex flex-col">
                <span className="w-52 text-sm italic text-justify text-neutral-500">
                  Você deve inserir a quantidade de pelo menos um tipo de armazenamento, HD ou SSD (ou os dois juntos).
                </span>
              </div> */}
            </div>
          </div>

          <div className="flex flex-col">            
            <span className="text-lg font-semibold mb-5">Tela e resolução</span>
            <div className="flex gap-20">
              <div className="flex flex-col">              
                <label htmlFor="resolucao">Resolução</label>
                <input type="text" id="resolucao" placeholder="1080x720"
                  className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                  ref={resolucao}/>

                <label htmlFor="polegadas">Polegadas</label>
                <input type="number" id="polegadas" placeholder="14"
                  className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                  ref={polegadas}/>

                <label htmlFor="frequenciaTela">Frequência</label>
                <div>
                  <input type="number" id="frequenciaTela" placeholder="120"
                    className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                    ref={frequenciaTela}/>
                  <span className="ml-px">Hz</span>
                </div>                        
              </div>

              <div className="flex flex-col">                
                
                <label htmlFor="marcaPlaca">Marca da placa</label>
                <input type="text" id="marcaPlaca" placeholder="NVIDIA"
                  className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                  ref={marcaPlaca}/>

                <label htmlFor="moldePlaca">Modelo da placa</label>
                <input type="text" id="marcaPlaca" placeholder="RTX 2000"
                  className="border w-[100px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"
                  ref={modeloPlaca}/>

                <div className="flex gap-2">
                  <input type="checkbox" id="touch"
                    ref={touch}/>            
                  <label htmlFor="touch">Tela touch</label>          
                </div>
              </div>
            </div>
          </div>
        </div>        

        <div className="flex flex-col w-80 items-center gap-5 pt-5">
          <span className="text-lg font-semibold mb-5">Imagens</span>
          {imagesURLs.length == 0 ? 
            <>
              <input type="file" accept="image/png, image/jpeg" multiple={true} id="imagens" className="hidden" onChange={getImages}/>
              <label htmlFor="imagens">
                <div className="flex justify-center items-center w-[180px] h-60 border-[2px] rounded border-dashed cursor-pointer">
                  <FiPlus/>
                </div>
              </label>
            </>
          : 
            <div className="flex gap-5 h-60">
              <button type="button"value={0} onClick={navigateImages}>
                <BiChevronLeft size={30} className="hover:fill-sky-500 transition"/>
              </button>
              <div className="flex items-center">
                <img src={imagesURLs[previewIndex]} className="w-[180px] rounded shadow" alt=""/>
              </div>            
              <button type="button"value={1} onClick={navigateImages}>
                <BiChevronRight size={30} className="hover:fill-sky-500 transition"/>
              </button>
            </div>
          }

          <textarea className="outline-none border resize-none w-60 h-40 rounded p-2 transition focus:border-sky-500" id="notas"
            placeholder="Você pode escrever observações aqui..."
            ref={notas}/>

          <button type="submit" className="bg-green-800 w-44 h-min rounded p-2 text-white">
            Salvar
          </button>
        </div>

      </div>
    </form>
  )
}