import "leaflet/dist/leaflet.css";
import L, { Icon, LatLng } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
const DjikstraAlgo = () => {
  const mapRef = useRef(null);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);

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

  return (
    <div className="bg-stone-600">
      <div className="flex justify-center text-xl pt-3 text-purple-300 font-bold">
        Djikstra Algorithm Visualisation on Maps
      </div>
      <div className="h-screen pt-4  pb-10 mx-10">
        <MapContainer
          ref={mapRef}
          style={{ height: "70%", minHeight: "70%" }}
          center={[28.43, 77.32]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
