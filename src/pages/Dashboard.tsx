import Laptop from '../assets/laptop.png'
import api from '../libs/axios'
import Card from '../components/dashboard/Card'
import { Notebook } from '../types/notebook'
import { FiPlus } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'

export default function Dashboard(){

  async function myFetch(url: string){
    return api.get(url).then((result) => {
      return JSON.stringify(result.data)
    }).catch((error) => {
      throw error
    })
  }

  const { data, error, isLoading } = useSWR('/notebook', myFetch)

  if(error){
    return <div>ocorreu um erro</div>
  }

  const dataConverted = data ? JSON.parse(data) : null

  if(isLoading){
    return <div>carregando</div>
  }  

  if(dataConverted == 'No notebooks'){
    return(
      <div className='flex grow flex-col items-center justify-center'>
        <div className='flex gap-2 mb-10'>
          <img src={Laptop} alt="" className='w-20 grayscale opacity-50'/>
          <img src={Laptop} alt="" className='w-20 grayscale opacity-30'/>
          <img src={Laptop} alt="" className='w-20 grayscale opacity-20'/>
          <img src={Laptop} alt="" className='w-20 grayscale opacity-20'/>
          <img src={Laptop} alt="" className='w-20 grayscale opacity-10'/>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-neutral-400 font-medium text-4xl">A lista está vazia!</span>
          <span className="text-neutral-400 font-base text-base flex text-justify">
            Quando você cadastrar novos aparelhos eles aparecerão aqui.
          </span>
          <NavLink to={'/criar'} 
            className='flex items-center font-medium text-lg text-white pl-4 pr-4 pt-1 pb-1 gap-2 mt-5 rounded bg-opacity-80 bg-green-900 hover:bg-opacity-90 transition'
            >
            <FiPlus size={20} color='white'/>
            Criar
          </NavLink>
        </div>
      </div>
    )
  }
  else{
    return(
      <div className='flex gap-2'>          
        {dataConverted.map((items: Notebook) =>           
          <div key={items.code}><Card notebook={items}/></div>
        )}          
      </div> 
    )
  }
}