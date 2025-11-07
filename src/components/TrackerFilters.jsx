import { Search, ArrowUpDown, X } from 'lucide-react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants';

export default function TrackerFilters({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange
}) {
  const hasActiveFilters = searchQuery || statusFilter || priorityFilter;

  const clearFilters = () => {
    onSearchChange('');
    onStatusFilterChange('');
    onPriorityFilterChange('');
  };

  return (
    <div className="mb-6 space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by company, industry, or location..."
          className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-2">
        {/* Sort By */}
        <div className="relative">
          <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none rounded-md border border-gray-300 bg-white pl-9 pr-8 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20 cursor-pointer"
          >
            <option value="recent">Sort: Most Recent</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="priority-high">Sort: Priority (High)</option>
            <option value="priority-low">Sort: Priority (Low)</option>
            <option value="status">Sort: Status</option>
          </select>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20 cursor-pointer"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityFilterChange(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20 cursor-pointer"
        >
          <option value="">All Priorities</option>
          {PRIORITY_OPTIONS.map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
