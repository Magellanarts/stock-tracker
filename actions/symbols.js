import axios from 'axios'

export const getQuotes = async (symbols) => {
  const results = await axios.get(
    `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=EB49AOOA68F7PPHE&symbols=${symbols}`
  )

  return results.data['Stock Quotes']
}
