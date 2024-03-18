import 'leaflet/dist/leaflet.css';
import L from "leaflet";

import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
const DjikstraAlgo = () => {
  var map;




  // useEffect(()=>{
  //   const initMap = () => {

  //     map = L.map('map').setView([0, 0], 1);
  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; OpenStreetMap contributors'
  //     }).addTo(map);
  //     map.on('click', function (event) {

  //     });
  //   }
  //   console.log("InitMap called")

  // },[])

  return (
    <div className='bg-stone-700'>
    <div className='flex justify-center text-xl pt-3 text-purple-300 font-bold'>
      Djikstra Algorithm Visualisation on Maps
    </div>
      <div className='h-lvh pt-4 pb-10 mx-10'>
        <MapContainer style={{ height: "70%", minHeight: "80%" }} center={[28.679,  77.069]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[28.679,  77.069]}>
            <Popup>
             Start position 
            </Popup>
            Hello
          </Marker>
        </MapContainer>
      </div>
      <div className='flex justify-center pb-10 '>
      <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Find Shortest Path</button>
      <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Reset Map</button>
      <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>
      </div>
    </div>
  )
}

export default DjikstraAlgo