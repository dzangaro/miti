import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit2, Save, X, Trash2, Plus } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  timestamp: string;
  author: string;
}

interface CaseNotesProps {
  caseId: string;
  notes: Note[];
  onAddNote: (caseId: string, note: string) => void;
  onUpdateNote: (caseId: string, noteId: string, note: string) => void;
  onDeleteNote: (caseId: string, noteId: string) => void;
}

const CaseNotes = ({ caseId, notes, onAddNote, onUpdateNote, onDeleteNote }: CaseNotesProps) => {
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(caseId, newNote.trim());
      setNewNote('');
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingNote && editContent.trim()) {
      onUpdateNote(caseId, editingNote, editContent.trim());
      setEditingNote(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditContent('');
  };

  const handleDeleteNote = (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDeleteNote(caseId, noteId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add new note */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Textarea
              placeholder="Enter your notes here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
            <Button onClick={handleAddNote} disabled={!newNote.trim()}>
              Add Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing notes */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              No notes yet. Add your first note above.
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{note.author}</span>
                    <span className="mx-2">•</span>
                    <span>{note.timestamp}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditNote(note)}
                      disabled={editingNote === note.id}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {editingNote === note.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-900 whitespace-pre-wrap">
                    {note.content}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CaseNotes;
