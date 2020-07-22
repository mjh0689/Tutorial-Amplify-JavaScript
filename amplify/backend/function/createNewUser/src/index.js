
const Amplify = require("@aws-amplify/api");
const { API, graphqlOperation } = require("@aws-amplify/api");

const awsconfig = require("./aws-exports");
const createUser = require("./GraphQL/createUser");

const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

Amplify.default.configure(awsconfig);

const query = gql`${createUser}`

exports.handler = async (event) => {
    // TODO implement
    try{
        const user = {
            username: event.username,
            password: event.password
        }

        return await API.graphql(graphqlOperation(query, { input: user }));
    } catch(err){
        console.log(`${err}`);
    }
};