import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IPRFormPage4 = () => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        email: '',
        mobile: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        position: '',
        email: '',
        mobile: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            // Sending POST request to the backend
            const response = await fetch('http://localhost:4000/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.text();
            console.log("Response from server:", data);

            // If the request was successful, navigate to the next page
            if (response.ok) {
                navigate('/IPRPage5');
            } else {
                alert('Failed to submit data');
            }

        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while submitting the form');
        }
    };


    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.name) {
            newErrors.name = 'Please fill out this field.';
            isValid = false;
        }

        if (!formData.position) {
            newErrors.position = 'Please fill out this field.';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Please fill out this field.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!formData.mobile) {
            newErrors.mobile = 'Please fill out this field.';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className="container border border-blue-500 mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Application Form for IPR Scientific Visit</h1>

              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center">
                    <div className="absolute left-0 w-full h-1 bg-gray-200" style={{ width: 'calc(100% - 16px)', left: '10px' }}></div>
                    <div className="absolute left-0 h-1 bg-blue-600" style={{ width: 'calc(75% - 4px)', left: '10px' }}></div>
                    {/* Steps */}
                    <div className="z-10">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    </div>
                    <div className="z-10">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    </div>
                    <div className="z-10">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    </div>
                    <div className="z-10">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">4</div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white">
                <h2 className="text-xl font-semibold mb-4">Details of Group in-charge</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">
                            Name of Group in-charge <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        <p className="text-gray-500 text-sm">Please provide the name of group in-charge</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="position" className="block mb-1">
                            Position of Group in-charge <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
                        <p className="text-gray-500 text-sm">Please let us know the position held by you in your institution</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">
                            Email-ID of Group in-charge <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        <p className="text-gray-500 text-sm">Enter your email</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="mobile" className="block mb-1">
                            Mobile number of Group in-charge <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            pattern="[0-9]{10}"
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                        <p className="text-gray-500 text-sm">Please insert your 10-digit mobile number</p>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IPRFormPage4;
