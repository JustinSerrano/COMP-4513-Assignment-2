import supabase from './supabaseClient';

// Fetch all galleries
export const fetchGalleries = async () => {
    try {
        const { data, error } = await supabase
            .from('galleries')
            .select('galleryId, galleryName, galleryAddress, galleryCity, galleryCountry, galleryWebSite, latitude, longitude');

        if (error) throw new Error(error.message);

        if (!data || data.length === 0) {
            console.warn('No galleries found in the database.');
            return [];
        }

        // Sorting galleries alphabetically by name
        return data.sort((a, b) =>
            a.galleryName.toLowerCase().localeCompare(b.galleryName.toLowerCase())
        );
    } catch (error) {
        console.error('Error fetching galleries:', error.message);
        return [];
    }
};

// Fetch paintings based on galleryId
export const fetchPaintingsByGallery = async (galleryId) => {
    try {
        const { data, error } = await supabase
            .from('paintings')
            .select(`
                paintingId,
                title,
                yearOfWork,
                description,
                imageFileName,
                artists (firstName, lastName)
            `)
            .eq('galleryId', galleryId);

        if (error) throw new Error(error.message);

        if (!data || data.length === 0) {
            console.warn(`No paintings found for galleryId: ${galleryId}`);
            return [];
        }

        return data
    } catch (error) {
        console.error('Error fetching paintings by gallery:', error.message);
        return [];
    }
};
