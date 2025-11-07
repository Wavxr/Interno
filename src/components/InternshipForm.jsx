import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { INDUSTRY_TYPES, STATUS_OPTIONS, PRIORITY_OPTIONS, DEFAULT_CONTACT } from '../utils/constants';
import { cleanContacts } from '../utils/helpers';

export default function InternshipForm({ 
  internship = null, 
  regions = [], 
  onSubmit, 
  onClose 
}) {
  const [formData, setFormData] = useState({
    name: '',
    industry_type: 'Company',
    address: '',
    region_id: '',
    status: 'Not Applied',
    priority: 'Medium',
    notes: '',
    point_of_contacts: [{ ...DEFAULT_CONTACT }]
  });

  useEffect(() => {
    if (internship) {
      setFormData({
        name: internship.name || '',
        industry_type: internship.industry_type || 'Company',
        address: internship.address || '',
        region_id: internship.region_id || '',
        status: internship.status || 'Not Applied',
        priority: internship.priority || 'Medium',
        notes: internship.notes || '',
        point_of_contacts: Array.isArray(internship.point_of_contacts) && internship.point_of_contacts.length > 0
          ? internship.point_of_contacts
          : [{ ...DEFAULT_CONTACT }]
      });
    }
  }, [internship]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clean up contacts before submitting
    const cleanedContacts = cleanContacts(formData.point_of_contacts);
    
    const dataToSubmit = {
      ...formData,
      point_of_contacts: cleanedContacts
    };

    if (internship) {
      onSubmit(internship.id, dataToSubmit);
    } else {
      onSubmit(dataToSubmit);
    }
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...formData.point_of_contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setFormData({ ...formData, point_of_contacts: newContacts });
  };

  const addContact = () => {
    setFormData({
      ...formData,
      point_of_contacts: [...formData.point_of_contacts, { ...DEFAULT_CONTACT }]
    });
  };

  const removeContact = (index) => {
    const newContacts = formData.point_of_contacts.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      point_of_contacts: newContacts.length > 0 ? newContacts : [{ ...DEFAULT_CONTACT }]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {internship ? 'Edit Internship' : 'New Internship'}
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="e.g., TechCorp Solutions"
              />
            </div>

            {/* Industry Type & Region */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Industry Type
                </label>
                <select
                  value={formData.industry_type}
                  onChange={(e) => setFormData({ ...formData, industry_type: e.target.value })}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {INDUSTRY_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Region
                </label>
                <select
                  value={formData.region_id}
                  onChange={(e) => setFormData({ ...formData, region_id: e.target.value })}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">Select region...</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="e.g., 123 Tech Ave, Alabang"
              />
            </div>

            {/* Status & Priority */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Application Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {PRIORITY_OPTIONS.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Points of Contact */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Points of Contact
                </label>
                <button
                  type="button"
                  onClick={addContact}
                  className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Plus className="h-3 w-3" strokeWidth={1.5} />
                  Add Contact
                </button>
              </div>

              <div className="space-y-3">
                {formData.point_of_contacts.map((contact, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50/50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Contact {index + 1}
                      </span>
                      {formData.point_of_contacts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeContact(index)}
                          className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={contact.position}
                        onChange={(e) => handleContactChange(index, 'position', e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        placeholder="Position"
                      />
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                placeholder="Any additional notes..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              {internship ? 'Save Changes' : 'Create Internship'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
