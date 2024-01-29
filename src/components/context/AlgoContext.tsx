import React, { useState,createContext, useEffect} from 'react'
import { insertionSortAnims } from '../insertionSort';
import { mergeSortAnims } from '../mergeSort';

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
    sort: (algoType: Algo)=> void;
}

export const Context = createContext<SettingsContext>({settings: initVals
,sort: algoType=> {}
});

type Items = {
    items : number[];
    setItems?:React.Dispatch<React.SetStateAction<number[]>> 
}

export const ItemsContext = createContext<Items>({items:[]})

const AlgoContext : React.FC<Props> = ({children}) => {
    const [settings , setSettings ] = useState<Settings>(initVals);
    const [items, setItems] = useState<number[]>([]);
    useEffect(()=>{
        const ranNums= []
        for(let i=0;i<settings.arrayLen;i++){
            ranNums.push(Math.floor(Math.random()*540));
            setItems(ranNums);
        }
        // console.log(items)
    },[settings.arrayLen])

    
    const sort = (algoType: Algo)=>{
        switch(algoType){
            case "insertion sort":
                const {newArr,animsArr} = insertionSortAnims(items);
                animDivs(newArr,animsArr);
                break;
            case"merge sort":
                // const {newArr, animsArr} = mergeSortAnims(items);
                const aux:number[] = [];
                const arr:number[][] = [];
                const nums = [...items];
                mergeSortAnims(items,aux,arr,0,items.length-1);
                animateMerge(nums,arr);
                console.log(nums);
                break;
            default:
            break;
        }   
    };


    const animDivs = (newArr : number[], arr : number[][] )=>{
        arr.forEach(([first,second],idx)=>{
            const div = document.getElementById(`${first}`);
            const div2 = document.getElementById(`${second}`);
            if(!div || !div2)return;
            setTimeout(()=>{
                div.style.backgroundColor = "#b041f0";
                div2.style.backgroundColor = "#b041f0";
                const divHeight  = div.style.height;
                div.style.height = div2.style.height;
                div2.style.height = divHeight;
                setTimeout(() => {
                    div.style.backgroundColor = "#486";
                    div2.style.backgroundColor = "#486";
                    if(idx == arr.length - 1){
                        setItems(newArr);
                    }
                }, settings.delay * 5);
            },settings.delay*idx*5)
        })

    }

    const animateMerge = (newArr : number[], arr : number[][] )=>{
        arr.forEach(([newHeight,index],idx)=>{
            const div = document.getElementById(`${index}`);
      
            if(!div)return;
            setTimeout(()=>{
                div.style.backgroundColor = "#b041f0";
             
               
                div.style.height =`${newHeight/7}%`;
           
                setTimeout(() => {
                    div.style.backgroundColor = "#486";
                 
                    if(idx == arr.length - 1){
                        setItems(newArr);
                    }
                }, settings.delay * 5);
            },settings.delay*idx*5)
        })

    }


  return (
    <ItemsContext.Provider value={{items,setItems}}>
    <Context.Provider value={{sort,settings,setSettings}}>
    {children}
    </Context.Provider>
    </ItemsContext.Provider>
  )
}

export default AlgoContext