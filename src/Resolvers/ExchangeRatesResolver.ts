import { Arg, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { ExchangeRate } from "../Entities/ExchangeRate";
import { ExchangeRateService } from "../ExchangeRates/ExchangeRatesService";

@Service()
@Resolver()
export class ExchangeRatesResolver {
  constructor(private rateService: ExchangeRateService) {
  }
  @Query(() => ExchangeRate)
  ExchangeRate(
    @Arg("from") from: string, @Arg("to") to: string
  ): ExchangeRate {
    const rate = this.rateService.findRate(from, to);
    return { from, to, rate } as ExchangeRate;
  }
}