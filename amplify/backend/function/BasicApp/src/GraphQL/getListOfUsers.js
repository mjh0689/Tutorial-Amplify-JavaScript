

const listUsers = `
  query listUsers {
    listUsers {
      items {
        id
        username
        password
      }
    }
  }
`

module.exports = listUsers;