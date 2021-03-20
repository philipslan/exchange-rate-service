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
    return this.provider.getRate(from, to);
  }

  async updateRates(): Promise<void> {
    await this.provider.fetchFromSource();
    console.log("Succesfully updated service cache");
  }
}