import React, { useState,createContext} from 'react'

interface Props{
    children: React.ReactNode;
}
export type Algo = "merge sort" | "insertion sort";
interface Settings{
    algoType: Algo;
    arrayLen : number;
    delay:number;
}
const initVals :Settings= {
    algoType:"merge sort",
    arrayLen:25,
    delay:15
}
type SettingsContext  = {
    settings:Settings;
    setSettings?:  React.Dispatch<React.SetStateAction<Settings>>;
}

export const Context = createContext<SettingsContext>({settings: initVals});

const AlgoContext : React.FC<Props> = ({children}) => {
    const [settings , setSettings ] = useState<Settings>(initVals)
  return (
    <Context.Provider value={{settings,setSettings}}>
    {children}
    </Context.Provider>
  )
}

export default AlgoContext