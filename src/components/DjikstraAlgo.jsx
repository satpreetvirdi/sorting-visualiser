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
  const mapRef = useRef(null);
  console.log(mapRef);
  // State vars for our routing machine instance:
  const [routingMachine, setRoutingMachine] = useState(null);

  // const mapRef = useRef();
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  // console.log(mapRef);

  const RoutingMachineRef = useRef(null);
  const map = mapRef.current;

  useEffect(() => {
    // Check For the map instance:
    console.log(map);
    if (!map) return;
    if (map) {
      // Assign Control to React Ref:
      RoutingMachineRef.current = L.Routing.control({
        position: "topleft", // Where to position control on map
        lineOptions: {
          // Options for the routing line
          styles: [
            {
              color: "#757de8",
            },
          ],
        },
        waypoints: [startPosition, endPosition], // Point A - Point B
      });
      // Save instance to state:
      setRoutingMachine(RoutingMachineRef.current);
    }
    console.log(RoutingMachineRef);
  }, [map]);

  // Once routing machine instance is ready, add to map:
  useEffect(() => {
    if (!routingMachine) return;
    if (routingMachine) {
      routingMachine.addTo(map);
    }
  }, [routingMachine]);

  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
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

  const handleMarkerDrag = (position, type) => {
    if (type === "start") {
      setStartPosition(position);
    } else {
      setEndPosition(position);
    }
  };

  // useEffect(() => {
  //   if (!mapRef.current) return;

  //   const map = mapRef.current.LeafLet;
  //   console.log(map);
  //   const routingControl = L.Routing.control({
  //     waypoints: [
  //       L.latLng(startPosition), // Start position
  //       L.latLng(endPosition) // End position
  //     ],
  //     routeWhileDragging: true,
  //     geocoder: L.Control.Geocoder.nominatim(),
  //     router: new L.Routing.OSRMv1({
  //       serviceUrl: 'http://router.project-osrm.org/route/v1'
  //     })
  //   }).addTo(map);

  //   return () => {
  //     routingControl.removeFrom(map);
  //   };
  // }, []);

  // Shortest Path
  // const [showPath ,setShowPath] = useState(false);
  // useEffect(() => {
  //   if (!mapRef.current) return;
  //   const map = mapRef.current.leafLetElement;
  //   const control = L.Routing.control({
  //     waypoints: [L.latLng(startPosition), L.latLng(endPosition)],
  //     routeWhileDragging: false,
  //   }).addTo(map);
  //   // console.log(control);
  // }, []);

  // Create the routing-machine instance:

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
          zoom={4}
          scrollWheelZoom={true}
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
                dragend: (e) => handleMarkerDrag(e.target.getLatLng(), "start"),
              }}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>Startig Position</Popup>
            </Marker>
          )}

          {endPosition && (
            <Marker
              position={endPosition}
              draggable={true}
              eventHandlers={{
                dragend: (e) => handleMarkerDrag(e.target.getLatLng(), "end"),
              }}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>Ending Position</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div className="flex justify-center pb-10 ">
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Find Shortest Path
        </button>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Reset Map
        </button>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Alternative
        </button>
      </div>
    </div>
  );
};

export default DjikstraAlgo;
