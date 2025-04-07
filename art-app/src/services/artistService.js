/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// artistService.js
// This service handles fetching artist data and paintings from the Supabase database

import supabase from './supabaseClient';

// Fetch all artists
export const fetchArtists = async () => {
    try {
        const { data, error } = await supabase
            .from('artists')
            .select('artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink');

        if (error) throw new Error(error.message);

        if (!data || data.length === 0) {
            console.warn('No artists found in the database.');
            return [];
        }

        // Sorting artists by last name, then by first name
        return data.sort((a, b) => {
            const lastNameComparison = a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
            if (lastNameComparison !== 0) return lastNameComparison;
            return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
        });

    } catch (error) {
        console.error('Error fetching artists:', error.message);
        return [];
    }
};

// Fetch paintings by a specific artistId
export const fetchPaintingsByArtist = async (artistId) => {
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
            .eq('artistId', artistId)

        if (error) throw new Error(error.message);

        if (!data || data.length === 0) {
            console.warn(`No paintings found for artistId: ${artistId}`);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error fetching paintings by artist:', error.message);
        return [];
    }
};
