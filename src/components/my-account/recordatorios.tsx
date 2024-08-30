import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Reminder {
  id: string;
  date: Date;
  text: string;
  name: string; // Add name to the Reminder interface
}

const Recordatorios: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    date: new Date(),
    text: '',
    name: '', // Add name to the newReminder state
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setNewReminder(prev => ({ ...prev, date }));
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReminder(prev => ({ ...prev, text: e.target.value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReminder(prev => ({ ...prev, name: e.target.value }));
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setReminders(prev => [...prev, { id, ...newReminder }]);
    setNewReminder({ date: new Date(), text: '', name: '' }); // Reset name as well
  };

  return (
    <div className="recordatorios-container font-geometos text-[#5D60a6]">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Recordatorios</h2>
      
      <form onSubmit={handleAddReminder} className="mb-6">
        <div className="mb-4">
          <DatePicker
            selected={newReminder.date}
            onChange={handleDateChange}
            className="w-full p-2 border rounded"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <input
          type="text"
          value={newReminder.name}
          onChange={handleNameChange}
          placeholder="Nombre"
          className="w-full mb-2 p-2 font-geometos border rounded"
          required
        />
        <input
          type="text"
          value={newReminder.text}
          onChange={handleTextChange}
          placeholder="Recordatorio"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded w-full">
          Agregar Recordatorio
        </button>
      </form>

      {reminders.length > 0 ? (
        <ul className="reminder-list">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="reminder-item mb-4 p-4 border rounded">
              <p className="font-bold">{reminder.date.toLocaleDateString()}</p>
              <p className="font-semibold">{reminder.name}</p>
              <p>{reminder.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-xl font-geometos text-[#5D60a6]">No hay recordatorios guardados.</p>
      )}
    </div>
  );
};

export default Recordatorios;
