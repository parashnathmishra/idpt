/**
 * Maps all the Schema of the application.
 * More about the schema: https://www.apollographql.com/docs/graphql-tools/generate-schema/
 */

const makeExecutableSchema = require('graphql-tools')
  .makeExecutableSchema;
const resolvers = require('./resolvers');

const sharedTypes = require('./shared/types');

const settingsTypes = require('./settings/types');
const settingsQueries = require('./settings/queries');
const settingsMutations = require('./settings/mutations');

const authTypes = require('./auth/types');
const authQueries = require('./auth/queries');
const authMutations = require('./auth/mutations');

const iamTypes = require('./iam/types');
const iamQueries = require('./iam/queries');
const iamMutations = require('./iam/mutations');

const auditLogTypes = require('./auditLog/types');
const auditLogQueries = require('./auditLog/queries');
const auditLogMutations = require('./auditLog/mutations');

const patientTypes = require('./patient/types');
const patientQueries = require('./patient/queries');
const patientMutations = require('./patient/mutations');

const casedTypes = require('./cased/types');
const casedQueries = require('./cased/queries');
const casedMutations = require('./cased/mutations');

const moduleTypes = require('./module/types');
const moduleQueries = require('./module/queries');
const moduleMutations = require('./module/mutations');

const taskTypes = require('./task/types');
const taskQueries = require('./task/queries');
const taskMutations = require('./task/mutations');

const audioTypes = require('./audio/types');
const audioQueries = require('./audio/queries');
const audioMutations = require('./audio/mutations');

const documentTypes = require('./document/types');
const documentQueries = require('./document/queries');
const documentMutations = require('./document/mutations');

const types = [
  ...sharedTypes,
  ...iamTypes,
  ...authTypes,
  ...auditLogTypes,
  ...settingsTypes,
  ...patientTypes,
  ...casedTypes,
  ...moduleTypes,
  ...taskTypes,
  ...audioTypes,
  ...documentTypes,
].map((type) => type.schema);

const mutations = [
  ...iamMutations,
  ...authMutations,
  ...auditLogMutations,
  ...settingsMutations,
  ...patientMutations,
  ...casedMutations,
  ...moduleMutations,
  ...taskMutations,
  ...audioMutations,
  ...documentMutations,
].map((mutation) => mutation.schema);

const queries = [
  ...iamQueries,
  ...authQueries,
  ...auditLogQueries,
  ...settingsQueries,
  ...patientQueries,
  ...casedQueries,
  ...moduleQueries,
  ...taskQueries,
  ...audioQueries,
  ...documentQueries,
].map((query) => query.schema);

const query = `
  type Query {
    ${queries.join('\n')}
  }
`;

const mutation = `
  type Mutation {
    ${mutations.join('\n')}
  }
`;

const schemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [schemaDefinition, query, mutation, ...types],
  resolvers,
});
