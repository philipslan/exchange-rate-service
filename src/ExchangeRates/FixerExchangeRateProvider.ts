import axios from 'axios';
import * as dotenv from "dotenv";
import { IExchangeRateProvider } from '../Entities/IExchangeRateProvider';
import { Service } from 'typedi';
import { FixerResponse } from '../Entities/FixerEntities';

dotenv.config();
const fixerApiKey = process.env.FIXER_API_KEY;

@Service("FixerExchangeRateProvider")
export class FixerExchangeRateProvider implements IExchangeRateProvider {
  constructor(private rates: Map<string, number>) {
  }

  async fetchFromSource(): Promise<void> {
    console.log("FETCHING FROM SOURCE");
    const request = await axios.get(`http://data.fixer.io/api/latest?access_key=${fixerApiKey}`);
    const data = request.data as FixerResponse;
    this.rates = data.rates;
  }

  getRate(from: string, to: string): number {
    if (!(from in this.rates)) {
      throw new Error(`${from} is not a valid exchange symbol`);
    }
    if (!(to in this.rates)) {
      throw new Error(`${to} is not a valid exchange symbol`);
    }
    const r1 = this.rates[from];
    const r2 = this.rates[to];
    return r2 / r1;
  }
}
