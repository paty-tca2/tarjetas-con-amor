import React, { useState } from 'react';

interface Reminder {
  id: string;
  day: number;
  month: number;
  text: string;
  name: string;
}

const Recordatorios: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    day: 1,
    month: 1,
    text: '',
    name: '',
  });

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewReminder(prev => ({ ...prev, day: parseInt(e.target.value) }));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewReminder(prev => ({ ...prev, month: parseInt(e.target.value) }));
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
    setNewReminder({ day: 1, month: 1, text: '', name: '' });
  };

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="recordatorios-container font-geometos text-[#5D60a6]">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Recordatorios</h2>
      
      <form onSubmit={handleAddReminder} className="mb-6">
        <div className="mb-4 flex space-x-2">
          <select
            value={newReminder.day}
            onChange={handleDayChange}
            className="w-1/2 p-2 border rounded"
          >
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select
            value={newReminder.month}
            onChange={handleMonthChange}
            className="w-1/2 p-2 border rounded"
          >
            {months.map((month, i) => (
              <option key={i + 1} value={i + 1}>{month}</option>
            ))}
          </select>
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
          placeholder="Ocasion"
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
              <p className="font-bold">{`${reminder.day.toString().padStart(2, '0')}/${reminder.month.toString().padStart(2, '0')}`}</p>
              <p className="font-semibold">{reminder.name}</p>
              <p>{reminder.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-xl font-geometos text-[#5D60a6]">No hay recordatorios guardados</p>
      )}
    </div>
  );
};

export default Recordatorios;
