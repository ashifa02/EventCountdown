import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events/")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCountdown = (targetDate) => {
    const difference = new Date(targetDate) - now;

    if (difference <= 0) {
      return "🎉 Event has arrived!";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    return `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
  };

  return (
    <div>
      <h1>Event Countdown</h1>

      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{getCountdown(event.target_date)}</p>
        </div>
      ))}
    </div>
  );
}

export default App;