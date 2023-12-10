const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema' );
const cors = require(çors);

const app = express();

//allow cross-origin request
app.use(cors());

app.listen(4000, () =>{
    console.log('now listening for request on port 4000');
    //event.preventDefault();
});

app.use('/graphql', graphqlHTTP({
    schema
}))