const graphql = require("graphql");
console.log(graphql);

const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// dummy data
let books = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

let authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: "Book",
    // object を返却する allowfunc の場合は, () で囲む必要あり
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
});

// 検索方法の定義
// フロントからユーザー型タケルクエリの定義
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // db からデータを取得する方法
                // objectを見つけるコードをこのなかにきじゅつする

                // books から id が args.id に一致するものを返却
                return _.find(books, { id: args.id });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
