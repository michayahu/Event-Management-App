import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Make sure this path matches your setup!

export default function HostDashboard() {
  // 1. Create a state variable to hold the list of events
  const [events, setEvents] = useState([]);

  // 2. Function to fetch events from Supabase
  const fetchEvents = async () => {
    // Get the currently logged in user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Fetch only the events created by this specific host
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('host_id', user.id);

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data); // Save the data to our state
      }
    }
  };

  // 3. Run fetchEvents automatically when the page loads
  useEffect(() => {
    fetchEvents();
  }, []);

  // 4. Your perfectly written Delete function!
  const deleteEvent = async (eventId) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    } else {
      // Refresh the list after deleting
      fetchEvents();
    }
  };

  // 5. The UI that the user actually sees
  return (
    <div style={{ padding: '20px' }}>
      <h1>Host Dashboard</h1>
      <p>Welcome, Host! Here are your current events:</p>

      {/* Check if there are no events yet */}
      {events.length === 0 ? (
        <p>You haven't created any events yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {/* Loop through the events array and create a card for each one */}
          {events.map((event) => (
            <li key={event.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '5px' }}>
              <h3>{event.title}</h3>
              <p>Date: {new Date(event.event_date).toLocaleDateString()}</p>
              <p>Capacity: {event.max_capacity}</p>
              
              {/* Here is the Delete Button connected to your function */}
              <button 
                onClick={() => deleteEvent(event.id)} 
                style={{ backgroundColor: 'red', color: 'white', marginTop: '10px', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
                Delete Event
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}