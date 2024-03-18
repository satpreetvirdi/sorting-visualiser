import { Link } from "react-router-dom"


const Root = () => {
  return (<>

    <ul className="flex flex-col justify-center items-center bg-black min-h-screen" >
      {/* <div className="flex flex-row "><h1 className=" bg-white">Hello</h1> */}
      {/* </div> */}
      <div className="flex flex-row justify-center items-center bg-black">
        <li className=" mr-1">
          <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-5 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mx-2" ><Link to={"/sortingAlgos"}>Sorting Algorithm Visuliser</Link> </button>
        </li>
        <li className=" mr-1">
          <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-5 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mx-2" ><Link to={"/djikstraAlgo"}>Shortest Path Algo Visualiser</Link> </button>
        </li>
      </div>
    </ul>



  </>
  )
}

export default Root