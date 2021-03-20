import Container from "typedi";
import { ExchangeRateService } from "../ExchangeRates/ExchangeRatesService";
import { scheduleJob } from "./Job";

// Run Exchange Rate Update every hour
export async function updateExchangeRateJob(): Promise<void> {
  scheduleJob(() => {
    const rateService = Container.get(ExchangeRateService);
    rateService.updateRates();
  }, 3600);
}