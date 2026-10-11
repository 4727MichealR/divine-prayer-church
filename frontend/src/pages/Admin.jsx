
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function Admin() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("churchAdminToken") || ""
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadEvents() {
    const response = await axios.get(`${API_URL}/api/events`);
    setEvents(response.data);
  }

  useEffect(() => {
    loadEvents().catch((error) => {
      console.error("Unable to load events:", error.message);
      setMessage("Unable to load events.");
    });
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }
      );

      const newToken = response.data.token;

      sessionStorage.setItem("churchAdminToken", newToken);
      setToken(newToken);
      setPassword("");
      setMessage("Login successful!");

      await loadEvents();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to connect to the login server."
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleCreateEvent(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      await axios.post(
        `${API_URL}/api/events`,
        { title, description, date, location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");

      await loadEvents();
      setMessage("Church event added successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to add event. Please log in again."
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteEvent(id) {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      await axios.delete(`${API_URL}/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await loadEvents();
      setMessage("Event deleted successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to delete event."
      );
    } finally {
      setBusy(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("churchAdminToken");
    setToken("");
    setPassword("");
    setMessage("You have logged out.");
  }

  return (
    <main className="section admin-page">
      <div className="container">
        <p className="eyebrow">DIVINE PRAYER CHURCH</p>
        <h1>Church Admin Panel</h1>
        <p>Manage your church events.</p>

        {message && <p role="status">{message}</p>}

        {!token ? (
          <form onSubmit={handleLogin} className="admin-form">
            <h2>Admin Login</h2>

            <label htmlFor="admin-email">Admin Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

            <button type="submit" disabled={busy}>
              {busy ? "Please wait..." : "Login"}
            </button>
          </form>
        ) : (
          <>
            <div className="admin-toolbar">
              <h2>Welcome, Admin!</h2>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>

            <form
              onSubmit={handleCreateEvent}
              className="admin-form"
            >
              <h2>Add Church Event</h2>

              <label htmlFor="event-title">Event Title</label>
              <input
                id="event-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />

              <label htmlFor="event-description">Description</label>
              <textarea
                id="event-description"
                rows="4"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />

              <label htmlFor="event-date">Event Date</label>
              <input
                id="event-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />

              <label htmlFor="event-location">Location</label>
              <input
                id="event-location"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="Church hall or other venue"
              />

              <button type="submit" disabled={busy}>
                {busy ? "Saving..." : "Add Event"}
              </button>
            </form>

            <section className="admin-events">
              <h2>Existing Events ({events.length})</h2>

              {events.length === 0 ? (
                <p>No events added yet.</p>
              ) : (
                events.map((event) => (
                  <article className="admin-event" key={event._id}>
                    <div>
                      <h3>{event.title}</h3>
                      <p>
                        {new Date(event.date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      {event.description && <p>{event.description}</p>}
                      {event.location && <p>{event.location}</p>}
                    </div>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      Delete
                    </button>
                  </article>
                ))
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Admin;
