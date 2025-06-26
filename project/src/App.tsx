import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Verification from './pages/Verification';
import Dashboard from './pages/Dashboard';
import { VerificationProvider } from './context/VerificationContext';

function App() {
  return (
    <VerificationProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <Header />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-16"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </motion.main>
        </div>
      </Router>
    </VerificationProvider>
  );
}

export default App;