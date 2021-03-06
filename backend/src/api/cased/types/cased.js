const schema = `
  type Cased {
    id: String!
    name: String
    description: String
    status: CasedStatusEnum
    featuredImage: [ File! ]
    modules: [ Module! ]
    patients: [ Patient! ]
    availableFrom: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
