import { useState } from 'react';
import { Building2, MapPin, User, Pencil, Trash2, MessageSquare, Users, Flag } from 'lucide-react';
import { STATUS_COLORS, STATUS_OPTIONS, PRIORITY_COLORS, PRIORITY_OPTIONS } from '../utils/constants';

export default function InternshipCard({ internship, onUpdate, onDelete, onEdit }) {
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  
  const { 
    id, 
    name, 
    industry_type, 
    point_of_contacts = [], 
    address, 
    status,
    priority = 'Medium',
    notes
  } = internship;

  const contacts = Array.isArray(point_of_contacts) ? point_of_contacts : [];

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onUpdate({ ...internship, status: newStatus });
  };

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    onUpdate({ ...internship, priority: newPriority });
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
        {/* Header with Company Name and Actions */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base truncate">{name}</h3>
            {industry_type && (
              <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
                <Building2 className="h-3.5 w-3.5 text-gray-400 shrink-0" strokeWidth={1.5} />
                <span className="truncate">{industry_type}</span>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => onEdit(internship)}
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              title="Edit"
            >
              <Pencil className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete "${name}"?`)) {
                  onDelete(id);
                }
              }}
              className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Location */}
        {address && (
          <div className="flex items-center gap-1.5 mb-3 text-sm text-gray-600">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" strokeWidth={1.5} />
            <span className="truncate">{address}</span>
          </div>
        )}

        {/* Priority and Status */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
            <select
              value={priority}
              onChange={handlePriorityChange}
              className={`w-full text-xs font-medium rounded-md border px-2 py-1.5 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${PRIORITY_COLORS[priority] || PRIORITY_COLORS['Medium']}`}
            >
              {PRIORITY_OPTIONS.map((pri) => (
                <option key={pri} value={pri}>
                  {pri}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className={`w-full text-xs font-medium rounded-md border px-2 py-1.5 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${STATUS_COLORS[status] || STATUS_COLORS['Not Applied']}`}
            >
              {STATUS_OPTIONS.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contacts and Notes Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowContactsModal(true)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
          >
            <Users className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>Contacts ({contacts.length})</span>
          </button>
          
          <button
            onClick={() => setShowNotesModal(true)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>Notes</span>
          </button>
        </div>
      </div>

      {/* Contacts Modal */}
      {showContactsModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowContactsModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contacts for {name}</h3>
              <button
                onClick={() => setShowContactsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            {contacts.length > 0 ? (
              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{contact.name}</div>
                        {contact.position && (
                          <div className="text-sm text-gray-500 mt-0.5">{contact.position}</div>
                        )}
                        {contact.email && (
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-sm text-blue-600 hover:text-blue-700 hover:underline mt-1 inline-block"
                          >
                            {contact.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No contacts added yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowNotesModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Notes for {name}</h3>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            {notes ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No notes added yet.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
