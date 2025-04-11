
// File: src/App.js (with professional grouping, extra identity fields, and dynamic form logic)
import React, { useState } from 'react';
import axios from 'axios';



function App() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    aadhaar: '',
    pan: '',
    propertyCategory: '',
    propertyType: '',
    size: '',
    facing: '',
    floor: '',
    dob: '',
    maritalStatus: '',
    occupation: '',
    income: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
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
      Apartment: 5000000,
      
      Villa: 15000000,
      Commercial: 20000000
    };

    const sizeMultiplier = {
      '1000': 1,
      '1500': 1.3,
      '2000': 1.5,
      '2500': 1.8,
      '3000': 2
    };

    const floorBoost = {
      Ground: 1,
      '1st': 1.02,
      '2nd': 1.04,
      '3rd+': 1.06
    };

    const bhkModifier = {
      '1BHK': 1.0,
      '2BHK': 1.1,
      '3BHK': 1.25,
      '4BHK': 1.5,
      Luxury: 1.7,
      Garden: 1.6,
      Office: 1.3,
      Retail: 1.2,
      Warehouse: 1.15
    };

    const bonusFactors = [
      formData.extraFields.schools === 'Yes' ? 1.03 : 1,
      formData.extraFields.market === 'Yes' ? 1.02 : 1,
      formData.extraFields.metro === 'Yes' ? 1.05 : 1,
      formData.extraFields.security === 'Yes' ? 1.02 : 1,
      formData.extraFields.hospital === 'Yes' ? 1.03 : 1,
      formData.extraFields.park === 'Yes' ? 1.02 : 1,
      formData.extraFields.diningRoom === 'Yes' ? 1.03 : 1,
      formData.extraFields.poojaRoom === 'Yes' ? 1.03 : 1,
      formData.extraFields.privateTerrace === 'Yes' ? 1.04 : 1,
      formData.extraFields.studyRoom === 'Yes' ? 1.02 : 1,
      formData.extraFields.guestRoom === 'Yes' ? 1.03 : 1,
      formData.extraFields.swimmingPool === 'Yes' ? 1.05 : 1,
      formData.extraFields.garden === 'Yes' ? 1.04 : 1,
      formData.extraFields.parking === 'Yes' ? 1.02 : 1,
      formData.extraFields.loadingDock === 'Yes' ? 1.03 : 1,
      formData.extraFields.meetingRoom === 'Yes' ? 1.02 : 1,
      formData.extraFields.homeTheater === 'Yes' ? 1.03 : 1,
      formData.extraFields.balcony === 'Yes' ? 1.02 : 1,
      formData.extraFields.gym === 'Yes' ? 1.04 : 1,
      formData.extraFields.studyCorner === 'Yes' ? 1.02 : 1

    ];

    if (formData.propertyCategory && formData.size && formData.floor && formData.propertyType  ) {
      const base = basePrice[formData.propertyCategory] || 0;
      const sizeFactor = sizeMultiplier[formData.size] || 1;
      const floorFactor = floorBoost[formData.floor] || 1;
      const bhkBoost = bhkModifier[formData.propertyType] || 1;
      const locationBoost = bonusFactors.reduce((a, b) => a * b, 1);

      const total = base * sizeFactor * floorFactor * bhkBoost * locationBoost;
      return `₹ ${Math.round(total).toLocaleString()}`;
    }

    return '₹ 0';
  };

  const renderDynamicFields = () => {
    const { propertyCategory } = formData;
    const fields = [];

    if (propertyCategory === 'Apartment') {
      fields.push(
        <select name="propertyType" onChange={handleChange} className="w-full p-3 border rounded bg-white" required key="type">
          <option value="">Select BHK Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="4BHK">4BHK</option>
        </select>
      );
    } else if (propertyCategory === 'Commercial') {
      fields.push(
        <select name="propertyType" onChange={handleChange} className="w-full p-3 border rounded bg-white" required key="type">
          <option value="">Select Type</option>
          <option value="Office">Office</option>
          <option value="Retail">Retail</option>
          <option value="Warehouse">Warehouse</option>
        </select>
      );
    } else if (propertyCategory === 'Villa') {
      fields.push(
        <select name="propertyType" onChange={handleChange} className="w-full p-3 border rounded bg-white" required key="type">
          <option value="">Select Configuration</option>
          <option value="Luxury">Luxury</option>
          <option value="Garden">Garden Villa</option>
        </select>
      );
    }
    if (formData.size === '1000') {
      fields.push(
        <select
          key="studyCorner"
          name="extraFields.diningRoom"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need a separate Study Corner?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

      );
    }

    if (formData.propertyType === '3BHK' && formData.facing === 'South') {
      fields.push(
        <select
          key="diningRoom"
          name="extraFields.diningRoom"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need a separate Dining room?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
      fields.push(
        <select
          key="poojaRoom"
          name="extraFields.poojaRoom"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need a separate pooja room?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }

    if (formData.size === '3000' && formData.propertyCategory === 'Penthouse') {
      fields.push(
        <select
          key="privateTerrace"
          name="extraFields.privateTerrace"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need private terrace space?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (formData.propertyType === '2BHK' || formData.propertyCategory === 'Apartment') {
      fields.push(
        <select
          key="studyRoom"
          name="extraFields.diningRoom"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need a separate study room?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
      fields.push(
        <select
          key="guestRoom"
          name="extraFields.diningRoom"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need a separate guest room?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }

    if (formData.propertyType === 'Luxury') {
      fields.push(
        <select
          key="swimmingPool"
          name="extraFields.swimmingPool"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need a swimming pool?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (formData.propertyType === 'Garden') {
      fields.push(
        <select
          key="garden"
          name="extraFields.garden"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need a garden?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (formData.propertyType === 'Retail') {
      fields.push(
        <select
          key="parking"
          name="extraFields.parking"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need parking space?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (formData.propertyType === 'Warehouse') {
      fields.push(
        <select
          key="loadingDock"
          name="extraFields.loadingDock"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need loading dock?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (formData.propertyType === 'Office') {
      fields.push(
        <select
          key="meetingRoom"
          name="extraFields.meetingRoom"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need meeting room?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (formData.propertyType === '4BHK') {
      fields.push(
        <select
          key="homeTheater"
          name="extraFields.homeTheater"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need home theater?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (formData.propertyType === '3BHK') {
      fields.push(
        <select
          key="balcony"
          name="extraFields.balcony"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need balcony?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (formData.size === '3000') {
      fields.push(
        <select
          key="gym"
          name="extraFields.gym"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white"
        >
          <option value="">Need gym?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }


    // Add common environment preference fields
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
        <select name="extraFields.carParking" onChange={handleChange} className="w-full p-3 border rounded bg-white">
          <option value="">Car Parking?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select name="extraFields.paymentPlan" onChange={handleChange} className="w-full p-3 border rounded bg-white">
          <option value="">Payment Plan?</option>
          <option value="Installment Payment">Installment Payment</option>
          <option value="Down Payment">Down Payment</option>
        </select>
        <div className="mt-4">
          <label className="block mb-1 font-medium">Mode of Payment</label>
          <div className="flex gap-4">
            {['Cheque', 'Draft', 'Pay Order'].map(option => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name="extraFields.modeOfPayment" value={option} onChange={handleChange} />
                {option}
              </label>
            ))}
          </div>

          <input
            type="text"
            name="extraFields.paymentDetails"
            placeholder="Payment Details (Cheque / Draft / Pay Order No.)"
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded bg-white"
          />
          <input
            type="date"
            name="extraFields.paymentDate"
            placeholder="Date"
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded bg-white"
          />
          <input
            type="number"
            name="extraFields.amount"
            placeholder="Amount in Rupees"
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded bg-white"
          />
          <input
            type="text"
            name="extraFields.drawnOnBranch"
            placeholder="Drawn on / Branch"
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded bg-white"
          />
        </div>


        <div className="mt-6">
          <label className="block mb-1 font-medium">Home Loan Required?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="extraFields.loanRequired" value="Yes" onChange={handleChange} />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="extraFields.loanRequired" value="No" onChange={handleChange} />
              No
            </label>
          </div>
          <input
            type="text"
            name="extraFields.preferredFinancier"
            placeholder="Preferred Financier"
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded bg-white"
          />
        </div>


        <div className="mt-6">
          <label className="block mb-1 font-medium">How did you come to know about the project?</label>
          <div className="grid grid-cols-2 gap-2">
            {['Existing Customer', 'Newsprint', 'Hoarding', 'Website', 'E-mail', 'Channel Partners'].map(option => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="extraFields.sourceOfInfo"
                  value={option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
            <input
              type="text"
              name="extraFields.sourceOther"
              placeholder="Others (Specify)"
              onChange={handleChange}
              className="col-span-2 p-3 border rounded bg-white"
            />
          </div>
        </div>
      </>
    );




    return fields;
  };



  return (

    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-purple-300 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">


        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-purple-700 glow-text text-center mb-2 drop-shadow"> Real Estate Application</h1>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="text" name="aadhaar" placeholder="Aadhaar Number" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="text" name="pan" placeholder="PAN Card Number" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="text" name="city" placeholder="City" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="text" name="state" placeholder="State" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="text" name="dob" placeholder="Date of Birth" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <select name="maritalStatus" onChange={handleChange} className="w-full p-3 border rounded bg-white" required>
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            <input type="text" name="occupation" placeholder="Occupation" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />
            <input type="number" name="income" placeholder="Annual Income" onChange={handleChange} className="w-full p-3 border rounded bg-white" required />

            

            <select name="propertyCategory" onChange={handleChange} className="w-full p-3 border rounded bg-white" required>
              <option value="">Select Property Category</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              
              <option value="Commercial">Commercial</option>
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
          </div>

          <div className="bg-white/30 backdrop-blur p-6 rounded-xl text-gray-900 shadow-md">
            <h2 className="text-xl font-bold mb-2 text-blue-800">Live Preview</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Mobile:</strong> {formData.mobile}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Aadhaar:</strong> {formData.aadhaar}</p>
            <p><strong>PAN:</strong> {formData.pan}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>Pincode:</strong> {formData.pincode}</p>
            <p><strong>Date of Birth:</strong> {formData.dob}</p>
            <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
            <p><strong>Occupation:</strong> {formData.occupation}</p>
            <p><strong>Annual Income:</strong> {formData.income}</p>
            <p><strong>Category:</strong> {formData.propertyCategory}</p>
            <p><strong>Type:</strong> {formData.propertyType}</p>
            <p><strong>Size:</strong> {formData.size} sqft</p>
            <p><strong>Facing:</strong> {formData.facing}</p>
            <p><strong>Floor:</strong> {formData.floor}</p>
            <p><strong>Extra Features:</strong></p>
            <ul>
              {Object.keys(formData.extraFields).map((key) => (
                <li key={key}>
                  {key.replace('extraFields.', '')}: {formData.extraFields[key]}
                </li>
              ))}
            </ul>
            <p><strong>Estimated Price:</strong> <span className="text-green-700 font-semibold">{calculatePricing()}</span></p>
            

          </div>
          <div className="mt-10 border-t pt-6">
  
</div>

          
        </form>
      </div>
      {/* <App1 /> */}
    </div>
  );
}

export default App;
