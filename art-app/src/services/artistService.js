import supabase from './supabaseClient';

export const fetchArtists = async () => {
    const { data, error } = await supabase.from('artists').select('*');
    if (error) {
        console.error('Error fetching artists:', error);
        return [];
    }
    return data;
};
