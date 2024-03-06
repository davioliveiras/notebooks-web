
import { Notebook } from "../types/notebook"
import ArchivedCard from "../components/archives/ArchivedCard"
import { useGetNotes } from "../libs/swr"

export default function Archives(){

  const { data, error, isLoading, } = useGetNotes()
  console.log(data)

  if(isLoading) return(<span>carregando</span>)

  if(error) return(<span>ocorreu um erro</span>)

  let allNotArchived = true

  if(data != 'No notebooks')
  data.map((items: Notebook) => { if(items.isArchived) allNotArchived = false })

  if(data == 'No notebooks' || allNotArchived){
    return(<span>quando vc cadastrar...</span>)
    
  }
  else{
    return(
      <div className='flex gap-2'>          
          {data.map((items: Notebook) =>
            <div key={items.code}><ArchivedCard notebook={items}/></div>
          )}          
      </div> 
    )
  }
}