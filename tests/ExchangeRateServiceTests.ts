import * as TypeMoq from "typemoq";
import { Times } from 'typemoq';
import * as assert from 'assert';
import { IExchangeRateProvider } from "../src/Entities/IExchangeRateProvider";
import { ExchangeRateService } from "../src/ExchangeRates/ExchangeRatesService";

describe('ExchangeRateService', function() {
  let exchangeProvider: TypeMoq.IMock<IExchangeRateProvider>;
  let exchangeRateService: ExchangeRateService;

  beforeEach(function(){
    exchangeProvider = TypeMoq.Mock.ofType<IExchangeRateProvider>();
    exchangeRateService = new ExchangeRateService(exchangeProvider.object);
  });

  it("on init provider will fetch from source", async function() {
    await exchangeRateService.init();
    exchangeProvider.verify(x => x.fetchFromSource(), Times.once());
  });

  it("findRate will retrieve rate from provider", function() {
    const retVal = 2;
    exchangeProvider.setup(x => x.getRate("A")).returns(() => 100);
    exchangeProvider.setup(x => x.getRate("B")).returns(() => 200);
    const val = exchangeRateService.findRate("A", "B");
    assert.strictEqual(val, retVal);
    const val2 = exchangeRateService.findRate("B", "A");
    assert.strictEqual(val2, 1 / retVal);
  });

  it("findRate works with mix casing", function() {
    exchangeProvider.setup(x => x.getRate("A")).returns(() => 100);
    exchangeProvider.setup(x => x.getRate("B")).returns(() => 200);
    const val = exchangeRateService.findRate("a", "B");
    assert.strictEqual(val, 2);
  })

  it("updateRates will call fetchFromSource", async function() {
    await exchangeRateService.updateRates();
    exchangeProvider.verify(x => x.fetchFromSource(), Times.once());
  });
});
