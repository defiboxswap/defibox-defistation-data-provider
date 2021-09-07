export interface PairEntity {
    id: string;
    token0: { symbol: string };
    token1: { symbol: string };
}

export interface DefiboxGetMarket {
    code: number;
    message: string;
    data: DefiboxPair[];
}

export interface DefiboxPair {
    id: number;
    pair_id: string;
    chain_id: number;
    name: string;
    symbol: string;
    decimal: number;
    contract0: string;
    contract1: string;
    symbol0: string;
    symbol1: string;
    name0: string;
    name1: string;
    decimal0: number;
    decimal1: number;
    count0: number;
    count1: number;
    liquidity_token: number;
    swap_count_24h: number;
    volume_usd_24h: number;
    volume_24h: number;
    fee_usd_24h: number;
    volume_symbol: string;
    wbnb_balance: number;
    usd_balance: number;
    price_direction: number;
    price: number;
    yesterday_price: number;
    trx_id: string;
    mine_weight: number;
    swap_weight: number;
    total_yield_current: number;
    total_yield_24h: number;
    total_yield_redelivery: number;
    update_time: Date;
    quote_count: number;
    quote_contract: string;
    quote_type: number;
    pledge_lptoken: number;
    pledge_lptoken_usd: number;
    usd_balance2: number;
}