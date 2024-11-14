const Employee = require('../models/employee');

const resolvers = {
  Query: {
    listEmployees: async (_, { filter, page = 1, limit = 10, sortBy = 'name' }, context) => {
      if (context.user.role !== 'admin' || !context.user) {
        throw new Error('Unauthorized');
      }
      const query = filter ? { name: { $regex: filter, $options: 'i' } } : {};
      return await Employee.find(query)
        .sort(sortBy)
        .skip((page - 1) * limit)
        .limit(limit);
    },
    employeeDetails: async (_, { id }, context) => {
      if (context.user.role === 'employee' || context.user.role === 'admin') {
        return await Employee.findById(id);
      }
      throw new Error('Unauthorized');
    },
  },
  Mutation: {
    addEmployee: async (_, args, context) => {
      if (context.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return await Employee.create(args);
    },
    updateEmployee: async (_, { id, ...args }, context) => {
      if (context.user.role !== 'admin' || !context.user) {
        throw new Error('Unauthorized');
      }
      return await Employee.findByIdAndUpdate(id, args, { new: true });
    },
  },
};

module.exports = resolvers;
