import { RiCloseCircleLine } from 'react-icons/ri'
import { Notebook } from '../../types/notebook'
import './Modal.css'
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai'
import { useEffect, useState, MouseEvent } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import generatePDF, { Margin } from 'react-to-pdf'
import {image} from '../../assets/google-logo.png'

type props = {
  showModal: boolean,
  setShowModal: (showModal: boolean)=>void,
  notebook: Notebook
}

type paths = { path: string }

const meuElemento = () => document.getElementById('teste');

export function Modal({showModal, setShowModal, notebook}:props){

  const [ arrayURL, setArrayURL ] = useState<string[]>([])
  const [ viewIndex, setViewIndex ] = useState(0)
  console.log(arrayURL)

  useEffect( () => {
    const a: string[] = []
    notebook.photos.map((items: paths) => {
      a.push(items.path)
      setArrayURL(a)
    })
  }, [notebook.photos])

  function navigateImages(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault()

    if(event.currentTarget.value == '1'){
      if(viewIndex + 1 > arrayURL.length -1)
        setViewIndex(0)
      else
        setViewIndex(viewIndex + 1)
    }
    else{
      if(viewIndex - 1 < 0)
        setViewIndex(arrayURL.length - 1)
      else
        setViewIndex(viewIndex - 1)
    }

  }
  
  console.log('esse e a')

  if(!showModal)
  return(
      <div className='flex justify-center items-center p-10 bg-neutral-500 bg-opacity-50 backdrop-blur-sm myModal'>
        <div className='flex flex-col gap-10 min-h-min bg-white p-5 h-full w-full max-h-[1000px] max-w-[1500px] rounded'>
        <div className='flex justify-between'>
          <span className='text-2xl font-bold'>Notebook {notebook.code}</span>
          <AiOutlineClose size={30} className='hover:cursor-pointer' onClick={() => {setShowModal(false)}}/>
        </div>

        <div className='flex gap-10'>  

          <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
              <div className='font-semibold'>Marca</div>
              <span>{notebook.brand.name}</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Modelo</div>
              <span>{notebook.model}</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Sistema</div>
              <span>{notebook.system.name}</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Versão do sistema</div>
              <span>{notebook.system_version}</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Marca do processador</div>
              <span>{notebook.processor.brand.name}</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Modelo do processador</div>
              <span>{notebook.processor.model}</span>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
              <div className='font-semibold'>Clock</div>
              <span>{notebook.processor.clock}</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Memória RAM</div>
              <span>{notebook.ram} GB</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Armazenamento HD</div>
              <span>{notebook.hd} GB</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Armazenamento SSD</div>
              <span>{notebook.ssd} GB</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Tela</div>
              <span>{notebook.resolution} de {notebook.inch} polegadas, {notebook.hertz}Hz</span>
            </div>

            <div className='flex flex-col'>
              <div className='font-semibold'>Placa de vídeo</div>
              <span>{notebook.graphics_card.brand.name} {notebook.graphics_card.model}</span>
            </div>
          </div>

          <div className='flex gap-5'>
            <button type="button"value={0} className="h-min" onClick={navigateImages}>
              <BiChevronLeft size={30} className="hover:fill-sky-500 transition"/>
            </button>
            <img src={'https://notebooksbucket.s3.us-east-2.amazonaws.com/' + arrayURL[viewIndex]} className='w-32 h-min rounded' alt="a" />
            <button type="button"value={1} className="h-min" onClick={navigateImages}>
              <BiChevronRight size={30} className="hover:fill-sky-500 transition"/>
            </button>
            <button type="button" onClick={() => generatePDF(meuElemento, {method: 'save', page:{margin: Margin.SMALL}, canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/jpeg',
      qualityRatio: 1,
      
   },})}>pdf </button>
          </div>
          <div id="teste"><span>oi</span><img src={'https://notebooksbucket.s3.us-east-2.amazonaws.com/sC0Tz3o5O6UagfLfokVbHr0T7JL2/1709746631868.jpg'} className='w-32 h-20 rounded' alt="a" /></div>
        </div>
          

        </div>
      </div>
  )
}