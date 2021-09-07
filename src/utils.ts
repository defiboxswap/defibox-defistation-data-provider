import retry from "async-retry";
import axios from "axios";

export async function fetchURL(url: string) {
    return await retry(async () => await axios.get(url), {
      retries: 3
    })
  }

export async function getPricesfromString( stringFeed: string ) {
    return await fetchURL(`https://api.coingecko.com/api/v3/simple/price?ids=${stringFeed}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`)
}
