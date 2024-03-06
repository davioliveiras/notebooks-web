import { Notebook } from "../../types/notebook";
import api from "../../libs/axios";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNotes } from "../../libs/swr";

type props = {
  notebook: Notebook
}

export default function Card(props: props){

  const url = useNavigate()

  const notebook = props.notebook

  function deleteNotebook(event:  MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    api.delete('/notebook/' + notebook.id)
    url(0)
  }

  const { mutate } = useGetNotes()

  function desarquivar(){
    mutate()
    const note = props.notebook
    note.isArchived = false
    note.photos = ['']
    api.put('/notebook', note).then((response) => {
      console.log(response)
    })
    mutate()
  }

  if(!props.notebook.isArchived)
    return
  else
  return(
    <>
      <div className="flex items-center bg-white bg-opacity-90 h-56 w-96 rounded shadow font-normal">

        <div className="grow flex flex-col gap-2">
          <div className="flex justify-center items-center gap-2">
            {/* <FaChevronLeft/> */}
            <img src={'https://notebooksbucket.s3.us-east-2.amazonaws.com/' + props.notebook.photos[0].path} alt="" className="w-32 rounded-sm shadow-md"/>
            {/* <FaChevronRight /> */}
          </div>
          <div className="flex gap-2 justify-center">
            <button className="bg-slate-700 text-slate-100 rounded pl-2 pr-2 pb-px pt-px hover:bg-slate-600 transition"
              onClick={desarquivar}>
              desarquivarTEMP
            </button>
            
            <button className="bg-slate-700 text-slate-100 rounded pl-2 pr-2 pb-px pt-px hover:bg-slate-600 transition"
              onClick={() => {url(`/notebook/${notebook.code}`)}}>
              Editar
            </button>
            <button className="bg-slate-700 text-slate-100 rounded pl-2 pr-2 pb-px pt-px hover:bg-slate-600 transition"
              onClick={deleteNotebook}>
              deletarTEMP
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mr-5 min-w-24">
          <div className="flex flex-col">
            <span className="font-medium text-center bg-neutral-200 bg-opacity-60 rounded shadow-sm">{props.notebook.id}</span>
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
  )
}