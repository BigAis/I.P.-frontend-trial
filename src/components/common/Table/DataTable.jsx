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

        // Mock data for technical trial in case API is not accessible
        const mockPosts = [
          { id: 1, title: 'First Post', body: 'This is the content of the first post. It contains information about the topic.' },
          { id: 2, title: 'Second Post', body: 'The second post discusses various aspects of the subject in more detail.' },
          { id: 3, title: 'Third Post', body: 'Here we explore advanced concepts related to the main topic of discussion.' },
          { id: 4, title: 'Fourth Post', body: 'This post summarizes key points and offers conclusions about the discussed topic.' },
          { id: 5, title: 'Fifth Post', body: 'Additional information and supplementary content related to the topic.' },
          { id: 6, title: 'Sixth Post', body: 'This post explores a different angle on the subject with new insights.' },
          { id: 7, title: 'Seventh Post', body: 'A practical application of the concepts discussed in previous posts.' },
          { id: 8, title: 'Eighth Post', body: 'Case studies and real-world examples demonstrating the topic in action.' },
          { id: 9, title: 'Ninth Post', body: 'Frequently asked questions about the subject and comprehensive answers.' },
          { id: 10, title: 'Tenth Post', body: 'Resources and references for further reading on this topic.' }
        ];

        try {
          // First try to get data from the API
          const data = await postsService.getPosts();
          setPosts(data);
          setLoading(false);
        } catch (apiError) {
          console.error('API error:', apiError);
          // If API fails, use mock data
          console.log('Using mock data due to API unavailability');
          setPosts(mockPosts);
          setLoading(false);
        }
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