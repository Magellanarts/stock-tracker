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

export const saveStocks = async ({ stocks, userId, timestamp }) => {
  // Update database with new array of symbols

  const results = await client.post(`${process.env.API_URL}user/updateStocks`, {
    symbol: stocks,
    timestamp,
    userId
  })

  return results.data
}

export const saveSnapshots = async ({ snapshots, userId }) => {
  // Update database with new array of snapshots

  const results = await client.post(
    `${process.env.API_URL}user/updateSnapshots`,
    {
      snapshots,
      userId
    }
  )

  return results.data
}
