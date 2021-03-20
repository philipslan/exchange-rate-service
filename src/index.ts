import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as express from "express";
import { AddressInfo } from "net";
import { ExchangeRatesResolver } from "./Resolvers/ExchangeRatesResolver";
import { ExchangeRateService } from "./ExchangeRates/ExchangeRatesService";
import { Container } from "typedi";
import { FixerExchangeRateProvider } from "./ExchangeRates/FixerExchangeRateProvider";
import { updateExchangeRateJob } from "./Jobs/UpdateExchangeRateJob";

// Setting up container for DI
const rateMap = new Map<string, number>();
Container.set("FixerExchangeRateProvider", new FixerExchangeRateProvider(rateMap));
(async(): Promise<void> => {
  // Create the app
  const app = express();

  // Set up the server
  const server = app.listen(process.env.PORT || 3000, function() {
    const address = server.address() as AddressInfo;
    const host = address.address;
    const port = address.port;
    console.log("listening at http://" + host + ":" + port);
  });

  // Create Rates Provider and ExchangeRatesService
  const rateService = Container.get(ExchangeRateService);
  await rateService.init();

  // Setup apollo server for graphql
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ExchangeRatesResolver],
      container: Container
    }),
    context: ({ req, res }): { req: express.Request, res: express.Response} => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  // Add exchange rest endpoint for alternative querying method
  app.get("/exchange", (req, res) => {
    try {
      const { from, to } = req.query as { from: string, to: string };
      const rate = rateService.findRate(from, to);
      res.json({ from, to, rate  });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  });

  updateExchangeRateJob();
})();