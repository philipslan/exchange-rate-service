import * as assert from 'assert';
import { FixerExchangeRateProvider } from "../src/ExchangeRates/FixerExchangeRateProvider";

describe('ExchangeRateService', function() {
  let exchangeProvider: FixerExchangeRateProvider;
  let fixerRateMap: Map<string, number>;

  beforeEach(function(){
    fixerRateMap = new Map<string, number>();
    exchangeProvider = new FixerExchangeRateProvider(fixerRateMap);
  });

  it("getRate throws error when inputs are invalid", function() {
    assert.throws(() => exchangeProvider.getRate("A", "B"));
    fixerRateMap["A"] = 100;
    assert.throws(() => exchangeProvider.getRate("A", "B"));
    fixerRateMap["B"] = 200;
    assert.throws(() => exchangeProvider.getRate("A", "C"));
  });

  it("getRate returns relative ratio between from and to", function() {
    fixerRateMap["A"] = 100;
    fixerRateMap["B"] = 200;
    assert.strictEqual(exchangeProvider.getRate("A", "B"), 2);
    assert.strictEqual(exchangeProvider.getRate("B", "A"), 0.5);
  });
});
