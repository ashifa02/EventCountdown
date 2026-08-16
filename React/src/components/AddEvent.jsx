import { useState } from "react";
import api from "../api";

function AddEvent({ onEventAdded }) {
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("events/", {
        title: title,
        target_date: targetDate,
      });

      onEventAdded(response.data);

      setTitle("");
      setTargetDate("");
    } catch (error) {
      console.error(error);
      alert("Failed to add event");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      <input
        type="text"
        placeholder="Event name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="datetime-local"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
        required
      />

      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEvent;