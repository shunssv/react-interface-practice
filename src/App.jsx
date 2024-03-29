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
      <AddAppointment
        onSendAppointment={(myAppointment) =>
          setAppointmentList([...appointmentList, myAppointment])
        }
        lastId={appointmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
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

      <section className="my-9">
        <h1 className="text-4xl">heading</h1>
        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sapiente sed reprehenderit, dolores amet voluptate necessitatibus magni error assumenda commodi, consectetur ducimus nemo! Beatae earum suscipit odit provident explicabo quo.
        Ea enim laboriosam optio, odit quibusdam corporis perferendis ratione non vel harum omnis, architecto libero numquam aspernatur ex alias atque id sunt ipsum quaerat odio, aliquam quisquam a sequi? Pariatur!
        Similique, reiciendis repudiandae hic culpa earum quibusdam. Magnam, eligendi doloremque saepe provident praesentium earum quidem excepturi! Voluptatum minima, harum aliquam, ducimus nisi eligendi necessitatibus quos laborum, itaque dicta animi consequatur?
        Tempora inventore labore officiis provident omnis est quo voluptatem explicabo voluptas molestiae soluta cupiditate modi ipsum neque obcaecati veniam accusamus at necessitatibus quae fugit asperiores, repellat autem sunt. Unde, quae.</p>
      </section>
    </div>
  );
}

export default App;
