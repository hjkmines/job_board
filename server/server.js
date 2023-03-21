// const express = require('express'); 
// const expressGraphQL = require('express-graphql');
// const {
//     GraphQLSchema,
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLList,
//     GraphQLInt,
//     GraphQLNonNull
// } = require('graphql')
// // const dotenv = require('dotenv'); 
// // const connectDB = require('./config/db')
// // const bodyParser = require('body-parser')

// // dotenv.config({ path: './config/config.env' })

// // connectDB(); 

// const app = express(); 

// // app.use(bodyParser.json())

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: "Hello World",
//         fields: () => ({
//             message: { 
//                 type: GraphQLString,
//                 resolve: () => 'Hello World'
//             }
//         })
//     })
// })

// app.use('/graphql', expressGraphQL({
//     // schema: schema,
//     graphiql: true
// }))

// const PORT = process.env.PORT || 5001; 


// const server = app.listen(PORT, () => {
//     console.log(`Server is listening on PORT ${PORT}`)
// })