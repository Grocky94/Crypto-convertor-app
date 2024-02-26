import React, { useState } from 'react';
import axios from 'axios';
import currency from './constants/digital-currency';
import "./App.css"

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [targetCurrencySymbol, setTargetCurrencySymbol] = useState(null)
  const [conversionError, setConversionError] = useState(null); // Track errors


  const handleConvert = async () => {
    try {
      const response = await axios.post('https://crypto-convertor-app.onrender.com/convert', {
        from,
        to,
        amount,
      });
      setConvertedAmount(response.data.convertedAmount);
      setTargetCurrencySymbol(response.data.targetCurrencySymbol);
      setConversionError(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setConvertedAmount(null);
      setTargetCurrencySymbol(null);
      setConversionError('Conversion failed. Please check your inputs and try again.');
    }
  };

  return (
    <div id='body'>
      <h1 id='title'>Crypto Currency Conversion</h1>

      <div id='card'>
        <div>
          <label className='all-labels'>
            From:-
            <select className='select-tag' value={from} onChange={(e) => setFrom(e.target.value)}>
              {Object.entries(currency.cryptoCurrencies).map(([cryptoName, cryptoCode]) => (
                <option style={{ color: "black" }} key={cryptoCode} value={cryptoCode}>
                  {cryptoName}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label className='all-labels'>
            To:-
            <select className='select-tag' value={to} onChange={(e) => setTo(e.target.value)}>
              {Object.entries(currency.physicalCurrencies).map(([currencyName, currencyCode]) => (
                <option style={{ color: "black" }} key={currencyCode} value={currencyCode}>
                  {currencyName}
                </option>
              ))}
            </select>
          </label >
          <br />
          <label className='all-labels'>
            Trading for:-
          </label>
          <br />
          <input type="number" className="input-tag" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <br />
          <button id="button-tag" onClick={handleConvert}>Convert</button>
        </div>
        {conversionError && <div className="error">{conversionError}</div>}
        {convertedAmount !== null && (
          <div className={convertedAmount === 0 ? "converted-amt" : "zero-value"} style={{ textAlign: 'center' }}>
            <p>Converted Amount: {targetCurrencySymbol} {convertedAmount}</p>
          </div>
        )}
      </div>

    </div >
  );
}

export default App;
