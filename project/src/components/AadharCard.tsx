import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface AadharData {
  name: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  photo: string;
  age: number;
}

interface AadharCardProps {
  data: AadharData;
  className?: string;
}

const AadharCard: React.FC<AadharCardProps> = ({ data, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-2xl ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-yellow-400" />
          <div>
            <h3 className="font-bold text-lg">आधार</h3>
            <p className="text-blue-200 text-sm">AADHAAR</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-blue-200 text-sm">Government of India</p>
          <p className="text-xs text-blue-300">भारत सरकार</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Photo */}
        <div className="col-span-1">
          <div className="w-24 h-28 bg-gray-300 rounded-lg overflow-hidden border-2 border-white/20">
            <img
              src={data.photo}
              alt="Aadhar Photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="col-span-2 space-y-3">
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-wide">Name / नाम</p>
            <p className="font-semibold text-lg">{data.name}</p>
          </div>
          
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-wide">Date of Birth / जन्म तिथि</p>
            <p className="font-medium">{data.dateOfBirth}</p>
          </div>
          
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-wide">Gender / लिंग</p>
            <p className="font-medium">{data.gender}</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-4">
        <p className="text-blue-200 text-xs uppercase tracking-wide">Address / पता</p>
        <p className="font-medium text-sm leading-relaxed">{data.address}</p>
      </div>

      {/* Aadhar Number */}
      <div className="mt-6 pt-4 border-t border-blue-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-wide">Aadhar Number</p>
            <p className="font-bold text-xl font-mono tracking-wider">{data.aadharNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-xs">Age</p>
            <p className="font-bold text-2xl">{data.age}</p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="mt-4 flex items-center justify-between text-xs text-blue-300">
        <span>Secure QR Code</span>
        <span>Hologram Verified</span>
        <span>Digital Signature</span>
      </div>
    </motion.div>
  );
};

export default AadharCard;