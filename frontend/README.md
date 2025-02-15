# Project Name

A brief description of your project, explaining what it does and its purpose.

## Table of Contents

- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [License](#license)

---

## Frontend

This is the frontend part of the project, built using **React**.

### Live Demo  
You can check out the live version of the application here:  
(https://solik003.github.io/kanban-test-app/)  

### Features

- **Responsive design** for different screen sizes.
- **User authentication** with JWT tokens.
- **Dynamic data loading** via API requests.
- **Interactive UI** using **Material-UI** for components and styling.
- **Drag-and-Drop Functionality** with **React Beautiful DnD**.
- **Debounced Search** for efficient list filtering.
- **CRUD Operations** for tasks/cards/posts.
- **Error Handling and Validation** with **Formik** and **Yup**.
- **API Integration** for all data interactions.
- **Unit Testing** for component testing using **Jest** and **React Testing Library**.

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (>=v14)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd your-project
2. Navigate to the frontend directory:
   cd frontend
3. Install the dependencies:
  npm install
4. Create a .env file and add your API endpoint:
  REACT_APP_API_URL=http://localhost:3000/api
5. Run the frontend application:
  npm run dev

The application should now be running on http://localhost:5173.

Folder Structure

frontend/
├── src/
│   ├── assets/                  # Images.
│   │   └── logo.png
│   ├── components/              # Reusable UI components (buttons, cards, etc.)
│   │   ├── BoardItem.tsx
│   │   ├── BoardTable.tsx
│   │   ├── CardItem.tsx
│   │   ├── CreateUpdateBoardModal.tsx
│   │   ├── ListItem.tsx
│   │   ├── ListModal.tsx

│   ├── containers/              # "Pages" or "Views" 
│   │   └── BoardList.tsx
│   │   └── KanbanBoard.tsx
│   ├── redux/                   # Redux slices, actions, reducers
│   │   ├── slices/
│   │   │   └── boardSlice.ts
│   │   │   └── cardSlice.ts
│   │   │   └── listSlice.ts
│   │   ├── selectors/
│   │   │   └── boardSelectors.ts
│   │   │   └── cardSelectors.ts
│   │   │   └── listSelectors.ts
│   │   └── store
│   │   │   └── store.ts
│   │   └── hooks.ts
│   ├── types/ 
│   │   ├── modals/                  # TypeScript types/interfaces
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── App.tsx                  # Main App component
│   ├── App.css                  
│   ├── constants.ts                  # Constants for test
│   ├── vite-env.d.ts                  # Main App component
│   ├── main.tsx                # Entry point (renders App into the DOM)
└── .gitignore                   # Git ignore file
└── package.json                 # Project dependencies and scripts
└── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation

## Features

### 1. **Responsive Design**
   - The application is designed to be fully responsive, ensuring a seamless user experience across all devices and screen sizes.
   - Implemented using **CSS Grid**, **Flexbox**, and **Tailwind CSS** for fast and efficient layout changes.


### 4. **CRUD Operations**
   - Allows users to **create**, **read**, **update**, and **delete** records (e.g., tasks, cards, posts) directly from the UI.
   - Built-in modal dialogs for adding/editing records, with validation for input fields.


### 6. **Search**
   - **Debounced Search** feature for quick filtering of large lists and results.

### 7. **Drag-and-Drop Functionality**
   - Integrated **React Beautiful DnD** for drag-and-drop interactions within the UI (e.g., card lists, task assignments).
   - Intuitive interface for rearranging items dynamically.

### 8. **Responsive Navigation**
   - A **collapsible sidebar** that adapts based on the screen size (mobile-first design).
   - Easy navigation with **React Router** to switch between pages without full page reloads.


### 12. **Error Handling and Validation**
   - Proper error messages are displayed for failed actions (e.g., API failures, form validation).
   - Form validation is done using **Formik** and **Yup** to ensure that the data submitted is correct.

### 13. **API Integration**
   - Integrated with the backend API for fetching and submitting data, including authentication and CRUD operations.
   - All API calls are made through a dedicated service layer using **Axios**.

### 14. **Unit Testing**
   - All components are **unit-tested** using **Jest** and **React Testing Library**.
   - Includes tests for API calls, component rendering, and interaction handling.
