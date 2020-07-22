const createUser = `
mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    username
    password
    createdAt
    updatedAt
  }
}
`;

module.exports = createUser;