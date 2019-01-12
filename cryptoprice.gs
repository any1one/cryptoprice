function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CryptoPrice')
      .addItem('Update', 'CRYPTOPRICEALLJSON')
  .addToUi();
}

function CRYPTOPRICE(symbol, colName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = ss.getSheetByName("data");
  var data = sheet.getDataRange().getValues();
  var col = data[0].indexOf(colName);
  if (col != -1) {
    var row = -1;
    for(var i = 0; i < data.length; i++){
      if(data[i][2] == symbol){
        row = i;
        break;
      }
    }
    if (col != -1) {
      return data[row][col];
    }
    else
    {
      return "symbol not found";
    }
  }
  else
  {
    return "column not found";
  }
}

function CRYPTOPRICEALLJSON() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = ss.getSheetByName("data");

  var url="https://api.coinpaprika.com/v1/tickers?quotes=BTC,USD,ETH"; // Paste your JSON URL here

  var response = UrlFetchApp.fetch(url); // get feed
  var dataAll = JSON.parse(response.getContentText()); //
  var dataSet = dataAll;

  var rows = [], data;
  var nbCol = 0;
  rows.push(["id",
             "name",
             "symbol",
             "rank",
             "circulating_supply",
             "total_supply",
             "max_supply",
             "beta_value",
             "btc_price",
             "btc_volume_24h",
             "btc_volume_24h_change_24h",
             "btc_market_cap",
             "btc_market_cap_change_24h",
             "btc_percent_change_1h",
             "btc_percent_change_12h",
             "btc_percent_change_24h",
             "btc_percent_change_7d",
             "btc_percent_change_30d",
             "btc_percent_change_1y",
             "btc_ath_price",
             "btc_ath_date",
             "btc_percent_from_price_ath",
             "usd_price",
             "usd_volume_24h",
             "usd_volume_24h_change_24h",
             "usd_market_cap",
             "usd_market_cap_change_24h",
             "usd_percent_change_1h",
             "usd_percent_change_12h",
             "usd_percent_change_24h",
             "usd_percent_change_7d",
             "usd_percent_change_30d",
             "usd_percent_change_1y",
             "usd_ath_price",
             "usd_ath_date",
             "usd_percent_from_price_ath",
             "eth_price",
             "eth_volume_24h",
             "eth_volume_24h_change_24h",
             "eth_market_cap",
             "eth_market_cap_change_24h",
             "eth_percent_change_1h",
             "eth_percent_change_12h",
             "eth_percent_change_24h",
             "eth_percent_change_7d",
             "eth_percent_change_30d",
             "eth_percent_change_1y",
             "eth_ath_price",
             "eth_ath_date",
             "eth_percent_from_price_ath"
            ]);
  nbCol = rows[0].length;
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    rows.push([data.id,
               data.name,
               data.symbol,
               data.rank,
               data.circulating_supply,
               data.total_supply,
               data.max_supply,
               data.beta_value,
               data.quotes['BTC'].price,
               data.quotes['BTC'].volume_24h,
               data.quotes['BTC'].volume_24h_change_24h,
               data.quotes['BTC'].market_cap,
               data.quotes['BTC'].market_cap_change_24h,
               data.quotes['BTC'].percent_change_1h,
               data.quotes['BTC'].percent_change_12h,
               data.quotes['BTC'].percent_change_24h,
               data.quotes['BTC'].percent_change_7d,
               data.quotes['BTC'].percent_change_30d,
               data.quotes['BTC'].percent_change_1y,
               data.quotes['BTC'].ath_price,
               data.quotes['BTC'].ath_date,
               data.quotes['BTC'].percent_from_price_ath,
               data.quotes['USD'].price,
               data.quotes['USD'].volume_24h,
               data.quotes['USD'].volume_24h_change_24h,
               data.quotes['USD'].market_cap,
               data.quotes['USD'].market_cap_change_24h,
               data.quotes['USD'].percent_change_1h,
               data.quotes['USD'].percent_change_12h,
               data.quotes['USD'].percent_change_24h,
               data.quotes['USD'].percent_change_7d,
               data.quotes['USD'].percent_change_30d,
               data.quotes['USD'].percent_change_1y,
               data.quotes['USD'].ath_price,
               data.quotes['USD'].ath_date,
               data.quotes['USD'].percent_from_price_ath,
               data.quotes['ETH'].price,
               data.quotes['ETH'].volume_24h,
               data.quotes['ETH'].volume_24h_change_24h,
               data.quotes['ETH'].market_cap,
               data.quotes['ETH'].market_cap_change_24h,
               data.quotes['ETH'].percent_change_1h,
               data.quotes['ETH'].percent_change_12h,
               data.quotes['ETH'].percent_change_24h,
               data.quotes['ETH'].percent_change_7d,
               data.quotes['ETH'].percent_change_30d,
               data.quotes['ETH'].percent_change_1y,
               data.quotes['ETH'].ath_price,
               data.quotes['ETH'].ath_date,
               data.quotes['ETH'].percent_from_price_ath
              ]); //your JSON entities here
    nbCol = rows[0].length;
  }

  dataRange = sheet.getRange(1, 1, rows.length, nbCol); // 3 Denotes total number of entites
  dataRange.setValues(rows);
}
