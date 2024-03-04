import { createContext, useState } from "react";
import { Notebook } from "../types/notebook";

const n: Notebook = {
  id: 1,
  code: 1,
  model: '1', 
  brand: {name: '1'},
  system: {name: '1'},
  system_version: '1',
  processor_brand: '1',
  processor_model: '1',
  clock: 1,
  hd: null,
  ssd: null,
  ram: 1,
  ddr: 1,
  resolution: '1',
  touch: false,
  note: '1',
  photos: [{path: '1'}, {path: '1'}]
}

export const EditContext = createContext(null)
export const EditProvider = ({children}) => {
  const [ noteboo, setNotebook ] = useState<Notebook>(n)

  function change(note: Notebook){
    setNotebook(note)
  }

  return <EditContext.Provider value={{noteboo, setNotebook}}>{children}</EditContext.Provider>  
}