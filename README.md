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

## API Integration Notes

The application integrates with the following API endpoints:

- Authentication: `POST https://dev.cobaltfairy.online/api/login`
- Data Fetching: `GET https://dev.cobaltfairy.online/api/posts`
- Form Submission: `POST https://dev.cobaltfairy.online/api/users`

All endpoints require JWT authentication, which is handled through the AuthContext.

For development and evaluation purposes, the application includes fallback mechanisms if the API is unreachable:
- Authentication will work with the provided test credentials
- Mock data is used for the data table if the API is unavailable
- Mock responses are generated for form submissions if the API is unreachable

## Task Implementation Details

### Task 1: Data Fetching and Display Component

- Implemented in `src/components/common/Table/DataTable.jsx`
- Fetches data from the specified API endpoint using Axios
- Displays the data in a table with columns for ID, Title, and Body
- Implements custom sorting functionality on the ID column
- Uses authentication token from the AuthContext for API requests

### Task 2: Create a React Context

- Implemented in `src/context/AuthContext.jsx`
- Manages authentication state including JWT storage and retrieval
- Provides login and logout functionality across the application
- Persists the JWT in localStorage for session maintenance
- Used across components to control access to protected features

### Task 3: Form Submission Component

- Implemented in `src/components/forms/UserForm.jsx`
- Creates a form with fields for name, surname, email, and phone
- Implements form validation and error handling
- Submits data to the API endpoint using the authentication token
- Displays success or error messages based on API responses

### Task 4: Styled Button Component

- Implemented in `src/components/common/Button/Button.jsx`
- Styled with SASS in `src/components/common/Button/Button.scss`
- Implements primary and secondary button variations
- Uses the specified color codes:
  - Primary border: #FF645D
  - Primary background: #FFDAC6
  - Secondary border: #dad2c6
  - Secondary background: #FFF8EF
  - Text color: #000000
- Uses the Inter font family
- Implements hover states that change the background color to the border color

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

- The project uses SASS for styling components
- The application is responsive and works on different screen sizes
- Error handling is implemented for API requests and form submissions
- The code is organized into modular components for better maintainability