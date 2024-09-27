import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IPRFormPage3 = () => {
    // State to manage input values
    const [numStudents, setNumStudents] = useState('');
    const [numFaculty, setNumFaculty] = useState('');

    const navigate = useNavigate();  // Use navigate instead of window.location.href

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Form data to send
        const formData = {
            num_students: numStudents,
            num_faculty: numFaculty,
        };

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
                navigate('/IPRPage4');
            } else {
                alert('Failed to submit data');
            }

        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while submitting the form');
        }
    };


    const validateForm = () => {
        // Trim input values
        const trimmedNumStudents = numStudents.trim();
        const trimmedNumFaculty = numFaculty.toString().trim();

        // Check if any field is empty
        if (trimmedNumStudents === '' || trimmedNumFaculty === '') {
            alert('Please fill out all required fields before proceeding.');
            return false;
        }

        // Ensure the number of students and faculty are positive integers
        if (!/^\d+$/.test(trimmedNumStudents) || parseInt(trimmedNumStudents) <= 0) {
            alert('Please enter a valid number of students (must be a positive integer).');
            return false;
        }

        if (!/^\d+$/.test(trimmedNumFaculty) || parseInt(trimmedNumFaculty) <= 0) {
            alert('Please enter a valid number of faculty members (must be a positive integer).');
            return false;
        }

        return true; // Allow form submission if validation passes
    };

    return (
        <div className="container border border-blue-500 mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Application Form for IPR Scientific Visit</h1>

            {/* Progress Bar */}
            <div className="relative mb-6">
                <div className="flex justify-between items-center">
                    <div className="absolute left-0 w-full h-1 bg-gray-200" style={{ width: 'calc(100% - 16px)', left: '10px' }}></div>
                    <div className="absolute left-0 h-1 bg-blue-600" style={{ width: 'calc(50% - 4px)', left: '10px' }}></div>
                    {/* Steps */}
                    <div className="z-10">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    </div>
                    <div className="z-10">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    </div>
                    <div className="z-10">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">3</div>
                    </div>
                    <div className="z-10">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">4</div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <h2 className="text-xl font-semibold mb-4">Details of Visiting Group</h2>
                <p className="mb-4">
                    Please email a separate list of ALL the visitors (Students and accompanying staff). Even though there is no restriction on the number of students, 30 would be an ideal number in order to finish the tours within the prescribed time. The format for the list should be: Name, M/F, position, course/year, email, mobile No. to <strong>outreach@ipr.res.in</strong> for making the entry passes.
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="Students" className="block mb-1">
                        Number of Students in the group <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        id="Students"
                        name="Students"
                        value={numStudents}
                        onChange={(e) => setNumStudents(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <p className="text-sm text-gray-600 mb-4">Please provide the number of students in the group</p>

                    <label htmlFor="Faculty" className="block mb-1">
                        Number of Faculty members in the group <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        id="Faculty"
                        name="Faculty"
                        value={numFaculty}
                        onChange={(e) => setNumFaculty(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <p className="text-sm text-gray-600 mb-4">Please provide the number of faculty members in the group</p>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IPRFormPage3;
