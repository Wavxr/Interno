import { supabase } from './supabaseClient';

// Fetch analytics data
export const fetchAnalytics = async () => {
  try {
    // Count internships by region
    const { data: byRegion, error: regionError } = await supabase
      .from('internships')
      .select('region_id, region:regions(name)')
      .then(({ data, error }) => {
        if (error) throw error;
        
        const counts = data.reduce((acc, item) => {
          const regionName = item.region?.name || 'Unassigned';
          acc[regionName] = (acc[regionName] || 0) + 1;
          return acc;
        }, {});

        return {
          data: Object.entries(counts).map(([region, count]) => ({
            region,
            count
          })),
          error: null
        };
      });

    if (regionError) throw regionError;

    // Count internships by status
    const { data: byStatus, error: statusError } = await supabase
      .from('internships')
      .select('status')
      .then(({ data, error }) => {
        if (error) throw error;
        
        const counts = data.reduce((acc, item) => {
          acc[item.status] = (acc[item.status] || 0) + 1;
          return acc;
        }, {});

        return {
          data: Object.entries(counts).map(([status, count]) => ({
            status,
            count
          })),
          error: null
        };
      });

    if (statusError) throw statusError;

    // Count internships by industry
    const { data: byIndustry, error: industryError } = await supabase
      .from('internships')
      .select('industry_type')
      .then(({ data, error }) => {
        if (error) throw error;
        
        const counts = data.reduce((acc, item) => {
          acc[item.industry_type] = (acc[item.industry_type] || 0) + 1;
          return acc;
        }, {});

        return {
          data: Object.entries(counts).map(([industry_type, count]) => ({
            industry_type,
            count
          })),
          error: null
        };
      });

    if (industryError) throw industryError;

    // Get total count
    const { count: totalCount, error: countError } = await supabase
      .from('internships')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // Get recent notes
    const { data: recentNotes, error: notesError } = await supabase
      .from('internships')
      .select(`
        id,
        name,
        notes,
        created_at,
        region:regions(name)
      `)
      .not('notes', 'is', null)
      .neq('notes', '')
      .order('created_at', { ascending: false })
      .limit(5);

    if (notesError) throw notesError;

    return {
      totalInternships: totalCount,
      byRegion,
      byStatus,
      byIndustry,
      recentNotes: recentNotes.map(note => ({
        ...note,
        regionName: note.region?.name || 'Unassigned'
      }))
    };
  } catch (error) {
    throw error;
  }
};
