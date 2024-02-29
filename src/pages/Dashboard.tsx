import { useEffect, useState } from 'react'
import Laptop from '../assets/laptop.png'
import api from '../libs/axios'
import Card from '../components/dashboard/Card'
import { Notebook } from '../types/notebook'
import { FiPlus } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

export default function Dashboard(){

  const [notebooksList, setNotebooksList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  console.log(notebooksList)

    useEffect(() => {
      console.log(api.defaults)
      api.get('/notebook').then((result) => {
        if(result.data != 'No notebooks')
          setNotebooksList(result.data)
          setIsLoading(true)
      })
    }, [])
  

  return(
    <>
    {isLoading ? 
      <>
        {notebooksList.length == 0 ?
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
              <NavLink to={'/novo'} 
                className='flex items-center font-medium text-lg text-white pl-4 pr-4 pt-1 pb-1 gap-2 mt-5 rounded bg-opacity-80 bg-green-900 hover:bg-opacity-90 transition'
                >
                <FiPlus size={20} color='white'/>
                Criar
              </NavLink>
            </div>
          </div>
        : 
          <div className='flex gap-2'>          
            {notebooksList.map((items: Notebook) =>           
              <div key={items.code}><Card notebook={items}/></div>
            )}          
          </div>    
        }
      </>
    : <span>loading</span> }
    </>
  )
}