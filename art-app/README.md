# COMP 4513 (Winter 2025)

### Assignment #2: Art Dashboard Project

An interactive, user-friendly web application for exploring and managing art collections, artists, galleries, and genres. Built with React, TailwindCSS, Supabase, and deployed on Vercel.

![Node.js](https://img.shields.io/badge/Node.js-22.13.0-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.49.0-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.0-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Headless UI](https://img.shields.io/badge/Headless%20UI-1.7.0-4A5568?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![FontAwesome](https://img.shields.io/badge/FontAwesome-6.0.0-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)
![ChatGPT](https://img.shields.io/badge/Assisted_with-ChatGPT-412991?style=for-the-badge&logo=openai&logoColor=white)

## Live Demo

Check out the live version [here](https://comp-4513-assignment-2-js.vercel.app/)

## Features

- **Dynamic Filtering:** Search and filter paintings by title, artist, gallery, and year.

- **Interactive Modals:** Detailed views for paintings and artist images.

- **Favorites Management:** Save your favorite artists, paintings, and galleries.

- **Interactive Maps:** View gallery locations through integrated maps (Leaflet).

- **Responsive Design:** Optimized for all device sizes.

## Project Structure

```
art-app/
├── public/                   # Static files served directly, not processed by Vite
│   └── art-images/           # Folder containing images used by the app
│       ├── artists/          # Full-size and thumbnail images for artists
│       ├── paintings/        # Full-size and thumbnail images for paintings
│       └── genres/           # Images representing various genres
├── scripts/                  # Utility scripts for pre-processing or file manipulation
│   └── renameImages.js       # Script for renaming images to match conventions (e.g., renaming for compatibility)
├── src/                      # Source code folder for the React application
│   ├── assets/               # Static assets such as images, logos, fonts used by the app
│   ├── components/           # Reusable React components for modular UI development
│   │   ├── drawers/          # Components related to drawer-based UI interactions (e.g., Favorites Drawer)
│   │   ├── layout/           # Layout-specific components (e.g., Header, Footer)
│   │   ├── modals/           # Components for handling modal pop-ups (e.g., PaintingModal, ArtistModal)
│   │   ├── sections/         # High-level sections of views composed of multiple components
│   ├── services/             # API fetching services for interacting with Supabase or external APIs
│   ├── views/                # Individual views representing distinct pages (e.g., GalleryView, ArtistView)
│   ├── App.jsx               # Main React component that sets up routing and global context
│   ├── main.jsx              # Application entry point used by Vite for rendering the app
│   └── App.css               # Global stylesheet for styling across the application (using TailwindCSS)
├── .gitignore                # Lists files and folders to ignore in version control (e.g., node_modules)
├── eslint.config.js          # Configuration file for ESLint to maintain code quality and consistency
├── index.html                # Main HTML file used by Vite as the application entry point
├── package.json              # Dependencies and scripts configuration file for the React app
├── vite.config.js            # Vite configuration file for setting up plugins and build settings
└── README.md                 # Documentation file describing the project, its purpose, and usage instructions

```

## Acknowledgements

This project was developed with the assistance of **ChatGPT**, an AI language model created by OpenAI.

## Contact

For any issues, feel free to reach out:

- GitHub: [JustinSerrano](https://github.com/JustinSerrano)
- Email: justin.serrano1015@gmail.com
