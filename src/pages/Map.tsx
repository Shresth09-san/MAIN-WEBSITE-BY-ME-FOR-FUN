import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/leaflet-icons";
import { useTheme } from "@/context/ThemeContext";

const Map = () => {
  const { isDarkMode } = useTheme();
  
  // Main office location
  const mainOffice: [number, number] = [-34.6037, -58.3816];
  
  // Service coverage areas
  const serviceLocations = [
    {
      position: [-34.6037, -58.3816],
      title: "Main Office",
      services: ["All Services", "Customer Support", "Administration"],
      address: "123 Service Avenue, Buenos Aires"
    },
    
  ];

  return (
    <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-slate-100'} py-12`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-800'} mb-4`}>Discover Our Location</h2>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>We are located in the heart of Buenos Aires, providing top-notch services to our community. Explore our main office and service areas on the map below.</p>
         
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border shadow-md`}>
          <div className="rounded-xl overflow-hidden h-[500px] relative">
            <div className="absolute inset-0 z-0">
              <MapContainer
                center={mainOffice}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {serviceLocations.map((location, index) => (
                  <Marker key={index} position={location.position}>
                    <Popup>
                      <div className="text-center p-2">
                        <h3 className="font-semibold text-lg text-gray-800">{location.title}</h3>
                        <p className="text-gray-600 mb-2">{location.address}</p>
                        <div className="mt-2">
                          <h4 className="font-medium text-gray-700">Services:</h4>
                          <ul className="text-sm text-gray-600">
                            {location.services.map((service, i) => (
                              <li key={i} className="mt-1">• {service}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default Map;