import { useState } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { useInternships } from '../hooks/useInternships';
import { useRegions } from '../hooks/useRegions';
import RegionSection from '../components/RegionSection';
import InternshipForm from '../components/InternshipForm';

export default function InternshipTrackerPage() {
  const { internships, loading, error, updateInternship, removeInternship, addInternship } = useInternships(true);
  const { regions } = useRegions();
  const [showForm, setShowForm] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);

  const handleUpdateInternship = async (internship) => {
    // Direct update (e.g., status change) without opening form
    try {
      // Extract only the fields that exist in the database table
      const { region, ...updateData } = internship;
      await updateInternship(internship.id, updateData);
    } catch (err) {
      alert('Failed to update internship: ' + err.message);
    }
  };

  const handleEditInternship = (internship) => {
    // Open form for full edit
    setEditingInternship(internship);
    setShowForm(true);
  };

  const handleDeleteInternship = async (id) => {
    try {
      await removeInternship(id);
    } catch (err) {
      alert('Failed to delete internship: ' + err.message);
    }
  };

  const handleFormSubmit = async (idOrData, updates) => {
    try {
      if (editingInternship) {
        // Editing existing internship
        await updateInternship(idOrData, updates);
      } else {
        // Creating new internship
        await addInternship(idOrData);
      }
      setShowForm(false);
      setEditingInternship(null);
    } catch (err) {
      alert('Failed to save internship: ' + err.message);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingInternship(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-gray-500">Loading internships...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-red-500" strokeWidth={1.5} />
          <p className="mt-3 text-sm font-medium text-red-900">Error loading data</p>
          <p className="mt-1 text-xs text-red-700">{error}</p>
          <p className="mt-4 text-xs text-red-600">
            Make sure you've configured your Supabase credentials in the .env file
          </p>
        </div>
      </div>
    );
  }

  const regionNames = Object.keys(internships).sort();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-20 sm:pb-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Internship Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your internship applications
          </p>
        </div>
        <button
          onClick={() => {
            setEditingInternship(null);
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          New Internship
        </button>
      </div>

      {/* Internships by Region */}
      {regionNames.length > 0 ? (
        <div>
          {regionNames.map((regionName) => (
            <RegionSection
              key={regionName}
              regionName={regionName}
              internships={internships[regionName]}
              onUpdateInternship={handleUpdateInternship}
              onEditInternship={handleEditInternship}
              onDeleteInternship={handleDeleteInternship}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-900">No internships yet</p>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first internship
          </p>
          <button
            onClick={() => {
              setEditingInternship(null);
              setShowForm(true);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            Add Internship
          </button>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <InternshipForm
          internship={editingInternship}
          regions={regions}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
