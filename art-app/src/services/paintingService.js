import supabase from './supabaseClient';

// Fetch all artists (for ArtistView)
export const fetchArtists = async () => {
    const { data, error } = await supabase
        .from('artists')
        .select('artistId, firstName, lastName')
        .order('lastName', { ascending: true });

    if (error) console.error('Error fetching artists:', error.message);
    return data || [];
};

// Fetch all galleries (for GalleryView)
export const fetchGalleries = async () => {
    const { data, error } = await supabase
        .from('galleries')
        .select('galleryId, galleryName, galleryCity, galleryCountry, galleryAddress, galleryNativeName, galleryWebSite, latitude, longitude')
        .order('galleryName', { ascending: true });

    if (error) console.error('Error fetching galleries:', error.message);
    return data || [];
};

// Fetch all genres (for GenreView)
export const fetchGenres = async () => {
    const { data, error } = await supabase
        .from('genres')
        .select('genreId, genreName, description, wikiLink')
        .order('genreName', { ascending: true });

    if (error) console.error('Error fetching genres:', error.message);
    return data || [];
};

// Fetch paintings based on filters (for PaintingsView)
export const fetchPaintingsByFilter = async (filterBy, filterValue, yearRange) => {
    let query = supabase.from('paintings').select(`
        paintingId,
        title,
        yearOfWork,
        description,
        imageFileName,
        artists (firstName, lastName)
    `);

    if (filterBy === 'title' && filterValue) query = query.ilike('title', `%${filterValue}%`);
    if (filterBy === 'artist' && filterValue) query = query.eq('artistId', parseInt(filterValue));
    if (filterBy === 'gallery' && filterValue) query = query.eq('galleryId', parseInt(filterValue));
    if (filterBy === 'year') query = query.gte('yearOfWork', yearRange[0]).lte('yearOfWork', yearRange[1]);

    const { data, error } = await query;

    if (error) console.error('Error fetching paintings:', error.message);
    return data || [];
};

// Fetch a single painting by its paintingId for the PaintingModal
export const fetchPaintingDetails = async (paintingId) => {
    try {
        const { data, error } = await supabase
            .from('paintings')
            .select(`
                paintingId,
                title,
                yearOfWork,
                description,
                imageFileName,
                medium,
                width,
                height,
                copyrightText,
                museumLink,
                wikiLink,
                jsonAnnotations,
                artists (artistId, firstName, lastName),
                galleries (galleryId, galleryName, galleryCity)
            `)
            .eq('paintingId', paintingId)
            .single();

        if (error) throw new Error(error.message);

        if (!data) {
            console.warn(`No painting found for paintingId: ${paintingId}`);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching painting details:', error.message);
        return null;
    }
};

