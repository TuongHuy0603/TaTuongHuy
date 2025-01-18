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
  $("#rate-display").text(
    `Exchange Rate: 1 ${fromCurrencyText} = ${rate.toFixed(
      4
    )} ${toCurrencyText}`
  );
  $("#result-display").text(
    `Amount in ${toCurrencyText}: ${result.toFixed(4)}`
  );
};

$("#currency-swap-form").on("submit", calculateSwap);

$("#swap-btn").on("click", () => {
  alert("Swap successful (simulation).");
});
