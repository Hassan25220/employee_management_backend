const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./src/config/database');
const typeDefs = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers');
const authenticate = require('./src/utils/auth');

let authWarningCount = 0;
const MAX_WARNINGS = 5;

async function startServer() {
  const app = express();

  try {
    await connectDB();
    console.log("Database connected successfully.");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        let user = null;
        try {
          user = authenticate(req); // Authenticate user
          if (!user && authWarningCount < MAX_WARNINGS) {
            console.warn("Warning: Authentication failed or missing. Some operations may require authentication.");
            authWarningCount++;
          }
        } catch (error) {
          if (authWarningCount < MAX_WARNINGS) {
            console.warn("Warning: Authentication failed or missing. Some operations may require authentication.");
            authWarningCount++;
          }
        }
        return { user };
      },
      formatError: (error) => {
        console.error("GraphQL Error:", error.message);
        return new Error(error.message);
      },
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
}

startServer();
