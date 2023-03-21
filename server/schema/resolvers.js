export const resolvers = {
    Query: {
        // parent, args, context, info available to all resolvers 
        apiStatus: (parent, args, context, info) => {
            return { status: 'The API is working correctly'}
        },
    },
    Mutation:{
        createUser: (parents, args, context, info) => {
            return {
                firstName: args.input.firstName,
                lastName: args.input.lastName,
                email: args.input.email
            }
        }
    }
}