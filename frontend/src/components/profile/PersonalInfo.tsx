import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
} from "lucide-react";

const PersonalInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl">
            <User className="text-blue-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Full Name</p>
            <h3 className="font-semibold text-slate-800">
              Amulya
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <Mail className="text-green-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <h3 className="font-semibold text-slate-800">
              amulya@email.com
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-xl">
            <Phone className="text-orange-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <h3 className="font-semibold text-slate-800">
              +91 XXXXX XXXXX
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-xl">
            <MapPin className="text-purple-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Location</p>
            <h3 className="font-semibold text-slate-800">
              Hyderabad, Telangana
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-pink-100 p-3 rounded-xl">
            <Calendar className="text-pink-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Date of Birth
            </p>

            <h3 className="font-semibold text-slate-800">
              12 October 2005
            </h3>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PersonalInfo;