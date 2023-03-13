import './App.css';
import { GrNotes } from 'react-icons/gr';
import Search from './components/Search';
import AddAppointment from './components/AddAppointment';
import AppointmentInfo from './components/AppointmentInfo';
import { useState, useEffect, useCallback } from 'react';

function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState('');
  let [sortBy, setSortBy] = useState('petName');
  let [orderBy, setOrderBy] = useState('asc');

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === 'asc' ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  //keep track of Data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <GrNotes className="inline-block text-red-400 align-top" />
        My Projects
      </h1>
      <p className="mb-3">this is a page for my react practice!</p>
      <AddAppointment />
      <Search
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        onSortByChange={(mySort) => setSortBy(mySort)}
        sortBy={sortBy}
        onOrderByChange={(myOrder) => setOrderBy(myOrder)}
      />

      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={(appointmentId) =>
              setAppointmentList(
                appointmentList.filter(
                  (appointment) => appointment.id !== appointmentId
                )
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
