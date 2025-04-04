import supabase from './supabaseClient';

export const fetchArtists = async () => {
    const { data, error } = await supabase.from('artists').select('*');
    if (error) {
        console.error('Error fetching artists:', error);
        return [];
    }
    // Sort artists alphabetically by their name
    const sortedData = data.sort((a, b) =>
        a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())
    );

    return sortedData;
};

// Fetch paintings based on artistId
export const fetchPaintingsByArtist = async (artistId) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*, artists(firstName, lastName)')
        .eq('artistId', artistId);

    if (error) {
        console.error('Error fetching paintings:', error);
        return [];
    }

    return data;
};