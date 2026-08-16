import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";
import AddEvent from "./AddEvent";

function Events() {
  const [events, setEvents] = useState([]);
  const [now, setNow] = useState(new Date());

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("events/")
      .then((response) => {
        console.log("EVENTS:", response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("EVENT ERROR:", error.response?.data || error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCountdown = (targetDate) => {
    const difference = new Date(targetDate).getTime() - now.getTime();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app">

      <h1>Event Countdown</h1>

      <p>Welcome, {user}!</p>

      <button onClick={handleLogout}>Logout</button>

      <p className="subtitle">
        Never miss an important moment.
      </p>

      <AddEvent
  onEventAdded={(newEvent) =>
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }
/>

      <div className="events-container">

        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => {
            const countdown = getCountdown(event.target_date);

            const deleteEvent = async (id) => {
  try {
    await api.delete(`events/${id}/`);

    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== id)
    );
  } catch (error) {
    console.error(error);
    alert("Failed to delete event");
  }
};

            return (
              <div className="event-card" key={event.id}>

                <h2>{event.title}</h2>

                {countdown ? (
                  <div className="countdown">

                    <div>
                      <span>{countdown.days}</span>
                      <small>Days</small>
                    </div>

                    <div>
                      <span>{countdown.hours}</span>
                      <small>Hours</small>
                    </div>

                    <div>
                      <span>{countdown.minutes}</span>
                      <small>Minutes</small>
                    </div>

                    <div>
                      <span>{countdown.seconds}</span>
                      <small>Seconds</small>
                    </div>

                  </div>
                ) : (
                  <p>🎉 Event has arrived!</p>
                )}

                <p className="date">
                  {new Date(event.target_date).toLocaleString()}
                </p>

                <button onClick={() => deleteEvent(event.id)}>
  Delete
</button>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}

export default Events;