const express = require("express");
const cors = require('cors');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose")

console.log(schema);

const app = express();
app.use(cors()) // frontアクセス対応

// mongoose 接続
// passをいれないとつながらなかった
mongoose.connect(
    'mongodb://mongo:27017', {
        user: 'root',
        pass: 'root',
        dbName: 'mymongo'
    }
);
mongoose.connection.once('open', () => {
    console.log('connected database');
})


app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000, () => {
    console.log("now listening port 4000");
});
