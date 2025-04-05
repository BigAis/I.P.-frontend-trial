import DataTable from '../components/common/Table/DataTable';

const DataTablePage = () => {
  return (
    <div className="data-table-page">
      <DataTable />
      <div className="page-description">
        <h3>Task Details:</h3>
        <p>
          This component fetches data from the API endpoint and displays it in a table format.
          The table is sortable by ID column (click on the ID header to sort).
        </p>
        <p>
          The component uses Axios for HTTP requests and the authentication token from the
          AuthContext to make authenticated API calls.
        </p>
      </div>
    </div>
  );
};

export default DataTablePage;