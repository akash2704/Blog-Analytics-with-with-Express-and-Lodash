const express = require('express');
const axios = require('axios');
const _ = require('lodash');

const app = express();
const port = 3000;

// Function to fetch blog data
const fetchBlogs = async () => {
  const apiUrl = 'https://intent-kit-16.hasura.app/api/rest/blogs';
  const headers = {
    'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
  };

  const response = await axios.get(apiUrl, { headers });
  return response.data.blogs;
};

// Middleware to fetch and analyze blog data
app.get('/api/blog-stats', async (req, res) => {
  try {
    const blogs = await fetchBlogs();

    // Convert all titles to lowercase for comparison
    const blogsLowercase = blogs.map((blog) => ({
      ...blog,
      title: blog.title.toLowerCase(),
    }));

    // Calculate statistics using Lodash
    const totalBlogs = blogs.length;
    const longestTitle = _.maxBy(blogsLowercase, 'title');
    const blogsWithPrivacy = _.filter(blogs, (blog) =>
      blog.title.toLowerCase().includes('privacy')
    );
    const uniqueTitles = _.uniqBy(blogsLowercase, 'title');

    // Respond with the statistics
    res.json({
      totalBlogs,
      longestTitle: longestTitle ? longestTitle.title : '', // Handle the case where longestTitle is undefined
      blogsWithPrivacy: blogsWithPrivacy.length,
      uniqueTitles: uniqueTitles.map((blog) => blog.title),
    });
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Blog search endpoint
app.get('/api/blog-search', async (req, res) => {
  try {
    const blogs = await fetchBlogs();
    const query = req.query.query.toLowerCase();

    // Filter blogs based on the query
    const filteredBlogs = _.filter(blogs, (blog) =>
      blog.title.toLowerCase().includes(query)
    );

    res.json(filteredBlogs);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the Express app instance
module.exports = app;
