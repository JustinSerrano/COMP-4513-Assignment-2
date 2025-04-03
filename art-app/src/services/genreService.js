import supabase from './supabaseClient';

export const fetchGenres = async () => {
    const { data, error } = await supabase.from('genres').select('*');
    if (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
    return data;
};
