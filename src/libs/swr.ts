import useSWR from "swr";
import api from "./axios";

async function myFetch(url: string){
  return api.get(url).then((result) => {
    return result.data
  })
}

export function useGetNotes(){
  const { data, error, isLoading, mutate } = useSWR('/notebook', myFetch)
  console.log(data)
  return { data, error, isLoading, mutate }
}
