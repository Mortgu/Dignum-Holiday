"use client";

import './calendar.scss';

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useEffect, useState } from "react";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
    const [events, setEvents] = useState();
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "", start: null, end: null,
    });

    useEffect(() => {
        fetch('/api/calendar', {
            method: 'GET',
            credentials: "include"
        }).then(response => response.json()).then(data => {
            setEvents(data.map(entry => ({
                ...entry, start: new Date(entry.start), end: new Date(entry.end)
            })))
        });
    }, []);

    const handleSelectSlot = async ({start, end}) => {
        const title = window.prompt("Title: ");
        if (!title) return;

        const response = await fetch('/api/calendar', {
            method: 'POST',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, start, end})
        });

        const newEvent = await response.json();
        setEvents([...events, {...newEvent, start: new Date(newEvent.start), end: new Date(newEvent.end)}]);
    };

    const handleSave = async () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) return;

        const res = await fetch("/api/appointments", {
            method: "POST",
            body: JSON.stringify(newEvent),
            headers: {"Content-Type": "application/json"},
        });

        const saved = await res.json();
        setEvents([
            ...events,
            {...saved, start: new Date(saved.start), end: new Date(saved.end)},
        ]);
        setShowModal(false);
    };

    const handleSelectEvent = async (event, e) => {
        console.log(e.target);

        if (window.confirm(`"${event.title}" wirklich löschen? ${event.id}`)) {
            const response = await fetch(`/api/calendar/${event.id}`, {
                method: 'POST',
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setEvents(events.filter((e) => e.id !== event.id));
            }
        }
    }

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
                onSelectEvent={handleSelectEvent}
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
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
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