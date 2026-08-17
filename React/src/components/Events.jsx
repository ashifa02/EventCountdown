import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";
import AddEvent from "./AddEvent";

function Events() {
  const [events, setEvents] = useState([]);
  const [now, setNow] = useState(new Date());

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    api
      .get("events/")
      .then((response) => {
        console.log("EVENTS:", response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(
          "EVENT ERROR:",
          error.response?.data || error
        );
      });
  }, []);

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate countdown
  const getCountdown = (targetDate) => {
    const difference =
      new Date(targetDate).getTime() - now.getTime();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),
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

  // Start editing
  const startEditing = (event) => {
    setEditingId(event.id);
    setEditTitle(event.title);

    // Convert Django ISO date to datetime-local format
    const localDate = new Date(event.target_date);

    const formattedDate = localDate
      .toISOString()
      .slice(0, 16);

    setEditDate(formattedDate);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDate("");
  };

  // Save edited event
  const saveEdit = async (id) => {
    try {
      const response = await api.patch(`events/${id}/`, {
        title: editTitle,
        target_date: editDate,
      });

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? response.data : event
        )
      );

      cancelEditing();
    } catch (error) {
      console.error(
        "UPDATE ERROR:",
        error.response?.data || error
      );

      alert("Failed to update event");
    }
  };

  // Delete event
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

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app">

      <h1>Event Countdown</h1>

      <p>Welcome, {user}!</p>

      <button onClick={handleLogout}>
        Logout
      </button>

      <p className="subtitle">
        Never miss an important moment.
      </p>

      <AddEvent
        onEventAdded={(newEvent) =>
          setEvents((prevEvents) => [
            ...prevEvents,
            newEvent,
          ])
        }
      />

      <div className="events-container">

        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => {

            const countdown =
              getCountdown(event.target_date);

            // EDIT MODE
            if (editingId === event.id) {
              return (
                <div
                  className="event-card"
                  key={event.id}
                >

                  <h2>Edit Event</h2>

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(e.target.value)
                    }
                    placeholder="Event name"
                  />

                  <input
                    type="datetime-local"
                    value={editDate}
                    onChange={(e) =>
                      setEditDate(e.target.value)
                    }
                  />

                  <div className="edit-buttons">

                    <button
                      onClick={() =>
                        saveEdit(event.id)
                      }
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              );
            }

            // NORMAL MODE
            return (
              <div
                className="event-card"
                key={event.id}
              >

                <h2>{event.title}</h2>

                {countdown ? (
                  <div className="countdown">

                    <div>
                      <span>
                        {countdown.days}
                      </span>
                      <small>Days</small>
                    </div>

                    <div>
                      <span>
                        {countdown.hours}
                      </span>
                      <small>Hours</small>
                    </div>

                    <div>
                      <span>
                        {countdown.minutes}
                      </span>
                      <small>Minutes</small>
                    </div>

                    <div>
                      <span>
                        {countdown.seconds}
                      </span>
                      <small>Seconds</small>
                    </div>

                  </div>
                ) : (
                  <p>🎉 Event has arrived!</p>
                )}

                <p className="date">
                  {new Date(
                    event.target_date
                  ).toLocaleString()}
                </p>

                <div className="event-actions">

                  <button
                    className="edit-button"
                    onClick={() =>
                      startEditing(event)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteEvent(event.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}

export default Events;

