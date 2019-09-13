import axios from 'axios'

export const getQuotes = async (symbols) => {
  const results = await axios.get(
    `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=EB49AOOA68F7PPHE&symbols=${symbols}`
  )

  return results.data['Stock Quotes']
}

let client

export function setClient(newclient) {
  client = newclient
}

export const saveStocks = async ({ stocks, userId }) => {
  // Update database with new array of symbols
  console.log(stocks)
  const results = await client.post(
    'http://localhost:3333/api/user/updateStocks',
    {
      symbol: stocks,
      userId
    }
  )

  return results.data
}
