import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

import { schema } from "./lib/schema";
import { root as rootValue } from "./lib/root";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
