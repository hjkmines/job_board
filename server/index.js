import 'colors';
import 'dotenv/config';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/type-defs.js";
import { resolvers } from './schema/resolvers.js';

const API_PORT = process.env.API_PORT || 4000;

const server = new ApolloServer({typeDefs, resolvers})

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token}),
    listen: {port: API_PORT}
})

//syntax for older node versions to wrap startStandalonServer promise inside async function 
// async function main() {
//     const { url } = await startStandaloneServer(server, {
//         context: async ({req}) => ({ token: req.headers.token}),
//         listen: { port: API_PORT }
//     })
// }


console.log(`${'🚀 Server is listening at:'.green} ${url.yellow}`)
console.log(`${'Query at:'.magenta} ${'https://studio.apollographql.com/dev'.yellow}`)

// main()