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

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = parseInt(e.target.value);
    setNewReminder(prev => ({ ...prev, day: isNaN(day) ? 1 : Math.min(Math.max(day, 1), 31) }));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value);
    setNewReminder(prev => ({ ...prev, month }));
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

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayReminders = reminders.filter(
        reminder => reminder.day === date.getDate() && reminder.month === date.getMonth() + 1
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
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                value={newReminder.day}
                onChange={handleDayChange}
                placeholder="Día"
                min="1"
                max="31"
                className="w-1/2 p-2 border rounded"
                required
              />
              <select
                value={newReminder.month}
                onChange={handleMonthChange}
                className="w-1/2 p-2 border rounded"
                required
              >
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
            <button type="submit" className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full">
              Agregar Recordatorio
            </button>
          </form>

          {reminders.length > 0 ? (
            <ul className="reminder-list">
              {reminders.map((reminder, index) => (
                <li key={reminder.id} className="reminder-item mb-4 p-4 border rounded relative">
                  <span className="absolute top-2 right-2 bg-[#04d9b2] text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="font-bold">{`${reminder.day}/${reminder.month}`}</p>
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
