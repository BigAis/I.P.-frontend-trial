import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DataTablePage from './pages/DataTablePage';
import UserFormPage from './pages/UserFormPage';
import ButtonDemoPage from './pages/ButtonDemoPage';

function App() {
  const [activeTab, setActiveTab] = useState('login');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'login':
        return <LoginPage />;
      case 'datatable':
        return <DataTablePage />;
      case 'userform':
        return <UserFormPage />;
      case 'buttons':
        return <ButtonDemoPage />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <AuthProvider>
      <MainLayout 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderTabContent()}
      </MainLayout>
    </AuthProvider>
  );
}

export default App;