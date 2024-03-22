import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  LayersControl,
} from "react-leaflet";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};
const DjikstraAlgo = () => {
  const [routingMachine, setRoutingMachine] = useState(null);
  let RoutingMachineRef = useRef(null);
  console.log("Routing Machine", routingMachine);

  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;
    if (map) {
      console.log("Map", map);
      RoutingMachineRef = L.Routing.control({
        position: "topleft",
        lineOptions: {
          // Options for the routing line
          styles: [
            {
              color: "#757de8",
            },
          ],
        },
        waypoints: [startPosition, endPosition],
        
        createMarker: function (i, waypoint, n) {
          const icon = L.icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          });
          return L.marker(waypoint.latLng, { icon: icon });
        }, 
        draggableWaypoints: true,  
      });

      setRoutingMachine(RoutingMachineRef);
      setMap(mapRef.current);
    }
    console.log(RoutingMachineRef);
  }, [map]);

  useEffect(() => {
    if (!routingMachine) return;
    if (routingMachine) {
      routingMachine.addTo(map);
      routingMachine.setWaypoints([startPosition, endPosition]);
    }

    console.log("Routing machine working");
  }, [RoutingMachineRef,startPosition,endPosition]);

  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        setMap(mapRef.current);
        const { lat, lng } = e.latlng;

        if (!startPosition) {
          setStartPosition({ lat, lng });
        } else if (!endPosition) {
          setEndPosition({ lat, lng });
        }
      },
    });
    return null;
  };

  // const markerIcon = useMemo(
  //   () =>
  //     new L.Icon({
  //       iconUrl: markerIconPng,
  //       iconSize: [25, 41],
  //       iconAnchor: [12, 41],
  //     }),
  //   []
  // );
  
  const resetMap = ()=>{
    setStartPosition(null);
    setEndPosition(null);
 
  }

  return (
    <div className="bg-stone-600">
      <div className="flex justify-center text-xl pt-3 text-purple-300 font-bold">
        Djikstra Algorithm Visualisation on Maps
      </div>
      <div className="h-screen pt-4  pb-10 mx-10">
        <MapContainer
          ref={mapRef}
          style={{ height: "100%", minHeight: "100%" }}
          center={[28.43, 77.32]}
          zoom={10}
          scrollWheelZoom={true}

          // ref={mapRef}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="DjikstaAlgo">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={maps.base}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <AddMarkerOnClick />
          {startPosition && (
            <Marker
              position={startPosition}
              draggable={true}
              eventHandlers={{
                dragend: (e) => setStartPosition(e.target.getLatLng()),
              }}
              // icon={markerIcon}
            >
              <Popup>Startig Position</Popup>
            </Marker>
          )}

          {endPosition && (
            <Marker
              position={endPosition}
              draggable={true}
              eventHandlers={{
                dragend: (e) => setEndPosition(e.target.getLatLng()),
              }}
              // icon={markerIcon}
            >
              <Popup>Ending Position</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div className="flex justify-center pb-10 ">
        {/* <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Find Shortest Path
        </button> */}
        <button
          onClick ={resetMap}
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Reset Map
        </button>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 opacity-50"
        >
          Visulise it [Under Process]
        </button>
      </div>
    </div>
  );
};

export default DjikstraAlgo;
