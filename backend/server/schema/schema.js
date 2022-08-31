const graphql = require("graphql");
console.log(graphql);

const Book = require('../models/book');
const Author = require('../models/author');

const _ = require("lodash");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

// // dummy data
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// let authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const BookType = new GraphQLObjectType({
    name: "Book",
    // object を返却する allowfunc の場合は, () で囲む必要あり
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log('BookType parent: ', parent);
                return Author.findById(parent.authorId); //mongoose model のメソッド。

                // return _.find(authors, {id: parent.authorId});
            }
        }
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log('AuthorType books parent: ', parent);
                return Book.find({authorId: parent.id})
                // return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

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
                // return _.find(books, { id: args.id });
                return Book.findById(args.id)
            },
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Author.findById(args.id)
                // return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({}) //からObjectを渡すと全て返却
                // return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
                return Author.find({})
            }
        }
    },
});

// MUtation の定義
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                // DBに追加するためのAuthorモデル作成
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save(); //DBにインスタンスを保存
            }    
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    })
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
