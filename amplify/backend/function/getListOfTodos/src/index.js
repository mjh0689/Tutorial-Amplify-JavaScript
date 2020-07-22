const Amplify = require("@aws-amplify/api");
const { API, graphqlOperation } = require("@aws-amplify/api");

const awsconfig = require('./aws-exports');

const listTodos = require('./GraphQL/getListOfTodos');

const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

Amplify.default.configure(awsconfig);

const query = gql`${listTodos}`;

exports.handler = async (event) => {
    // TODO implement
    try{
        const body = {
            graphQLData: await API.graphql(graphqlOperation(query))
        };

        return {
            statusCode: 200,
            body: body,
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }
    } catch(err){
        console.log(`${err}`);
    }
};