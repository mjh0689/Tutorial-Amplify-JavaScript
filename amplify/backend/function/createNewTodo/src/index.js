
const Amplify = require("@aws-amplify/api");
const { API, graphqlOperation } = require("@aws-amplify/api");

const awsconfig = require("./aws-exports");

const createTodo = require('./GraphQL/createTodo');

const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

Amplify.default.configure(awsconfig);

const query = gql`${createTodo}`;


exports.handler = async (event) => {
    // TODO implement
    try{
        const user = {
            name: event.name,
            description: event.description
        }

        return await API.graphql(graphqlOperation(query, { input: user }));
    } catch(err){
        console.log(`${err}`);
    }
};