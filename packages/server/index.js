import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
// import { findOrCreateUser } from './controllers/user.controller';

import dotenv from 'dotenv';
dotenv.config();

mongoose
    .connect(process.env.MONGO_LOCAL, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const app = express();
// APOLLO SERVER
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let authToken = null;
        let currentUser = null;

        try {
            authToken = req && req.headers && req.headers.authorization;

            if (authToken) {
                // if auth token find or create user
                // currentUser = await findOrCreateUser(authToken);
            }
        } catch (error) {
            console.error(error);
        }
        return { currentUser };
    }
});

//SERVER MIDDLEWARE
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    
    try {
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
    }
});

app.listen(5000, () => {
    console.log(`Server start: localhost:5000${server.graphqlPath}`);
});
