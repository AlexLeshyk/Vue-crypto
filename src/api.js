const API_KEY = '054261d071944c7c34d741877bfdfaf59b517eb8aca475c8d1f2fd1fcdc89431';
export const loadTickers = (tickers) =>
  fetch(`
    https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(',')
    }&api_key=${API_KEY}`)
    .then( r => r.json())
    .then(rawData =>
      Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, 1 / value])
      )
    );
