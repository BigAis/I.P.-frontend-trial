import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './MainLayout.scss';

const MainLayout = ({ children, activeTab, setActiveTab }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setActiveTab('login');
  };

  return (
    <div className="main-layout">
      <header className="header">
        <div className="container">
          <h1>Frontend Developer Technical Trial</h1>
          {isAuthenticated && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>
      </header>
      
      <nav className="navigation">
        <div className="container">
          <ul>
            <li>
              <button 
                className={activeTab === 'login' ? 'active' : ''}
                onClick={() => setActiveTab('login')}
              >
                {isAuthenticated ? 'Account' : 'Login'}
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'datatable' ? 'active' : ''}
                onClick={() => setActiveTab('datatable')}
              >
                Data Table
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'userform' ? 'active' : ''}
                onClick={() => setActiveTab('userform')}
              >
                User Form
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'buttons' ? 'active' : ''}
                onClick={() => setActiveTab('buttons')}
              >
                Styled Buttons
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      <main className="content">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>Frontend Developer Technical Trial - Created with React and Vite - Papadopoulos Ioannis</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;