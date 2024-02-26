import axios from 'axios';
import Sign  from '../frontend/src/constants/digital-currency.js';

const Api = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const API_MARKET_URL = 'https://api.coinlore.net/api/tickers/';
        const API_CURRENCY_URL = 'https://open.er-api.com/v6/latest/USD';

        // Fetch cryptocurrency data
        const marketResponse = await axios.get(API_MARKET_URL);
        const symbol = marketResponse.data.data.filter(item => item.symbol == from);

        if (!symbol) {
            return res.status(404).json({ error: 'Cryptocurrency not found' });
        }

        // Fetch USD exchange rates
        const currencyResponse = await axios.get(API_CURRENCY_URL);
        const exchangeRate = currencyResponse.data.rates[to];

        if (!exchangeRate) {
            return res.status(404).json({ error: 'Currency not found' });
        }

        // Get currency symbol for the target currency
        const targetCurrencySymbol = Sign.physicalCurrencySymbols[to];

        // Calculate converted amount
        const convertedAmount = amount * symbol[0].price_usd * exchangeRate;
        res.json({ convertedAmount, targetCurrencySymbol });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default Api;

