
import { useState } from 'react';

interface Note {
  id: string;
  content: string;
  timestamp: string;
  author: string;
}

interface Case {
  id: string;
  sensorType: string;
  riskType: string;
  severity: string;
  location: string;
  policyNumber: string;
  createdAt: string;
  status: string;
  assignedTo: string;
  insuredName: string;
  coverage: string;
  underwriter: string;
  agent: string;
  notes: Note[];
}

const generateMockCases = (): Case[] => {
  const sensorTypes = ['Water Leak Sensor', 'Temperature Sensor', 'Telematics Sensor', 'Motion Sensor'];
  const riskTypes = ['Water Leak', 'Temperature Anomaly', 'Vehicle Impact', 'Unauthorized Access'];
  const severities = ['Critical', 'High', 'Medium', 'Low'];
  const statuses = ['Open', 'In Progress', 'Resolved'];
  const locations = [
    '123 Main St, Kitchen', 
    '456 Oak Ave, Basement', 
    '789 Pine Rd, Garage',
    '321 Elm St, Living Room',
    '654 Maple Dr, Attic'
  ];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `CASE-${String(i + 1).padStart(4, '0')}`,
    sensorType: sensorTypes[Math.floor(Math.random() * sensorTypes.length)],
    riskType: riskTypes[Math.floor(Math.random() * riskTypes.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    policyNumber: `POL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    assignedTo: ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Brown'][Math.floor(Math.random() * 4)],
    insuredName: ['Robert Williams', 'Jennifer Davis', 'Michael Wilson', 'Elizabeth Garcia'][Math.floor(Math.random() * 4)],
    coverage: ['Standard Homeowners', 'Premium Property', 'Basic Dwelling', 'Comprehensive'][Math.floor(Math.random() * 4)],
    underwriter: ['Amanda Parker', 'David Rodriguez', 'Carol Thompson', 'James Anderson'][Math.floor(Math.random() * 4)],
    agent: ['Agent Alpha', 'Agent Beta', 'Agent Gamma', 'Agent Delta'][Math.floor(Math.random() * 4)],
    notes: []
  }));
};

export const useCases = () => {
  const [cases, setCases] = useState<Case[]>(generateMockCases());
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const addNote = (caseId: string, noteContent: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent,
      timestamp: new Date().toLocaleString(),
      author: 'Current User' // In a real app, this would come from auth context
    };

    setCases(prevCases =>
      prevCases.map(c =>
        c.id === caseId
          ? { ...c, notes: [...c.notes, newNote] }
          : c
      )
    );

    if (selectedCase?.id === caseId) {
      setSelectedCase(prev => prev ? { ...prev, notes: [...prev.notes, newNote] } : null);
    }
  };

  const updateNote = (caseId: string, noteId: string, noteContent: string) => {
    setCases(prevCases =>
      prevCases.map(c =>
        c.id === caseId
          ? {
              ...c,
              notes: c.notes.map(note =>
                note.id === noteId
                  ? { ...note, content: noteContent, timestamp: new Date().toLocaleString() }
                  : note
              )
            }
          : c
      )
    );

    if (selectedCase?.id === caseId) {
      setSelectedCase(prev =>
        prev
          ? {
              ...prev,
              notes: prev.notes.map(note =>
                note.id === noteId
                  ? { ...note, content: noteContent, timestamp: new Date().toLocaleString() }
                  : note
              )
            }
          : null
      );
    }
  };

  const deleteNote = (caseId: string, noteId: string) => {
    setCases(prevCases =>
      prevCases.map(c =>
        c.id === caseId
          ? { ...c, notes: c.notes.filter(note => note.id !== noteId) }
          : c
      )
    );

    if (selectedCase?.id === caseId) {
      setSelectedCase(prev =>
        prev
          ? { ...prev, notes: prev.notes.filter(note => note.id !== noteId) }
          : null
      );
    }
  };

  return {
    cases,
    selectedCase,
    setSelectedCase,
    addNote,
    updateNote,
    deleteNote
  };
};
