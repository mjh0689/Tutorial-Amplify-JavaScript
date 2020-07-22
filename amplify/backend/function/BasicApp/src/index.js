const Amplify = require("@aws-amplify/api");
const { API, graphqlOperation } = require("@aws-amplify/api");

const gql = require('graphql-tag');

const awsconfig = require("./aws-exports");

const listUsers = require("./GraphQL/getListOfUsers")

const graphql = require('graphql');
const { print } = graphql;

Amplify.default.configure(awsconfig);

const query = gql`${listUsers}`

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