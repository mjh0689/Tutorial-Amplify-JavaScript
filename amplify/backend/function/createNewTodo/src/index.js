
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

const createUser = gql`
mutation CreateTodo(
  $input: CreateTodoInput!
  $condition: ModelTodoConditionInput
) {
  createTodo(input: $input, condition: $condition) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
`;

exports.handler = async (event) => {
    // TODO implement
    try{
        const user = {
            name: event.username,
            description: event.password
        }

        return await API.graphql(graphqlOperation(createUser, { input: user }));
    } catch(err){
        console.log(`${err}`);
    }
};