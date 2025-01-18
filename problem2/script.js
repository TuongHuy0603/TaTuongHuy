const priceUrl = "https://interview.switcheo.com/prices.json";
let prices = {};

axios
  .get(priceUrl)
  .then((response) => {
    prices = response.data;
    console.log("zcxc", response.data);
    populateCurrencies();
  })
  .catch((error) => {
    console.error("Error fetching token prices:", error);
  });

const populateCurrencies = () => {
  const currencies = prices.map((item) => {
    return item;
  });
  const fromCurrencySelect = $("#from-currency");
  const toCurrencySelect = $("#to-currency");

  currencies.forEach((currency) => {
    const option = `<option value="${currency.price}">${currency.currency}</option>`;
    fromCurrencySelect.append(option);
    toCurrencySelect.append(option);
  });
};

const calculateSwap = (e) => {
  e.preventDefault();

  const fromCurrency = $("#from-currency").val();
  const toCurrency = $("#to-currency").val();
  const fromCurrencyText = $("#from-currency option:selected").text();
  const toCurrencyText = $("#to-currency option:selected").text();
  const amount = parseFloat($("#amount").val());

  if (!fromCurrency || !toCurrency || !amount || isNaN(amount)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const fromPrice = $("#from-currency").val();
  const toPrice = $("#to-currency").val();

  if (!fromPrice || !toPrice) {
    alert("Exchange rates not available for the selected currencies.");
    return;
  }

  const rate = fromPrice / toPrice;

  const result = amount * rate;
  const fromCurrencyImage = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromCurrencyText}.svg`;
  const toCurrencyImage = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toCurrencyText}.svg`;

  // Displaying exchange rate with images
  $("#rate-display").html(`
    <div class="center-content">
        Exchange Rate: 1 
        <img src="${fromCurrencyImage}" alt="${fromCurrencyText} icon" style="width:20px; height:20px;"/> 
        ${fromCurrencyText} = ${rate.toFixed(4)} 
        <img src="${toCurrencyImage}" alt="${toCurrencyText} icon" style="width:20px; height:20px;"/>
        ${toCurrencyText}
    </div>
`);

  $("#result-display").html(`
    <div class="center-content">
        Amount in 
        <img src="${toCurrencyImage}" alt="${toCurrencyText} icon" style="width:20px; height:20px;"/> 
        ${toCurrencyText}: ${result.toFixed(4)}
    </div>
`);
};

$("#currency-swap-form").on("submit", calculateSwap);

$("#swap-btn").on("click", () => {
  alert("Swap successful (simulation).");
});
