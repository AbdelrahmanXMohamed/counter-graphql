import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
// var cors = require('cors')
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
let counter = 0;
const schema = buildSchema(`
  type Query {
    count: Int
  }
  type Mutation {
      increment:Int
    }
`);

const root = {
  count: (): number => counter,
  increment: (): number => ++counter,
};

const graphqlMiddleware = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
app.use("/graphql", graphqlMiddleware);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
});
