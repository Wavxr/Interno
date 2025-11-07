import { useState } from 'react';
import { FileText, Save, X } from 'lucide-react';

export default function NotesEditor({ notes, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes || '');

  const handleSave = () => {
    onSave(editedNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedNotes(notes || '');
    setIsEditing(false);
  };

  if (!isEditing && !notes) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50/50 px-3 py-2 text-left text-xs text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50"
      >
        <FileText className="mr-1.5 inline-block h-3 w-3" strokeWidth={1.5} />
        Add notes...
      </button>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editedNotes}
          onChange={(e) => setEditedNotes(e.target.value)}
          placeholder="Add notes about this internship..."
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          rows={3}
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-800"
          >
            <Save className="h-3 w-3" strokeWidth={1.5} />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <X className="h-3 w-3" strokeWidth={1.5} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="mb-1 text-xs font-medium text-gray-500">
        <FileText className="mr-1 inline-block h-3 w-3" strokeWidth={1.5} />
        Notes
      </div>
      <div className="whitespace-pre-wrap wrap-break-word">{notes}</div>
    </div>
  );
}
