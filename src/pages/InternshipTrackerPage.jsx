import { useState, useMemo } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { useInternships } from '../hooks/useInternships';
import { useRegions } from '../hooks/useRegions';
import RegionSection from '../components/RegionSection';
import InternshipForm from '../components/InternshipForm';
import TrackerFilters from '../components/TrackerFilters';

export default function InternshipTrackerPage() {
  const { internships, loading, error, updateInternship, removeInternship, addInternship } = useInternships(true);
  const { regions } = useRegions();
  const [showForm, setShowForm] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

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

  // Filter and sort internships
  const filteredAndSortedInternships = useMemo(() => {
    // Flatten all internships from all regions
    const allInternships = Object.values(internships).flat();

    // Apply search filter
    let filtered = allInternships;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(internship => 
        internship.name?.toLowerCase().includes(query) ||
        internship.industry_type?.toLowerCase().includes(query) ||
        internship.address?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(internship => internship.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(internship => internship.priority === priorityFilter);
    }

    // Group by region first
    const groupedByRegion = {};
    filtered.forEach(internship => {
      const regionName = internship.region?.name || 'Unassigned';
      if (!groupedByRegion[regionName]) {
        groupedByRegion[regionName] = [];
      }
      groupedByRegion[regionName].push(internship);
    });

    // Sort internships within each region
    Object.keys(groupedByRegion).forEach(regionName => {
      groupedByRegion[regionName].sort((a, b) => {
        let sortValueA, sortValueB;
        
        switch (sortBy) {
          case 'name':
            return (a.name || '').localeCompare(b.name || '');
          case 'priority-high':
            const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
            sortValueA = priorityOrder[a.priority || 'Medium'];
            sortValueB = priorityOrder[b.priority || 'Medium'];
            return sortValueA - sortValueB;
          case 'priority-low':
            const priorityOrderLow = { 'Low': 0, 'Medium': 1, 'High': 2 };
            sortValueA = priorityOrderLow[a.priority || 'Medium'];
            sortValueB = priorityOrderLow[b.priority || 'Medium'];
            return sortValueA - sortValueB;
          case 'status':
            return (a.status || '').localeCompare(b.status || '');
          case 'recent':
          default:
            return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        }
      });
    });

    return groupedByRegion;
  }, [internships, searchQuery, sortBy, statusFilter, priorityFilter]);

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

  const regionNames = Object.keys(filteredAndSortedInternships).sort();
  const totalCount = Object.values(filteredAndSortedInternships).flat().length;
  const originalCount = Object.values(internships).flat().length;

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

      {/* Filters */}
      {originalCount > 0 && (
        <TrackerFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
        />
      )}

      {/* Results Count */}
      {originalCount > 0 && (searchQuery || statusFilter || priorityFilter) && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {totalCount} of {originalCount} internship{originalCount !== 1 ? 's' : ''}
        </div>
      )}

      {/* Internships by Region */}
      {regionNames.length > 0 ? (
        <div>
          {regionNames.map((regionName) => (
            <RegionSection
              key={regionName}
              regionName={regionName}
              internships={filteredAndSortedInternships[regionName]}
              onUpdateInternship={handleUpdateInternship}
              onEditInternship={handleEditInternship}
              onDeleteInternship={handleDeleteInternship}
            />
          ))}
        </div>
      ) : originalCount > 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-900">No matching internships</p>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or search query
          </p>
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
