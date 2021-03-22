import * as assert from 'assert';
import { FixerExchangeRateProvider } from "../src/ExchangeRates/FixerExchangeRateProvider";

describe('FixerExchangeRateProviderTests', function() {
  let exchangeProvider: FixerExchangeRateProvider;
  let fixerRateMap: Map<string, number>;

  beforeEach(function(){
    fixerRateMap = new Map<string, number>();
    exchangeProvider = new FixerExchangeRateProvider(fixerRateMap);
  });

  it("getRate throws error when inputs are invalid", function() {
    assert.throws(() => exchangeProvider.getRate("A"));
  });

  it("getRate returns rate from existing symbol", function() {
    fixerRateMap["A"] = 100;
    fixerRateMap["B"] = 200;
    assert.strictEqual(exchangeProvider.getRate("A"), 100);
    assert.strictEqual(exchangeProvider.getRate("B"), 200);
  });
});
