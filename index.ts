import axios from 'axios';
import { PairEntity, DefiboxGetMarket } from './src/interfaces'
import { AUTHORIZATION_BASIC, DEFISTATION_API_TVL_URL } from "./src/config"
import { getPricesfromString } from "./src/utils";
import { CronJob } from "cron";
import signale from "signale";

async function bsc() {
    const url = "https://bsc.defibox.io/api/swap/get24HInfo";
    signale.time(url);
    const bnbPrice = (await getPricesfromString("binancecoin")).data.binancecoin.usd;
    const swap = await axios.post(url, {}, { headers: { chainid: 56 }})
    const volume = swap.data.data.volume_usd_24h;
    const bnb = swap.data.data.wbnb_balance;
    const tvl = swap.data.data.usd_balance + bnb * bnbPrice // swap TVL
    signale.timeEnd(url);
    return { tvl, bnb, volume, data: await getPairEntities() };
}

async function getPairEntities() {
    const url = "https://bsc.defibox.io/api/swap/getMarket";
    signale.time(url);
    const pairEntities: PairEntity[] = [];
    const options = {
        isAsc: false,
        type: 2,
        limit: 100,
        chainid: 56,
        orderColumn: "usd_balance"
    }
    const market = await axios.post<DefiboxGetMarket>(url, {}, { headers: options })
    for ( const row of market.data.data ) {
        pairEntities.push({
            id: row.pair_id,
            token0: { symbol: row.symbol0 },
            token1: { symbol: row.symbol1 },
        })
    }
    signale.timeEnd(url);
    return { pairEntities };
}

async function postDataProvider() {
    const data = await bsc();
    signale.time(DEFISTATION_API_TVL_URL);
    const headers = {
        Authorization: `Basic ${AUTHORIZATION_BASIC}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.post(DEFISTATION_API_TVL_URL, data, { headers });
        if ( response.data.status == "success" ) signale.success(JSON.stringify(data));
        else signale.warn(response.data.message);
    } catch (e: any) {
        signale.error(e.response.data);
    }
    signale.timeEnd(DEFISTATION_API_TVL_URL);
}

new CronJob("50 * * * *", () => {
    postDataProvider();
}, null, true);
