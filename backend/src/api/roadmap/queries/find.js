const Service = require('../../../services/roadmapService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  roadmapFind(id: String!): Roadmap!
`;

const resolver = {
  roadmapFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordRead);

    return await new Service(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
