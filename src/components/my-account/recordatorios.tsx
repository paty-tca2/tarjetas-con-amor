import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Reminder {
  id: string;
  date: Date;
  text: string;
  name: string;
}

const Recordatorios: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    date: new Date(),
    text: '',
    name: '',
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setNewReminder(prev => ({ ...prev, date }));
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
    setNewReminder({ date: selectedDate, text: '', name: '' });
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayReminders = reminders.filter(
        reminder => reminder.date.toDateString() === date.toDateString()
      );
      if (dayReminders.length > 0) {
        return <div className="dot"></div>;
      }
    }
    return null;
  };

  return (
    <div className="recordatorios-container font-geometos text-[#5D60a6]">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Recordatorios</h2>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="md:w-1/2 flex justify-center">
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                handleDateChange(value);
              }
            }}
            value={selectedDate}
            tileContent={tileContent}
            className="w-full max-w-md"
          />
        </div>
        
        <div className="md:w-1/2">
          <form onSubmit={handleAddReminder} className="mb-6">
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
              placeholder="Ocasión"
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <button type="submit" className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full">
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
            <p className="text-center text-xl font-geometos text-[#5D60a6]">No hay recordatorios guardados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recordatorios;
