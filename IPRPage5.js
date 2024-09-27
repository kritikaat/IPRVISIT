import React, { useState } from 'react';

const IPRScientificVisitForm = () => {
    const [formData, setFormData] = useState({
        campus: [],
        ipr_time: '',
        fcipt_time: '',
        visit_date: '',
        visit_time: '',
        materials: [],
        email: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                setFormData((prev) => ({
                    ...prev,
                    [name]: [...prev[name], value]
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    [name]: prev[name].filter((item) => item !== value)
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        


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
                alert('form submitted succesfully!');
            } else {
                alert('Failed to submit data');
            }

        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while submitting the form');
        }
    };


    return (
        <div className="container border border-blue-500 mx-auto p-6 bg-white rounded-lg mt-10">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Application Form for IPR Scientific Visit</h1>

            <div className="progress-container flex items-center justify-between mb-6">
                <div className="circle bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center">1</div>
                <div className="bar flex-grow h-1 bg-blue-600"></div>
                <div className="circle bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center">2</div>
                <div className="bar flex-grow h-1 bg-blue-600"></div>
                <div className="circle bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center">3</div>
                <div className="bar flex-grow h-1 bg-blue-600"></div>
                <div className="circle bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center">4</div>
            </div>

            <div className=" bg-white ">
                <h2 className="text-xl font-semibold mb-4">Visit Options</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-gray-700 mb-4">
                        IPR has three campuses. Depending on the time you have, please choose the campuses that your group would like to visit. Visits are scheduled only on the 2nd and 4th Wednesdays of the month.
                    </p>

                    <input type="hidden" name="access_key" value="7570f6a0-b982-41d0-a8db-dcfb63ac9df3" />

                    <table className="w-full border-collapse mb-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 bg-blue-600 text-white p-3">Select Campus</th>
                                <th className="border border-gray-300 bg-blue-600 text-white p-3">Campus</th>
                                <th className="border border-gray-300 bg-blue-600 text-white p-3">Location</th>
                                <th className="border border-gray-300 bg-blue-600 text-white p-3">Things to observe</th>
                                <th className="border border-gray-300 bg-blue-600 text-white p-3">Time required</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    id: 'ipr_main',
                                    name: 'IPR Main Campus',
                                    location: 'Near Indira Bridge, Bhat, India',
                                    observe: 'Interactive tour, labs, fusion technology, plasma applications',
                                    time: '1.5 Hours'
                                },
                                {
                                    id: 'labs',
                                    name: 'Various Labs',
                                    location: 'Fission Technology Complex',
                                    observe: 'Astra, SST-1, Accelerator, Technology Park, Laboratories',
                                    time: '2-3 Hours'
                                },
                                {
                                    id: 'fcipt',
                                    name: 'FCIPT',
                                    location: 'GIDC Gandhinagar',
                                    observe: 'Industrial, medical, and energy applications of plasma',
                                    time: '2 Hours'
                                }
                            ].map((campus) => (
                                <tr key={campus.id}>
                                    <td className="border border-gray-300 p-3">
                                        <input
                                            type="checkbox"
                                            id={`select_${campus.id}`}
                                            name="campus"
                                            value={campus.id}
                                            onChange={handleChange}
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-3">{campus.name}</td>
                                    <td className="border border-gray-300 p-3">{campus.location}</td>
                                    <td className="border border-gray-300 p-3">{campus.observe}</td>
                                    <td className="border border-gray-300 p-3">{campus.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2">Campuses your group wishes to visit<span className="text-red-500">*</span></label>
                        <div className="mb-4">
                            <label className="block text-gray-800 font-semibold mb-2">IPR Main Campus</label>
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="ipr_main_morning"
                                        name="ipr_time"
                                        value="morning"
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <label htmlFor="ipr_main_morning" className="ml-2 text-gray-700">Morning</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="ipr_main_afternoon"
                                        name="ipr_time"
                                        value="afternoon"
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <label htmlFor="ipr_main_afternoon" className="ml-2 text-gray-700">Afternoon</label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2">FCIPT (GIDC Gandhinagar)</label>
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="fcipt_morning"
                                        name="fcipt_time"
                                        value="morning"
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <label htmlFor="fcipt_morning" className="ml-2 text-gray-700">Morning</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="fcipt_afternoon"
                                        name="fcipt_time"
                                        value="afternoon"
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <label htmlFor="fcipt_afternoon" className="ml-2 text-gray-700">Afternoon</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2" htmlFor="visit_date">Date of IPR visit<span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            id="visit_date"
                            name="visit_date"
                            required
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2" htmlFor="visit_time">Time for IPR visit<span className="text-red-500">*</span></label>
                        <input
                            type="time"
                            id="visit_time"
                            name="visit_time"
                            required
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2">IPR to FCIPT and Extension Lab</label>
                        <img src = {require('./mapIPR.png')} alt="Map showing the route from IPR to FCIPT" className="w-full border border-gray-300 rounded-md" style={{ width: '30%', height: '30%' }} />
                    </div>

                    <div className="mb-4">
                        <div className='mb-2'>
                        <label className="block text-gray-800 font-semibold mb-2">Resource materials on plasma that require<span className="text-red-500">*</span></label>
                        </div>
                        <div className='mb-2'>
                        <input
                            type="checkbox"
                            id="personnel_id"
                            name="materials"
                            value="Personnel ID"
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-blue-600 ml-4"
                        />
                        <label htmlFor="personnel_id" className="ml-2 text-gray-700">Posters (set of 10 , in English)</label>
                        </div>
                        <div className='mb-2'>
                        <input
                            type="checkbox"
                            id="sanitizer"
                            name="materials"
                            value="Sanitizer"
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-blue-600 ml-4"
                        />
                        <label htmlFor="sanitizer" className="ml-2 text-gray-700">Posters (set of 10 , in Hindi)</label>
                        </div>
                        <div className='mb-2'>
                        <input
                            type="checkbox"
                            id="mask"
                            name="materials"
                            value="Mask"
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-blue-600 ml-4"
                        />
                        <label htmlFor="mask" className="ml-2 text-gray-700">Book entitled "Living with plasma (in English)"</label>
                        </div>
                        <div className='mb-2'>
                        <input
                            type="checkbox"
                            id="others"
                            name="materials"
                            value="Others"
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-blue-600 ml-4"
                        />
                        <label htmlFor="others" className="ml-2 text-gray-700">Book entitled "Living with plasma (in Hindi)</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2" htmlFor="email">Email<span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
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
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IPRScientificVisitForm;
