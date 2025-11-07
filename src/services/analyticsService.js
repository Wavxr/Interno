import { supabase } from './supabaseClient';

// Fetch analytics data with optimized queries
export const fetchAnalytics = async () => {
  try {
    // Fetch all internships once with minimal fields
    const { data: allInternships, error: fetchError } = await supabase
      .from('internships')
      .select('status, industry_type, region_id, region:regions(name), id, name, notes, created_at');

    if (fetchError) throw fetchError;

    // Calculate all analytics from the single query
    const totalCount = allInternships.length;

    // Count by region
    const regionCounts = allInternships.reduce((acc, item) => {
      const regionName = item.region?.name || 'Unassigned';
      acc[regionName] = (acc[regionName] || 0) + 1;
      return acc;
    }, {});

    const byRegion = Object.entries(regionCounts).map(([region, count]) => ({
      region,
      count
    }));

    // Count by status
    const statusCounts = allInternships.reduce((acc, item) => {
      if (item.status) {
        acc[item.status] = (acc[item.status] || 0) + 1;
      }
      return acc;
    }, {});

    const byStatus = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));

    // Count by industry
    const industryCounts = allInternships.reduce((acc, item) => {
      if (item.industry_type) {
        acc[item.industry_type] = (acc[item.industry_type] || 0) + 1;
      }
      return acc;
    }, {});

    const byIndustry = Object.entries(industryCounts).map(([industry_type, count]) => ({
      industry_type,
      count
    }));

    // Get recent notes (filter and sort in JS from existing data)
    const recentNotes = allInternships
      .filter(item => item.notes && item.notes.trim() !== '')
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(note => ({
        id: note.id,
        name: note.name,
        notes: note.notes,
        created_at: note.created_at,
        regionName: note.region?.name || 'Unassigned'
      }));

    return {
      totalInternships: totalCount,
      byRegion,
      byStatus,
      byIndustry,
      recentNotes
    };
  } catch (error) {
    throw error;
  }
};
