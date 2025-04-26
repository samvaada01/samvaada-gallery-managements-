import { useEffect, useState, useContext } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AboutFea from "./AboutFea/AboutFea";
import Banner from "./Banner/Banner";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const { user } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);

      // Extract unique academic years
      const years = new Set();
      eventsList.forEach(event => {
        const date = new Date(event.eventDate);
        const month = date.getMonth();
        const year = date.getFullYear();
        const academicYear = month >= 6 ? 
          `${year}-${year + 1}` : 
          `${year - 1}-${year}`;
        years.add(academicYear);
      });
      setAcademicYears(Array.from(years).sort().reverse());
      
      // Set default year to most recent
      const mostRecentYear = Array.from(years).sort().reverse()[0];
      setSelectedYear(mostRecentYear);
      filterEventsByYear(mostRecentYear, eventsList);
    };
    fetchEvents();
  }, []);

  const filterEventsByYear = (academicYear, eventList = events) => {
    const [startYear] = academicYear.split('-');
    const startDate = new Date(`${startYear}-07-01`);
    const endDate = new Date(`${parseInt(startYear) + 1}-06-30`);

    const filtered = eventList.filter(event => {
      const eventDate = new Date(event.eventDate);
      return eventDate >= startDate && eventDate <= endDate;
    });

    setFilteredEvents(filtered);
    setSelectedYear(academicYear);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents(events.filter(event => event.id !== id));
      setFilteredEvents(filteredEvents.filter(event => event.id !== id));
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error("Error deleting event");
    }
  };

  // Helper function to handle view click
  const handleViewClick = (e, link) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please login to view event details");
      return false;
    }
    return true;
  };

  return (
    <div className="bg-[#1A202C] text-[#89A3B6] min-h-screen">
      <Banner />
      <div className="mt-10">
        <AboutFea />
      </div>
      <div className="mt-10 px-8">
        <h2 className="text-4xl font-bold text-center mb-6">Events</h2>
        
        {/* Year filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {academicYears.map((year) => (
            <button
              key={year}
              onClick={() => filterEventsByYear(year)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedYear === year
                ? 'bg-gradient-to-br from-[#496980] to-[#5C7B92] text-white'
                : 'bg-[#243E51] text-[#89A3B6] hover:bg-[#2f4d63]'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card bg-[#243E51] shadow-xl text-[#89A3B6] hover:scale-105 transition-transform duration-300">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-2xl font-bold mb-4">{event.eventName}</h3>
                  {user?.email === import.meta.env.VITE_ADMIN_EMAIL && (
                    <div className="relative">
                      <button 
                        onClick={() => setShowMenu(showMenu === event.id ? null : event.id)}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <BiDotsVerticalRounded className="text-xl" />
                      </button>
                      {showMenu === event.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#1A202C] rounded-md shadow-lg z-50">
                          <div className="py-1">
                            <Link
                              to={`/admin/update-event/${event.id}`}
                              className="block px-4 py-2 text-sm hover:bg-[#243E51]"
                            >
                              Update Event
                            </Link>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#243E51]"
                            >
                              Delete Event
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="mb-4">{event.eventDescription}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">{event.eventDate}</p>
                  {user ? (
                    <a
                      href={event.eventDriveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm bg-gradient-to-br from-[#496980] to-[#5C7B92] text-white hover:bg-gradient-to-bl border-none"
                    >
                      View
                    </a>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn-sm bg-gradient-to-br from-[#496980] to-[#5C7B92] text-white hover:bg-gradient-to-bl border-none"
                      onClick={() => toast.error("Please login to view event details")}
                    >
                      View
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 mb-10">
        <h2 className="text-4xl font-bold text-center mb-6">Meet the Team</h2>
        <div className="flex justify-center">
          <img 
            src="/src/assets/images/team.jpg" 
            alt="Our Team" 
            className="rounded-lg shadow-xl w-[300px] md:w-[500px] object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;