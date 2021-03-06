const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql')
const { books, authors } = require('./data')
const app = express()

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'this is represents a book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt)},
    author: {
      type: AuthorType,
      resolve: book => {
        return authors.find( author => author.id === book.authorId )
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'this is represents a author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      // query one author's all books
      resolve: author => books.filter(book => book.authorId === author.id)
    }
  })
})

// total query by 
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    // query a single book by book id：
    book: {
      type: BookType,
      description: 'A Single Book',
      // must query this book by params of book id:
      args: { id: { type: GraphQLInt } },
      resolve: ( parent, args ) => books.find( book => book.id === args.id )
    },

    books: {
      type: new GraphQLList(BookType),
      description: 'List of all books',
      resolve: () => books
    },

    // query a single author by authorId:
    author: {
      type: AuthorType,
      description: 'A Single Author',
      // query an author by params of author id:
      args: { id: { type: GraphQLInt } },
      resolve: ( parent, args ) => authors.find( author => author.id === args.id )
    },

    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of all Authors',
      resolve: () => authors
    }
  })
})

const BookSchema = new GraphQLSchema({ query: RootQueryType })

app.use('/books', graphqlHTTP({
  schema: BookSchema,
  graphiql: true
}))
app.listen(5000, () => console.log('server run no port 5000'))