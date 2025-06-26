import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Camera, Scan } from 'lucide-react';
import AadharCard from '../components/AadharCard';
import VerificationResult from '../components/VerificationResult';
import { useVerification } from '../context/VerificationContext';
import { generateSimulatedAadhar } from '../utils/aadharGenerator';

const Verification: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addVerification } = useVerification();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    processVerification();
  };

  const processVerification = () => {
    setStep('processing');
    
    // Simulate processing time
    setTimeout(() => {
      const aadharData = generateSimulatedAadhar();
      addVerification({
        id: Date.now().toString(),
        timestamp: new Date(),
        status: 'verified',
        aadharData,
        processingTime: Math.random() * 2 + 1 // 1-3 seconds
      });
      setStep('result');
    }, 2000);
  };

  const generateSampleAadhar = () => {
    const aadharData = generateSimulatedAadhar();
    addVerification({
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'verified',
      aadharData,
      processingTime: Math.random() * 2 + 1
    });
    setStep('result');
  };

  const resetVerification = () => {
    setStep('upload');
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Aadhar Verification
          </h1>
          <p className="text-xl text-gray-600">
            Upload your Aadhar card for instant age and identity verification
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Document</h2>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Drop your Aadhar card here
                    </h3>
                    <p className="text-gray-600 mb-4">
                      or click to browse files
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: JPG, PNG, PDF (Max 10MB)
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Secure Upload</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Instant Processing</span>
                    </div>
                  </div>
                </div>

                {/* Demo Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Try Demo</h2>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <div className="text-center mb-6">
                      <Scan className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Generate Sample Aadhar
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Test the verification system with a simulated Aadhar card
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={generateSampleAadhar}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Camera className="h-5 w-5" />
                      <span>Generate Sample Aadhar</span>
                    </motion.button>
                  </div>

                  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Demo Mode</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          This generates simulated Aadhar data for testing purposes only.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-12 text-center"
            >
              <div className="relative mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Processing Your Document
              </h2>
              <p className="text-gray-600 mb-8">
                Our AI is analyzing your Aadhar card for verification...
              </p>
              
              <div className="space-y-3 max-w-md mx-auto">
                {[
                  'Scanning document quality',
                  'Extracting personal information',
                  'Verifying authenticity',
                  'Calculating age verification'
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.5, duration: 0.5 }}
                    className="flex items-center space-x-3 text-left"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <VerificationResult onReset={resetVerification} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Verification;