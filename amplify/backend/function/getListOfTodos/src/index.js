
const Amplify = require("@aws-amplify/api");
const { API, graphqlOperation } = require("@aws-amplify/api");

const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

Amplify.default.configure({
"aws_project_region": "us-east-2",
"aws_appsync_graphqlEndpoint": "https://ekzqotj4hvcildkdr7z3576kpy.appsync-api.us-east-2.amazonaws.com/graphql",
"aws_appsync_region": "us-east-2",
"aws_appsync_authenticationType": "API_KEY",
"aws_appsync_apiKey": "da2-ccdislmwrvhm3dq45e3mny4bdm"});

const listTodos = gql`
  query listTodos {
    listTodos {
      items {
        id
        name
        description
      }
    }
  }
`

exports.handler = async (event) => {
    // TODO implement
    try{
        const body = {
            graphQLData: await API.graphql(graphqlOperation(listTodos))
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