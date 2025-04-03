import supabase from './supabaseClient';

export const fetchPaintings = async () => {
    const { data, error } = await supabase.from('paintings').select('*');
    if (error) {
        console.error('Error fetching paintings:', error);
        return [];
    }
    return data;
};
