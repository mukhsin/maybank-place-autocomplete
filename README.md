# Maybank Place Autocomplete

A React + TypeScript application that provides a place autocomplete search interface for locations across Indonesia, Malaysia, and Singapore.

## Project Summary

This application demonstrates a place search service with autocomplete functionality, displaying detailed place information and geographic coordinates. It features a modern, responsive interface built with React 19, TypeScript, Ant Design, and Redux Toolkit.

### Key Features

- **Autocomplete Search**: Real-time place search with 500ms debouncing for optimal performance
- **Place Predictions**: Shows matching places with main text and secondary address text
- **Detailed Place Information**: Displays place name, full address, types, and coordinates
- **Map Coordinates View**: Shows latitude and longitude for selected places
- **Loading States**: Visual feedback during search operations
- **Error Handling**: User-friendly error messages and notifications
- **Responsive Layout**: Mobile-first design using Ant Design grid system

### Technology Stack

- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool and dev server
- **Ant Design 6** - UI component library
- **Redux Toolkit 2** - State management
- **Biome 2** - Linting and formatting

### Current Implementation

The application uses **mock data** with 10 predefined locations across Southeast Asia:
- **Singapore**: Marina Bay Sands, Merlion Park, Gardens by the Bay, Suntec City
- **Malaysia**: Petronas Twin Towers, Batu Caves, Central Market Kuala Lumpur
- **Indonesia**: Borobudur Temple, Tanah Lot Temple, Uluwatu Temple

The mock data includes realistic place information including names, formatted addresses, geographic coordinates, and place types (tourist attractions, shopping malls, parks, etc.).

### Architecture

- **Single Store**: Redux store with `places` slice managing search state
- **Async Thunks**: `searchPlacePredictions` and `fetchPlaceDetailsThunk` for simulated API calls
- **Component Structure**: Modular components with clear separation of concerns
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maybank-place-autocomplete
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Build for Production

Build the application:
```bash
npm run build
```

The optimized production files will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint code with Biome |
| `npm run check` | Check and fix code with Biome |
| `npm run format` | Format code with Biome |
| `npm run type-check` | Run TypeScript type checking |

### Using the Application

1. **Search for a place**: Type in the search bar (e.g., "Marina", "Petronas", "Borobudur")
2. **Select a place**: Click on a prediction from the dropdown
3. **View details**: The selected place's information and coordinates will be displayed

### Code Quality Tools

The project uses **Biome** for linting and formatting:

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header
│   ├── MainLayout.tsx  # Main layout wrapper
│   ├── MapContainer.tsx # Map/coordinates display
│   ├── PlaceCard.tsx   # Place details card
│   └── Search.tsx      # Search with autocomplete
├── store/              # Redux state management
│   ├── hooks.ts        # Typed Redux hooks
│   ├── index.ts        # Store configuration
│   ├── slices/         # Redux slices
│   │   ├── index.ts    # Slice exports
│   │   └── placesSlice.ts # Places state management
│   └── thunks/         # Async thunks
│       ├── index.ts    # Thunk exports
│       └── placesThunk.ts # Place search thunks
├── types/              # TypeScript type definitions
│   ├── index.ts        # Type exports
│   └── place.ts        # Place-related types
├── utils/              # Utility functions
│   ├── constants.ts    # Mock data and constants
│   ├── debounce.ts     # Debounce utility
│   └── index.ts        # Utility exports
├── App.tsx             # Root component
└── main.tsx            # Application entry point
```

## Future Enhancements

- Integrate with Google Places API for real place data
- Add interactive map visualization (Google Maps, Leaflet)
- Implement proper API error handling and retry logic
- Add unit tests for components and thunks
- Implement routing for multiple views if needed
- Add more place categories and filtering options

## License

Private
