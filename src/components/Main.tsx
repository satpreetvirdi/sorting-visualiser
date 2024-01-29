import { useContext } from "react"
import { Context, ItemsContext } from "./context/AlgoContext"


const Main = () => {
  const {items} = useContext(ItemsContext)
  const {settings} = useContext(Context)
  return (
    <section className="row-span-5">
      <div className="flex w-full h-full items-end overflow-hidden">
      {items.map((item,idx)=>(
        <div key={`${item}-${settings.arrayLen}-${idx}`}
        className="flex-1"
        style= {
          {
            backgroundColor:`#486`,
            height:`${item/7}%`,
          }
        }
        id={`${idx}`}
        />
      ))}
      </div>
    </section>
  )
}

export default Main