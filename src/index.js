import server from './server';

// Start the server
server.start({ port: process.env.PORT || 4000 }, () => {
  /* eslint-disable no-console */
  console.log(`Server is running on PORT: 4000`);
});
