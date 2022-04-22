"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
// var cors = require('cors')
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
let counter = 0;
const schema = (0, graphql_1.buildSchema)(`
  type Query {
    count: Int
  }
  type Mutation {
      increment:Int
    }
`);
const root = {
    count: () => counter,
    increment: () => ++counter,
};
const graphqlMiddleware = (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: root,
    graphiql: true,
});
app.use("/graphql", graphqlMiddleware);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
});
