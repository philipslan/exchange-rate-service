export interface IExchangeRateProvider {
  fetchFromSource(): Promise<void>;
  getRate(symbol: string): number;
}