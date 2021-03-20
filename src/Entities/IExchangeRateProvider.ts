export interface IExchangeRateProvider {
  fetchFromSource(): Promise<void>;
  getRate(from: string, to: string): number;
}