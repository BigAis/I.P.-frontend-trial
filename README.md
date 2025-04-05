# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
-----------------------------------------------------
# Frontend Developer Technical Trial

This project is a solution for the frontend developer technical trial, showcasing React components that fetch and display data, implement authentication using React Context, handle form submissions, and create styled components using SASS.

## Project Structure

The project is organized into the following components:

1. **Data Fetching and Display Component**: A table component that fetches data from an API and displays it with sortable columns.
2. **AuthContext**: A React Context for handling authentication state across components.
3. **Form Submission Component**: A form for collecting user information and submitting it to an API.
4. **Styled Button Component**: A customizable button component styled with SASS.

## Installation

To set up and run this project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── assets/            # For static assets
├── components/
│   ├── common/        # Reusable UI components
│   │   ├── Button/    # Button component with its styles
│   │   └── Table/     # Table related components
│   ├── auth/          # Authentication components
│   └── forms/         # Form components
├── context/           # React Context files
├── layouts/           # Layout components
├── pages/             # Page components
├── services/          # API services
├── styles/            # Global styles
├── App.jsx            # Main App component
└── main.jsx           # Entry point
```

## Dependencies

This project uses the following main dependencies:

- React 18.2.0
- Vite 5.0.0
- Axios 1.6.2
- Sass 1.69.5
- Prop-Types 15.8.1

## Tasks Implementation Details

### Task 1: Data Fetching and Display Component

- Implemented a React component that fetches data from the specified API endpoint.
- Displays the data in a table with columns for ID, Title, and Body.
- Implements custom sorting functionality on the ID column.
- Uses authentication token from the AuthContext for API requests.

### Task 2: Create a React Context

- Created an AuthContext to manage authentication state across components.
- Implemented an AuthProvider component that handles JWT storage and retrieval.
- Provides login and logout functionality.
- Persists the JWT in localStorage for session persistence.

### Task 3: Form Submission Component

- Created a form with fields for name, surname, email, and phone.
- Implemented form validation and error handling.
- Uses the AuthContext to retrieve the JWT for authenticated API requests.
- Created a separate service for API interactions.
- Displays success or error messages based on API responses.

### Task 4: Styled Button Component

- Created a reusable button component with SASS styling.
- Implemented primary and secondary button variations.
- Used the specified color codes for styling.
- Incorporated hover states that change the background color to the border color.
- Added the Inter font family as specified.

## Usage

### Login

The application starts with a login screen. Use the following credentials to log in:

- Username: `dev1`
- Password: `12cf#$!34`

After successful login, you'll be able to access the data table and submit the user form.

### Data Table

Navigate to the Data Table tab to see the fetched data displayed in a table format. Click on the ID header to sort the table by ID.

### User Form

Navigate to the User Form tab to submit user information. Fill in the required fields and click Submit. You'll see a success message with the ID and name if the submission is successful.

### Styled Buttons

Navigate to the Styled Buttons tab to see examples of the styled button component with primary and secondary variations.

## Additional Notes

- The project uses SASS for styling components.
- The application is responsive and works on different screen sizes.
- Error handling is implemented for API requests and form submissions.
- The code is organized into modular components for better maintainability.