
import { Mail, Phone, MapPin } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gdwater-darkblue mb-6">Hai bisogno di assistenza?</h3>
      
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="bg-gdwater-gray p-3 rounded-full mr-4">
            <Phone className="h-6 w-6 text-gdwater-blue" />
          </div>
          <div>
            <p className="text-sm text-gdwater-darkgray">Telefono</p>
            <p className="text-lg font-medium">0431 193 8144</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-gdwater-gray p-3 rounded-full mr-4">
            <Mail className="h-6 w-6 text-gdwater-blue" />
          </div>
          <div>
            <p className="text-sm text-gdwater-darkgray">Email</p>
            <p className="text-lg font-medium">commerciale@gdwater.it</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-gdwater-gray p-3 rounded-full mr-4">
            <MapPin className="h-6 w-6 text-gdwater-blue" />
          </div>
          <div>
            <p className="text-sm text-gdwater-darkgray">Sede</p>
            <p className="text-lg font-medium">Via del Lavoro 8
33048 San Giovanni Al Natisone - Udine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
