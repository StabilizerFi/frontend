
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { hermesEndpoint } from '@/Constants/config';

export const getPrice = async (priceId: string, decimals: number) => {
    const connection = new EvmPriceServiceConnection(hermesEndpoint);

    const priceFeeds = await connection.getLatestPriceFeeds([priceId]);
    const price = priceFeeds && priceFeeds[0].getPriceNoOlderThan(600);
    return(price && ((Number(price.price) * 10**price.expo).toFixed(decimals)));
}