import { useContext } from "react";
import { Algo, Context } from "./context/AlgoContext";


const Nav = () => {
    const {sort,settings,setSettings} = useContext(Context);     
    
    const onArrayChange : React.ChangeEventHandler<HTMLInputElement> = e =>{
        if(!setSettings) return;
        setSettings(c=>({...c , arrayLen : +e.target.value * 5}));
    }
    const onDelayChange : React.ChangeEventHandler<HTMLInputElement> =e=>{
        if(!setSettings) return;
        setSettings(c=>({...c, delay:+e.target.value }))
    }
    const onAlgoChange =(type:Algo)=>{
        if(!setSettings) return;
        setSettings(c=>({...c,algoType:type}))
    }
    return (<nav className="h-full  bg-gray-300  grid grid-flow-row overflow-hidden ">
        <div className="flex items-center justify-center w-full my-2 ">
            <button className={`border border-teal-100 shadow-md py-2 px-2 mx-3 transition-all active:scale-95 ${settings.algoType==="merge sort" && "text-purple-500 font-bold "}`}
            onClick={()=>onAlgoChange("merge sort")}>Merge Sort </button>
            <button className={`border border-teal-100 mx-3 shadow-md py-2 px-2 transition-all active:scale-9 ${settings.algoType==="insertion sort" && "text-purple-500 font-bold "}`}
            onClick={()=>onAlgoChange("insertion sort")} >Insertion Sort </button>
            <button className="underline mx-3" 
            onClick={()=> sort(settings.algoType)}
            >Sort!</button>
        </div>
        <div className="flex flex-col items-center w-full ">
            <label htmlFor="itemms_amount">Array Length : {settings.arrayLen}</label>
            <input type="range" name="items_amount" id="items_amount" className="w-full max-w-2xl" defaultValue={25} min={1}
                onChange={onArrayChange}
            />
            <label htmlFor="itemms_amount">Delay : {settings.delay}</label>
            <input type="range" name="delay" id="delay" className="w-full  max-w-2xl" defaultValue={15} min={3} 
            onChange={onDelayChange}/>
        </div>
    </nav>
    )


};

export default Nav