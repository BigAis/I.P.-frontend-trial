import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { postsService } from '../../../services/apiService';
import './DataTable.scss';

const DataTable = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Check if user is authenticated
        if (!isAuthenticated) {
          setError('You must be logged in to view this data');
          setLoading(false);
          return;
        }

        const data = await postsService.getPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchPosts();
  }, [isAuthenticated]);

  const handleSort = () => {
    // Create a copy of posts array to avoid mutating state directly
    const sortedPosts = [...posts];
    
    // Sort based on current order
    sortedPosts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    
    // Update state with sorted posts and toggle sort order
    setPosts(sortedPosts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  if (!isAuthenticated) {
    return <div className="warning-message">Please log in to view the data table.</div>;
  }

  return (
    <div className="data-table-container">
      <h2>Posts Data</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={handleSort} className="sortable">
                ID {sortOrder === 'asc' ? '▲' : '▼'}
              </th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;