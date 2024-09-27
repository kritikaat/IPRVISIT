import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IPRFormPage2 = () => {
    const [institutionName, setInstitutionName] = useState('');
    const [studentBranch, setStudentBranch] = useState('');
    const [studentSem, setStudentSem] = useState('');
    
    const navigate = useNavigate();  // Use navigate instead of window.location

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Form data to send
        const formData = {
            institution_name: institutionName,
            student_branch: studentBranch,
            student_sem: studentSem
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
                navigate('/IPRPage3');
            } else {
                alert('Failed to submit data');
            }

        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while submitting the form');
        }
    };

    const validateForm = () => {
        // Trim and capitalize input values
        const trimmedInstitutionName = institutionName.trim();
        const trimmedStudentBranch = studentBranch.trim();
        const trimmedStudentSem = studentSem.trim();

        // Check if any field is empty
        if (!trimmedInstitutionName || !trimmedStudentBranch || !trimmedStudentSem) {
            alert("Please fill out all required fields before proceeding.");
            return false;
        }

        // Ensure semester is numeric
        if (!/^\d+$/.test(trimmedStudentSem)) {
            alert("Semester of Students must contain numbers only.");
            return false;
        }

        return true;
    }

    // Function to capitalize the first letter of each word
    const capitalizeFirstLetter = (string) => {
        return string.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return (
        <div className="container border border-blue-500 mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Application Form for IPR Scientific Visit</h1>

            <div className="w-full  mx-auto">
  <div className="relative">
    {/* Steps container */}
    <div className="flex justify-between items-center">
      {/* Progress Bar */}
      <div className="absolute left-0 w-full h-1 bg-gray-200" style={{width: 'calc(100% - 16px)', left: '10px'}}></div>
      
      {/* Blue completed part */}
      <div className="absolute left-0 h-1 bg-blue-600" style={{width: 'calc(25% - 4px)', left: '10px'}}></div>
      
      {/* Step 1 */}
      <div className="z-10">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
      </div>
      
      {/* Step 2 */}
      <div className="z-10">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">2</div>
      </div>
      
      {/* Step 3 */}
      <div className="z-10">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">3</div>
      </div>
      
      {/* Step 4 */}
      <div className="z-10">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">4</div>
      </div>
    </div>
  </div>
</div>


            {/* Form Section */}
            <div className="form-section">
                <h2 className="text-xl font-semibold mb-4 ">Details of the Student Group</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="institution-name" className="block mb-1">
                        Name of the Institution <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="institution-name"
                        name="institution-name"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(capitalizeFirstLetter(e.target.value))}
                        required
                        className="block w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <p className="text-sm text-gray-600 mb-4">Please provide the name of your School / College / University / Institution</p>

                    <label htmlFor="student-branch" className="block mb-1">
                        Branch of Students <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="student-branch"
                        name="student-branch"
                        value={studentBranch}
                        onChange={(e) => setStudentBranch(capitalizeFirstLetter(e.target.value))}
                        required
                        className="block w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <p className="text-sm text-gray-600 mb-4">Please provide the Branch of Students</p>

                    <label htmlFor="student-sem" className="block mb-1">
                        Semester of Students <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        id="student-sem"
                        name="student-sem"
                        value={studentSem}
                        onChange={(e) => setStudentSem(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <p className="text-sm text-gray-600 mb-4">Please provide the Semester of students</p>

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

export default IPRFormPage2;
