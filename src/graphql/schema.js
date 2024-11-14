const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int
    class: String
    subjects: [String]
    attendance: Int
  }

  type Query {
  listEmployees(page: Int, limit: Int, sortField: String, sortOrder: String): [Employee]
  employeeDetails(id: ID!): Employee
  }


  type Mutation {
    addEmployee(name: String!, age: Int, class: String, subjects: [String], attendance: Int): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Int): Employee
  }
`;

module.exports = typeDefs;
