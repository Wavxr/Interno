import { supabase } from './supabaseClient';

// Fetch all internships with their region data
export const fetchInternships = async () => {
  const { data, error } = await supabase
    .from('internships')
    .select(`
      *,
      region:regions(id, name)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Fetch internships grouped by region
export const fetchInternshipsGroupedByRegion = async () => {
  const { data, error } = await supabase
    .from('internships')
    .select(`
      *,
      region:regions(id, name)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Group by region
  const grouped = data.reduce((acc, internship) => {
    const regionName = internship.region?.name || 'Unassigned';
    if (!acc[regionName]) {
      acc[regionName] = [];
    }
    acc[regionName].push(internship);
    return acc;
  }, {});

  return grouped;
};

// Create a new internship
export const createInternship = async (internshipData) => {
  const { data, error } = await supabase
    .from('internships')
    .insert([internshipData])
    .select(`
      *,
      region:regions(id, name)
    `)
    .single();

  if (error) throw error;
  return data;
};

// Update an existing internship
export const updateInternship = async (id, updates) => {
  const { data, error } = await supabase
    .from('internships')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      region:regions(id, name)
    `)
    .single();

  if (error) throw error;
  return data;
};

// Delete an internship
export const deleteInternship = async (id) => {
  const { error } = await supabase
    .from('internships')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

// Update internship status
export const updateInternshipStatus = async (id, status) => {
  return updateInternship(id, { status });
};

// Update internship notes
export const updateInternshipNotes = async (id, notes) => {
  return updateInternship(id, { notes });
};
