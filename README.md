# Course Tree Search Viewer

A React TypeScript application that allows users to search and visualize course hierarchies in a tree structure. 

## Features

- **Course Search**: Search for courses using a text-based query
- **Tree Visualization**: Display course hierarchies in an organized tree structure
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Type Safety**: Full TypeScript support for better development experience

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.7
- **Styling**: Bootstrap 5.3.8 + React Bootstrap 2.10.10
- **State Management**: TanStack Query (React Query) 5.90.1
- **Testing**: Jest 29.7.0 + React Testing Library 16.3.0
- **Linting**: ESLint 9.36.0

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js) or **yarn**

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd CourseViewer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Testing

Run the test suite:

```bash
npm test
```

## Linting

Check code quality and style:

```bash
npm run lint
```

## Project Structure

```
src/
├── api/
│   └── useCourseTreeSearch.ts    # API hook for course search
├── components/
│   ├── CourseViewer.tsx          # Main search interface
│   ├── CourseTreeViewer.tsx      # Tree visualization component
│   └── _tests_/                  # Component tests
├── assets/                       # Static assets
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles
```

## Usage

1. **Start the application** using `npm run dev`
2. **Enter a search query** in the search input field
3. **Click "Search"** or press Enter to search for courses
4. **View results** displayed in a hierarchical tree structure
5. **Navigate** through the course tree to explore relationships

## Error Handling

The application includes robust error handling for:
- Empty search queries
- Network connectivity issues
- Server errors (4xx and 5xx responses)
- Invalid data structures

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run test suite
