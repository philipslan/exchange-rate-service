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
    const retVal = 10;
    exchangeProvider.setup(x => x.getRate("a", "b")).returns(() => retVal);
    const val = exchangeRateService.findRate("a", "b");
    assert.strictEqual(val, retVal);
  });

  it("updateRates will call fetchFromSource", async function() {
    await exchangeRateService.updateRates();
    exchangeProvider.verify(x => x.fetchFromSource(), Times.once());
  });
});
