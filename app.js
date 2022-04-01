const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

app.get('/stocks', async (req, res) => {
  const stockSymbols = await stocks.getStocks()
  res.send({ stockSymbols })
})


app.get('/stocks/:symbol', async (req, res) => {
  try {
    const { params: { symbol } } = req
    const data = await stocks.getStockPoints(symbol, new Date())
    res.send(data)
    console.log(`Recent stock price for ${symbol}: `)
    console.table(data)
  }catch (error) {
    console.log(error) //Maybe encase whole process in fuction and recall?
  }
})


/*
app.get('/stocks/:symbol', async (req, res) => {
  const getStockData = async function() {
      try {
        const { params: { symbol } } = req
        const data = await stocks.getStockPoints(symbol, new Date())
        res.send(data)
        console.log(`Recent stock price for ${symbol}: `)
        console.table(data)
      }catch (error) {
        console.log(error) //Maybe encase whole process in fuction and recall?
        getStockData()
      }
  }
})
*/


app.listen(3000, () => console.log('Server is running!'))
