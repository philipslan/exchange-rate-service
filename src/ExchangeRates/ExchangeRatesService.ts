import { IExchangeRateProvider } from "../Entities/IExchangeRateProvider";
import { Inject, Service } from "typedi";

@Service()
export class ExchangeRateService {
  constructor(
      @Inject("FixerExchangeRateProvider") private provider: IExchangeRateProvider
  ) {
  }

  async init(): Promise<void> {
    this.provider.fetchFromSource();
  }

  findRate(from: string, to: string): number {
    const fromUpper = from.toUpperCase();
    const toUpper = to.toUpperCase();
    const r1 = this.provider.getRate(fromUpper);
    const r2 = this.provider.getRate(toUpper);
    return r2 / r1;
  }

  async updateRates(): Promise<void> {
    await this.provider.fetchFromSource();
    console.log("Succesfully updated service cache");
  }
}