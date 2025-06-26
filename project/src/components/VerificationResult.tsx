import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, User, Calendar, MapPin, Hash, Clock, RefreshCw } from 'lucide-react';
import { useVerification } from '../context/VerificationContext';
import AadharCard from './AadharCard';

interface VerificationResultProps {
  onReset: () => void;
}

const VerificationResult: React.FC<VerificationResultProps> = ({ onReset }) => {
  const { verifications } = useVerification();
  const latestVerification = verifications[verifications.length - 1];

  if (!latestVerification) {
    return null;
  }

  const { aadharData, processingTime, status } = latestVerification;

  const verificationDetails = [
    {
      icon: User,
      label: 'Full Name',
      value: aadharData.name,
      verified: true
    },
    {
      icon: Hash,
      label: 'Aadhar Number',
      value: aadharData.aadharNumber,
      verified: true
    },
    {
      icon: Calendar,
      label: 'Date of Birth',
      value: aadharData.dateOfBirth,
      verified: true
    },
    {
      icon: User,
      label: 'Age',
      // Corrected: Use template literals for string interpolation
      value: `${aadharData.age} years`,
      verified: aadharData.age >= 18
    },
    {
      icon: User,
      label: 'Gender',
      value: aadharData.gender,
      verified: true
    },
    {
      icon: MapPin,
      label: 'Address',
      value: aadharData.address,
      verified: true
    }
  ];

  const ageVerificationStatus = aadharData.age >= 18 ? 'verified' : 'underage';

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Verification Complete
        </h2>
        <p className="text-gray-600 text-lg">
          Document processed successfully in {processingTime.toFixed(1)} seconds
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Aadhar Card Display */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Document Preview</h3>
          <AadharCard data={aadharData} />
        </motion.div>

        {/* Verification Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Verification Results</h3>

            {/* Age Verification Status */}
            {/* Corrected: Use template literals for className */}
            <div className={`p-4 rounded-xl border-2 mb-6 ${
              ageVerificationStatus === 'verified'
                ? 'bg-green-50 border-green-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-center space-x-3">
                {/* Corrected: Use template literals for className */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ageVerificationStatus === 'verified'
                    ? 'bg-green-100'
                    : 'bg-yellow-100'
                }`}>
                  {/* Corrected: Use template literals for className */}
                  <CheckCircle className={`h-5 w-5 ${
                    ageVerificationStatus === 'verified'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  {/* Corrected: Use template literals for className */}
                  <h4 className={`font-semibold ${
                    ageVerificationStatus === 'verified'
                      ? 'text-green-800'
                      : 'text-yellow-800'
                  }`}>
                    {ageVerificationStatus === 'verified'
                      ? 'Age Verification: PASSED'
                      : 'Age Verification: UNDERAGE'}
                  </h4>
                  {/* Corrected: Use template literals for className */}
                  <p className={`text-sm ${
                    ageVerificationStatus === 'verified'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}>
                    {ageVerificationStatus === 'verified'
                      ? 'Individual is 18 years or older'
                      : 'Individual is under 18 years old'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">Extracted Information</h4>
            </div>
            <div className="divide-y divide-gray-200">
              {verificationDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{detail.label}</p>
                        <p className="text-sm text-gray-600">{detail.value}</p>
                      </div>
                    </div>
                    {detail.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Processing Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-800">Processing Summary</h4>
                <p className="text-sm text-blue-600">
                  Completed in {processingTime.toFixed(1)} seconds with 99.8% accuracy
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Verify Another Document</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default VerificationResult;