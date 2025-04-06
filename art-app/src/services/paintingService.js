import supabase from './supabaseClient';

// Fetch all artists for dropdown filter
export const fetchArtists = async () => {
    try {
        const { data, error } = await supabase
            .from('artists')
            .select('artistId, firstName, lastName')
            .order('lastName', { ascending: true });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching artists:', error.message);
        return [];
    }
};

// Fetch all galleries for dropdown filter
export const fetchGalleries = async () => {
    try {
        const { data, error } = await supabase
            .from('galleries')
            .select('galleryId, galleryName')
            .order('galleryName', { ascending: true });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching galleries:', error.message);
        return [];
    }
};

// Fetch paintings based on filter criteria
export const fetchPaintingsByFilter = async (filterBy, filterValue, yearRange) => {
    try {
        let query = supabase.from('paintings').select(`
            paintingId,
            title,
            yearOfWork,
            description,
            imageFileName,
            artists (
                firstName,
                lastName
            )
        `);

        // Apply filters based on filter type
        if (filterBy === 'title' && filterValue) {
            query = query.ilike('title', `%${filterValue}%`);
        }

        if (filterBy === 'artist' && filterValue) {
            query = query.eq('artistId', parseInt(filterValue));
        }

        if (filterBy === 'gallery' && filterValue) {
            query = query.eq('galleryId', parseInt(filterValue));
        }

        if (filterBy === 'year') {
            query = query.gte('yearOfWork', yearRange[0]).lte('yearOfWork', yearRange[1]);
        }

        const { data, error } = await query;

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching paintings:', error.message);
        return [];
    }
};
