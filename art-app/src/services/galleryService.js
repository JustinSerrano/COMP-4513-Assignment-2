import supabase from './supabaseClient';

export const fetchGalleries = async () => {
    const { data, error } = await supabase.from('galleries').select('*');
    if (error) {
        console.error('Error fetching galleries:', error);
        return [];
    }
    
    // Sort galleries alphabetically by their name
    const sortedData = data.sort((a, b) =>
        a.galleryName.toLowerCase().localeCompare(b.galleryName.toLowerCase())
    );

    return sortedData;
};

// Fetch paintings based on galleryId
export const fetchPaintingsByGallery = async (galleryId) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*, artists(firstName, lastName)')
        .eq('galleryId', galleryId);

    if (error) {
        console.error('Error fetching paintings:', error);
        return [];
    }

    return data;
};
