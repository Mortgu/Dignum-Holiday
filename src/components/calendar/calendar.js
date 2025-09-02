"use client";

import './calendar.scss';

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useState } from "react";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
    const [events, setEvents] = useState();
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "", start: null, end: null,
    });

    const handleSelectSlot = ({start, end}) => {
        /*const title = window.prompt("Termin-Titel:");
        if (title) {
            setEvents([...events, {start, end, title}]);
        }*/

        setNewEvent({ title: "", start, end });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) return;

        const res = await fetch("/api/appointments", {
            method: "POST",
            body: JSON.stringify(newEvent),
            headers: { "Content-Type": "application/json" },
        });

        const saved = await res.json();
        setEvents([
            ...events,
            { ...saved, start: new Date(saved.start), end: new Date(saved.end) },
        ]);
        setShowModal(false);
    };

    return (
        <div className="h-[600px]">
            <Calendar
                localizer={localizer}
                events={events}
                selectable
                onSelectSlot={handleSelectSlot}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500}}
            />

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Neuen Termin erstellen</h2>
                        <p>{JSON.stringify(newEvent.start)}</p>
                        <p>{JSON.stringify(newEvent.end)}</p>
                        <input
                            type="text"
                            placeholder="Titel"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            className="w-full border p-2 rounded mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Speichern
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}