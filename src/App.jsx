import './App.css';
import { GrNotes } from 'react-icons/gr';
import Search from './components/Search';
import AddAppointment from './components/AddAppointment';
import appointmentList from './data.json';
import AppointmentInfo from './components/AppointmentInfo';

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <GrNotes className="inline-block text-red-400 align-top" />
        My Projects
      </h1>
      <p className="mb-3">this is a page for my react practice!</p>
      <AddAppointment />
      <Search />

      <ul className="divide-y divide-gray-200">
        {appointmentList.map((appointment) => (
          <AppointmentInfo key={appointment.id} appointment={appointment} />
        ))}
      </ul>
    </div>
  );
}

export default App;
