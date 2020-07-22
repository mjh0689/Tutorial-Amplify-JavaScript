const listTodos = `
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

module.exports = listTodos;