import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import { authenticateJwt } from "./passport";
import { withAuth } from "./withAuth";
class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: ({ request }) => ({ request, withAuth })
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(authenticateJwt);
    this.app.express.use(helmet());
  };
}

export default new App().app;
