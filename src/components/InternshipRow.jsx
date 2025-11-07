import { useState } from 'react';
import { Building2, MapPin, User, Pencil, Trash2, MessageSquare, Users } from 'lucide-react';
import { STATUS_COLORS, STATUS_OPTIONS } from '../utils/constants';

export default function InternshipRow({ internship, onUpdate, onDelete, onEdit }) {
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  
  const { 
    id, 
    name, 
    industry_type, 
    point_of_contacts = [], 
    address, 
    status, 
    notes
  } = internship;

  const contacts = Array.isArray(point_of_contacts) ? point_of_contacts : [];

  const handleStatusChange = (e) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    // Directly update without opening the form
    onUpdate({ ...internship, status: newStatus });
  };

  return (
    <>
      <tr className="group border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
        {/* Company Name */}
        <td className="px-3 py-2 w-[18%] md:w-[18%]">
          <div className="font-medium text-gray-900 text-sm truncate">{name}</div>
        </td>

        {/* Industry - Hidden on mobile */}
        <td className="hidden md:table-cell px-2 py-2 w-[12%]">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Building2 className="h-3.5 w-3.5 text-gray-400 shrink-0" strokeWidth={1.5} />
            <span className="truncate">{industry_type}</span>
          </div>
        </td>

        {/* Location */}
        <td className="px-3 py-2 w-[22%] md:w-[22%]">
          {address ? (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" strokeWidth={1.5} />
              <span className="truncate">{address}</span>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">—</span>
          )}
        </td>

        {/* Contacts Button */}
        <td className="px-2 py-2 w-[14%] md:w-[14%]">
          <button
            onClick={() => setShowContactsModal(true)}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Users className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            <span className="hidden sm:inline">{contacts.length > 0 ? `${contacts.length}` : 'None'}</span>
          </button>
        </td>

        {/* Notes Button */}
        <td className="px-2 py-2 w-[14%] md:w-[14%]">
          <button
            onClick={() => setShowNotesModal(true)}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            <span className="hidden sm:inline">{notes ? 'View' : 'None'}</span>
          </button>
        </td>

        {/* Status Dropdown - Moved to end */}
        <td className="px-2 py-2 w-[14%] md:w-[14%]">
          <select
            value={status}
            onChange={handleStatusChange}
            onClick={(e) => e.stopPropagation()}
            className={`w-full text-xs font-medium rounded-md border px-2 py-1.5 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${STATUS_COLORS[status] || STATUS_COLORS['Not Applied']}`}
          >
            {STATUS_OPTIONS.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </td>

        {/* Actions */}
        <td className="px-2 py-2 w-[6%] md:w-[6%]">
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(internship)}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              title="Edit"
            >
              <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete "${name}"?`)) {
                  onDelete(id);
                }
              }}
              className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </td>
      </tr>

      {/* Contacts Modal */}
      {showContactsModal && (
        <tr>
          <td colSpan="7" className="p-0">
            <div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowContactsModal(false)}
            >
              <div 
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
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
          </td>
        </tr>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <tr>
          <td colSpan="7" className="p-0">
            <div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowNotesModal(false)}
            >
              <div 
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6"
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
          </td>
        </tr>
      )}
    </>
  );
}

