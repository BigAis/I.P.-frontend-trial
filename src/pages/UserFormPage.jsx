import UserForm from '../components/forms/UserForm';

const UserFormPage = () => {
  return (
    <div className="user-form-page">
      <UserForm />
      <div className="page-description">
        <h3>Task Details:</h3>
        <p>
          This component includes a form with fields for name, surname, email, and phone.
          The form submits the data to the API endpoint using the JWT for authentication.
        </p>
        <p>
          The component uses a separate service for API calls and displays success or error
          messages based on the API response.
        </p>
      </div>
    </div>
  );
};

export default UserFormPage;