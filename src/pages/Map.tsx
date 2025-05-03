import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/leaflet-icons";

const Map = () => {
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
    {
      position: [-34.6137, -58.3916],
      title: "North Service Center",
      services: ["Cleaning", "Construction", "Repairs"],
      address: "456 North Street, Buenos Aires"
    },
    {
      position: [-34.5937, -58.3716],
      title: "South Service Center",
      services: ["Washing", "Maintenance", "Renovation"],
      address: "789 South Boulevard, Buenos Aires"
    }
  ];

  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-300 mb-4">Our Service Coverage</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We provide comprehensive cleaning, washing, repair, and construction services across Buenos Aires. 
            Our dedicated service centers ensure quick response times and quality service delivery.
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
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