import { Loader2, AlertCircle, MapPin, Activity, Briefcase, FileText } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import { formatDateShort } from '../utils/helpers';

export default function AnalyticsPage() {
  const { analytics, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-red-500" strokeWidth={1.5} />
          <p className="mt-3 text-sm font-medium text-red-900">Error loading analytics</p>
          <p className="mt-1 text-xs text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  const { totalInternships, byRegion, byStatus, byIndustry, recentNotes } = analytics || {};

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-20 sm:pb-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Insights and statistics about your internship applications
        </p>
      </div>

      {/* Summary Card */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{totalInternships || 0}</div>
          <div className="mt-1 text-sm text-gray-500">Total Internships</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* By Region */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
            <h2 className="text-base font-semibold text-gray-900">By Region</h2>
          </div>
          <div className="space-y-3">
            {byRegion && byRegion.length > 0 ? (
              byRegion.map((item) => (
                <div key={item.region} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.region}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-gray-900 transition-all"
                        style={{ width: `${(item.count / totalInternships) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-medium text-gray-900">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No data available</p>
            )}
          </div>
        </div>

        {/* By Status */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
            <h2 className="text-base font-semibold text-gray-900">By Status</h2>
          </div>
          <div className="space-y-3">
            {byStatus && byStatus.length > 0 ? (
              byStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.status}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-gray-900 transition-all"
                        style={{ width: `${(item.count / totalInternships) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-medium text-gray-900">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No data available</p>
            )}
          </div>
        </div>

        {/* By Industry */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
            <h2 className="text-base font-semibold text-gray-900">By Industry</h2>
          </div>
          <div className="space-y-3">
            {byIndustry && byIndustry.length > 0 ? (
              byIndustry.map((item) => (
                <div key={item.industry_type} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.industry_type}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-gray-900 transition-all"
                        style={{ width: `${(item.count / totalInternships) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-medium text-gray-900">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No data available</p>
            )}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
            <h2 className="text-base font-semibold text-gray-900">Recent Notes</h2>
          </div>
          <div className="space-y-3">
            {recentNotes && recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div key={note.id} className="rounded-md border border-gray-200 bg-gray-50/50 p-3">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-gray-900">{note.name}</span>
                    <span className="shrink-0 text-xs text-gray-500">
                      {formatDateShort(note.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{note.regionName}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{note.notes}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No notes yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
