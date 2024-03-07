import {createContext, useState} from 'react';
import {Notebook} from '../types/notebook';

export const EditContext = createContext(null);

export const EditProvider = ({children}) => {
  const [note, setNote] = useState<Notebook[]>([]);

  function change(note: Notebook) {
    setNote([note]);
  }

  return <EditContext.Provider value={{note, change}}>{children}</EditContext.Provider>;
};
