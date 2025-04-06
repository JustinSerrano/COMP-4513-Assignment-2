import supabase from './supabaseClient';

// Fetch all genres from the genres table
export const fetchGenres = async () => {
    try {
        const { data, error } = await supabase
            .from('genres')
            .select(`
                genreId,
                genreName,
                description,
                wikiLink
                `)
            .order('genreName', { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
            console.warn('No genres found.');
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error fetching genres:', error.message);
        return [];
    }
};

// Fetch paintings related to a specific genre
export const fetchPaintingsByGenre = async (genreId) => {
    try {
        const { data, error } = await supabase
            .from('paintingGenres')
            .select(`
                paintings (
                    paintingId,
                    title,
                    yearOfWork,
                    description,
                    imageFileName,
                    artists (firstName,lastName)
                )
            `)
            .eq('genreId', genreId);

        if (error) throw error;

        if (!data || data.length === 0) {
            console.warn(`No paintings found for genreId: ${genreId}`);
            return [];
        }

        // Extract paintings from the nested response
        const paintings = data.map(item => item.paintings);

        return paintings;
    } catch (error) {
        console.error('Error fetching paintings for genre:', error.message);
        return [];
    }
};
