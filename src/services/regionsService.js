import { supabase } from './supabaseClient';

// Fetch all regions
export const fetchRegions = async () => {
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
};

// Create a new region
export const createRegion = async (regionData) => {
  const { data, error } = await supabase
    .from('regions')
    .insert([regionData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update a region
export const updateRegion = async (id, updates) => {
  const { data, error } = await supabase
    .from('regions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete a region
export const deleteRegion = async (id) => {
  const { error } = await supabase
    .from('regions')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};
