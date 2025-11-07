import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import InternshipRow from './InternshipRow';
import InternshipCard from './InternshipCard';

export default function RegionSection({ 
  regionName, 
  internships, 
  onUpdateInternship,
  onEditInternship, 
  onDeleteInternship 
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      {/* Region Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-3 flex w-full items-center gap-2 text-left transition-colors hover:text-gray-600"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
        )}
        <h2 className="text-sm font-semibold text-gray-900">
          {regionName}
          <span className="ml-2 text-xs font-normal text-gray-500">
            ({internships.length})
          </span>
        </h2>
      </button>

      {/* Internships - Card View (Mobile) */}
      {isExpanded && internships.length > 0 && (
        <div className="md:hidden space-y-3">
          {internships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onUpdate={onUpdateInternship}
              onDelete={onDeleteInternship}
              onEdit={onEditInternship}
            />
          ))}
        </div>
      )}

      {/* Internships - Table View (Desktop) */}
      {isExpanded && internships.length > 0 && (
        <div className="hidden md:block rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 w-[18%]">Company</th>
                  <th className="px-2 py-2.5 text-left text-xs font-semibold text-gray-600 w-[12%]">Industry</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 w-[20%]">Location</th>
                  <th className="px-2 py-2.5 text-left text-xs font-semibold text-gray-600 w-[12%]">Contacts</th>
                  <th className="px-2 py-2.5 text-left text-xs font-semibold text-gray-600 w-[12%]">Notes</th>
                  <th className="px-2 py-2.5 text-left text-xs font-semibold text-gray-600 w-[12%]">Priority</th>
                  <th className="px-2 py-2.5 text-left text-xs font-semibold text-gray-600 w-[12%]">Status</th>
                  <th className="px-2 py-2.5 w-[6%]"></th>
                </tr>
              </thead>
              <tbody>
                {internships.map((internship) => (
                  <InternshipRow
                    key={internship.id}
                    internship={internship}
                    onUpdate={onUpdateInternship}
                    onDelete={onDeleteInternship}
                    onEdit={onEditInternship}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {isExpanded && internships.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-4 py-8 text-center">
          <p className="text-sm text-gray-500">No internships in this region yet</p>
        </div>
      )}
    </div>
  );
}
