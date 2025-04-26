import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddEvent = () => {
  const { user } = useContext(AuthContext);
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventDriveLink: "",
    eventFor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
      alert("Unauthorized access");
      return;
    }
    try {
      await addDoc(collection(db, "events"), eventData);
      alert("Event added successfully!");
      setEventData({
        eventName: "",
        eventDescription: "",
        eventDate: "",
        eventDriveLink: "",
        eventFor: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto mt-10 bg-[#1A202C] p-8 rounded-lg shadow-xl text-[#89A3B6]">
        <h2 className="text-3xl font-bold mb-8 text-center">Add Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={eventData.eventName}
              onChange={handleChange}
              required
              className="input input-bordered w-full p-3 bg-[#243E51] text-[#89A3B6] placeholder-[#89A3B6] focus:outline-none focus:ring-2 focus:ring-[#496980]"
            />
          </div>

          <div className="form-control">
            <textarea
              name="eventDescription"
              placeholder="Event Description"
              value={eventData.eventDescription}
              onChange={handleChange}
              required
              rows="4"
              className="textarea textarea-bordered w-full p-3 bg-[#243E51] text-[#89A3B6] placeholder-[#89A3B6] focus:outline-none focus:ring-2 focus:ring-[#496980] resize-none"
            />
          </div>

          <div className="form-control">
            <input
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleChange}
              required
              className="input input-bordered w-full p-3 bg-[#243E51] text-[#89A3B6] focus:outline-none focus:ring-2 focus:ring-[#496980]"
            />
          </div>

          <div className="form-control">
            <input
              type="url"
              name="eventDriveLink"
              placeholder="Drive Link"
              value={eventData.eventDriveLink}
              onChange={handleChange}
              required
              className="input input-bordered w-full p-3 bg-[#243E51] text-[#89A3B6] placeholder-[#89A3B6] focus:outline-none focus:ring-2 focus:ring-[#496980]"
            />
          </div>

          <div className="form-control">
            <select
              name="eventFor"
              value={eventData.eventFor}
              onChange={handleChange}
              required
              className="select select-bordered w-full p-3 bg-[#243E51] text-[#89A3B6] focus:outline-none focus:ring-2 focus:ring-[#496980]"
            >
              <option value="" disabled>Select Audience</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-full mt-8 bg-gradient-to-br from-[#496980] to-[#5C7B92] text-white hover:bg-gradient-to-bl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
