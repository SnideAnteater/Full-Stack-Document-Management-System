# Document Management System

A full-stack document management system built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

✅ **View Documents & Folders**

- Display documents in a responsive table with file type, size, and creation date
- Show folders in a grid layout with document counts
- Visual icons for different file types (PDF, DOCX, TXT, XLSX, PPTX, Images)

✅ **Upload Documents**

- Add new documents by entering file name and selecting type
- Form validation using Zod schema
- No actual file upload required - reads filename and type only

✅ **Create Folders**

- Create new folders to organize documents
- Form validation for folder names
- Track document counts per folder

✅ **Search Functionality**

- Real-time search across documents and folders
- Filter by name with instant results
- Unified search experience

✅ **Full Type Safety**

- TypeScript for all components and utilities
- Zod validation schemas for forms
- Type-safe state management

✅ **Modern UI/UX**

- Clean, responsive design with Tailwind CSS
- Dark mode support
- Modal dialogs for forms
- Smooth transitions and hover effects

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page with state management
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   ├── documents/
│   │   └── DocumentList.tsx  # Document table component
│   ├── folders/
│   │   └── FolderGrid.tsx    # Folder grid component
│   ├── forms/
│   │   ├── DocumentUploadForm.tsx
│   │   └── FolderUploadForm.tsx
│   └── search/
│       └── SearchBar.tsx     # Search input component
├── lib/
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts              # TypeScript types and Zod schemas
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Adding a Document

1. Click the "Add Document" button
2. Enter the document name (e.g., "Report.pdf")
3. Select the document type from the dropdown
4. Click "Add Document" to save

### Creating a Folder

1. Click the "New Folder" button
2. Enter the folder name
3. Click "Create Folder" to save

### Searching

- Type in the search bar to filter documents and folders by name
- Results update in real-time as you type

### Deleting Items

- Click the trash icon next to any document or folder
- Confirm the deletion in the dialog

## Form Validation

All forms include comprehensive validation:

- **Document names** must be 1-255 characters and cannot contain: `< > : " / \ | ? *`
- **Folder names** follow the same naming rules
- **Document type** must be selected from valid options
- Real-time error messages guide users to correct input

## Available Document Types

- PDF
- DOCX (Word documents)
- TXT (Text files)
- XLSX (Excel spreadsheets)
- PPTX (PowerPoint presentations)
- IMAGE (JPG, PNG, GIF, SVG)
- OTHER (All other file types)

## State Management

The application uses React's `useState` and `useMemo` hooks for:

- Managing documents and folders lists
- Real-time search filtering
- Modal state control
- Form submission handling

## Responsive Design

The UI adapts to different screen sizes:

- **Mobile:** Single column layout, stacked actions
- **Tablet:** 2-column folder grid, responsive table
- **Desktop:** 4-column folder grid, full-width table

## Dark Mode

Full dark mode support using Tailwind CSS dark mode classes. Automatically respects system preferences.
