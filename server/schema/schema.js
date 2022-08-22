const graphql = require('graphql')
console.log(graphql)
const {GraphQLObjectType, GraphQLString} = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  // object を返却する allowfunc の場合は, () で囲む必要あり
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
})