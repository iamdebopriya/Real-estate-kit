// File: src/App.js (React + Tailwind with smart dynamic pricing, progress & live preview)
import React, { useState } from 'react';
import axios from 'axios';
import bg from './images/s.jpg';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    propertyType: '',
    size: '',
    facing: '',
    floor: '',
    extraFields: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('extraFields.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        extraFields: {
          ...prev.extraFields,
          [key]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/submissions', formData);
      alert('Form submitted successfully!');
    } catch (err) {
      alert('Submission failed!');
    }
  };

  const calculatePricing = () => {
    const basePrice = {
      '2BHK': 5000000,
      '3BHK': 7000000,
      '4BHK': 9000000,
      'Penthouse': 15000000,
      'Villa': 20000000
    };
    const sizeMultiplier = {
      '1000': 1,
      '1500': 1.3,
      '2000': 1.5,
      '2500': 1.8,
      '3000': 2
    };
    const floorBoost = {
      'Ground': 1,
      '1st': 1.02,
      '2nd': 1.04,
      '3rd+': 1.06
    };
    const bonusFactors = [
      formData.extraFields.schools === 'Yes' ? 1.03 : 1,
      formData.extraFields.market === 'Yes' ? 1.02 : 1,
      formData.extraFields.metro === 'Yes' ? 1.05 : 1,
      formData.extraFields.security === 'Yes' ? 1.02 : 1,
      formData.extraFields.hospital === 'Yes' ? 1.03 : 1,
      formData.extraFields.park === 'Yes' ? 1.02 : 1
    ];
    if (formData.propertyType && formData.size && formData.floor) {
      const base = basePrice[formData.propertyType] || 0;
      const sizeFactor = sizeMultiplier[formData.size] || 1;
      const floorFactor = floorBoost[formData.floor] || 1;
      const locationBoost = bonusFactors.reduce((a, b) => a * b, 1);
      const total = base * sizeFactor * floorFactor * locationBoost;
      return `₹ ${Math.round(total).toLocaleString()}`;
    }
    return '₹ 0';
  };

  const renderDynamicFields = () => {
    const fields = [];
    fields.push(
      <>
        <select name="extraFields.schools" onChange={handleChange} className="w-full p-3 border rounded bg-white">
          <option value="">Nearby Schools?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select name="extraFields.market" onChange={handleChange} className="w-full p-3 border rounded bg-white">
          <option value="">Nearby Market?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select name="extraFields.metro" onChange={handleChange} className="w-full p-3 border rounded bg-white">
          <option value="">Metro Nearby?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select name="extraFields.security" onChange={handleChange} className="w-full p-3 border rounded bg-white">
          <option value="">24x7 Security?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select name="extraFields.hospital" onChange={handleChange} className="w-full p-3 border rounded bg-white">
          <option value="">Nearby Hospitals?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select name="extraFields.park" onChange={handleChange} className="w-full p-3 border rounded bg-white">
          <option value="">Park Available?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </>
    );
    return fields;
  };

  const progress = [formData.name, formData.mobile, formData.email, formData.propertyType, formData.size].filter(Boolean).length * 20;

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4" style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <div className="mb-6">
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-white text-center mt-2">Progress: {progress}%</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-3xl font-bold text-white text-center mb-2 drop-shadow">🏠 Real Estate Application</h1>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />

            <select name="propertyType" onChange={handleChange} className="w-full p-3 border rounded bg-white" required>
              <option value="">Select Property Type</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="4BHK">4BHK</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Villa">Villa</option>
            </select>

            <select name="size" onChange={handleChange} className="w-full p-3 border rounded bg-white" required>
              <option value="">Select Size (sqft)</option>
              <option value="1000">1000</option>
              <option value="1500">1500</option>
              <option value="2000">2000</option>
              <option value="2500">2500</option>
              <option value="3000">3000</option>
            </select>

            <select name="facing" onChange={handleChange} className="w-full p-3 border rounded bg-white" required>
              <option value="">Facing Direction</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>

            <select name="floor" onChange={handleChange} className="w-full p-3 border rounded bg-white" required>
              <option value="">Select Floor</option>
              <option value="Ground">Ground</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd+">3rd+</option>
            </select>

            {renderDynamicFields()}

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition">Submit Application</button>
          </form>

          <div className="bg-white/30 backdrop-blur p-6 rounded-xl text-gray-900 shadow-md">
            <h2 className="text-xl font-bold mb-2 text-blue-800">📋 Live Preview</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Mobile:</strong> {formData.mobile}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Type:</strong> {formData.propertyType}</p>
            <p><strong>Size:</strong> {formData.size} sqft</p>
            <p><strong>Facing:</strong> {formData.facing}</p>
            <p><strong>Floor:</strong> {formData.floor}</p>
            <p><strong>🏷️ Estimated Price:</strong> <span className="text-green-700 font-semibold">{calculatePricing()}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;