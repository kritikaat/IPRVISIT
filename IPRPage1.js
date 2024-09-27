import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const IPRForm = () => {
    const navigate = useNavigate();  // Create a navigate function

    // Define the handleSubmit function
    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent default form submission behavior
        // Navigate to the second page when the form is submitted
        navigate('/IPRPage2');
    }

    return (
        <div className="container border border-blue-500 mx-auto p-6 bg-white rounded-lg shadow-lg w-full mt-10">
            <h1 className='text-2xl font-bold text-gray-800 text-center mb-4'>Application Form for IPR Scientific Visit</h1>
            <form onSubmit={handleSubmit}>
                <p className="text-gray-600 mb-4">
                    It would be a pleasure to welcome you to the Institute for Plasma Research (IPR). 
                    Please fill up this form for permission to undertake a scientific visit to IPR. 
                    For more details, you can contact:
                </p>

                <div className="contact-info border-b border-gray-300 mb-4 pb-4">
                    <strong className="text-gray-800">Contact Person:</strong> Mr. Gattu Ramesh Babu / Mr. Narendra Chauhan<br />
                    <strong className="text-gray-800">Email:</strong> academicvisit@ipr.res.in<br />
                    <strong className="text-gray-800">Phone:</strong> 079-2966 4446<br />
                    <strong className="text-gray-800">Mobile:</strong> 94087 85633 (Gattu Ramesh) | 97777 46866 (Narendra)
                </div>

                <div className="note bg-gray-100 p-4 rounded-lg border-l-4 border-red-600 mb-4">
                    <h3 className="text-lg text-red-600 mb-2">NOTE:</h3>
                    <ul className="list-disc pl-5">
                        <li className="text-gray-700 mb-2">Group needs to confirm their arrival THREE days prior to their visit, as well as once again by 9:00 AM on the day of the visit by emailing <strong>academicvisit@ipr.res.in</strong> AND calling/WhatsApp <strong>94087 85633 / 97777 46866</strong>.</li>
                        <li className="text-gray-700 mb-2">IPR reserves the right to cancel/reschedule your pre-confirmed visit if required. IPR will inform you as early as possible.</li>
                        <li className="text-gray-700 mb-2">Visit to IPR is restricted to only one day (WEDNESDAY) in a week. Please confirm with IPR if your proposed date of visit is available.</li>
                        <li className="text-gray-700 mb-2">Strict COVID protocols will have to be followed while inside the campus.</li>
                    </ul>
                </div>

                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition duration-300">Next</button>
            </form>
        </div>
    );
};

export default IPRForm;
