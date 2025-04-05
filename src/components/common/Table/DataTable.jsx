// src/components/common/Table/DataTable.jsx
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

        // Fetch posts from API
        const data = await postsService.getPosts();
        
        // Apply initial sort
        const sortedData = [...data].sort((a, b) => 
          sortOrder === 'asc' ? a.id - b.id : b.id - a.id
        );
        
        setPosts(sortedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch data: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, sortOrder]);

  const handleSort = () => {
    // Create a copy of posts array to avoid mutating state directly
    const sortedPosts = [...posts];
    
    // Sort based on current order
    sortedPosts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return b.id - a.id; // Switch to descending
      } else {
        return a.id - b.id; // Switch to ascending
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
            {posts.length > 0 ? (
              posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">No posts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;