import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { hermesEndpoint } from '@/Constants/config';

export const getPriceUpdateData = async (priceId: string) => {
    const connection = new EvmPriceServiceConnection(hermesEndpoint);
    const priceUpdateData = await connection.getPriceFeedsUpdateData([priceId]);

    return priceUpdateData;
}