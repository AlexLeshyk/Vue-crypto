const API_KEY = '054261d071944c7c34d741877bfdfaf59b517eb8aca475c8d1f2fd1fcdc89431';

const tickersHandlers = new Map();

const loadTickers = (tickersHandlers) => {
  if (tickersHandlers.size === 0) {
    return;
  }

  fetch(`
    https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
      ...tickersHandlers.keys()
    ].join(',')}&tsyms=USD&api_key=${API_KEY}`)
    .then( r => r.json())
    .then(rawData => {
      const updatePrices = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      );

      Object.entries(updatePrices).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? [];
        handlers.forEach(fn => fn(newPrice));
      });

    });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = ticker => {
  tickersHandlers.delete(ticker);
};

setInterval(loadTickers, 5000);
