const getStockNames = document.querySelector('#getStocks')
const getStockData = document.querySelector('#getData')
const Spinner = document.querySelector('.spinner')
const stockNames = document.querySelector('#stockList')
const stockData = document.querySelector('#stockData')
const tableData = document.querySelector('.tableData')
const stockChart = document.getElementById('chart').getContext('2d')
let lineChart


//Function that uses Chart.JS to plot a line chart of selected stock data. Takes timestamp and value arrays as parameters
//Time is plotted on x-axis of graph, stock values are plotted on y-axis
function drawChart(timestamps, values) {
  if (typeof lineChart !== 'undefined') {
    lineChart.destroy()
  }
  lineChart = new Chart(stockChart, {
    type: 'line',
    data: data = {
      labels: timestamps,
      datasets: [
        {
          label: 'Stock Value',
          data: values,
        }
      ]
    }
  })
}


//Display list of all stock names using fetch(). Creates <p> tags and places one stock name in each
//Shows spinner on button click, and hides it when finished. Note - spinner disappears almost instantly as code runs in milliseconds 
getStockNames.addEventListener('click', () => {
  if (typeof lineChart !== 'undefined') { //If stock chart is currently showing on the page, destroy it to display stock names alone
    lineChart.destroy()
  }
  stockNames.innerHTML = "" // Clears the HTML when the button is clicked
  tableData.innerHTML = ""
  stockData.style.display = "none"
  stockNames.insertAdjacentHTML("beforeend", "Below is a list of all available stocks:")
  fetch ('http://localhost:3000/stocks')
    .then(response => {return response.json()})
    .then(data => {
      console.table(data)
      for (let i=0; i<data.stockSymbols.length; i++) {
        var html = '<p>Name: ' + data.stockSymbols[i] + '</p>'
        stockNames.insertAdjacentHTML("beforeend", html)
    }
  })
    .catch(err => console.log(err))
})


//Display chosen stock data to table. Uses fetch() to fetch stock results then creates table elements
getStockData.addEventListener('click', () => {
  Spinner.style.display = "block"
  stockNames.innerHTML = ""
  tableData.innerHTML = ""
  let chosenStock = document.querySelector('#stockName').value
  let fetchURL = 'http://localhost:3000/stocks/' + chosenStock
  fetch(fetchURL)  
    .then(response => {
      if (response.ok) {
        return response.json() //Check if response from requested URL has status 'ok'. If not (i.e. if stock loading error occurs), throw error
      }
      throw new Error('Stock data failed to load. Please try again!')
    })
    .then(data => {
      stockData.style.display = "block"
      console.table(data)
      let stockValues = []
      let stockTimestamps = []
      data.forEach((value, index) => {
        stockValues.push(value.value.toFixed(2)) //For each item in the data object, push the stock value to value array, and push timestamp to timestamp array
        stockTimestamps.push(new Date(value.timestamp).toLocaleTimeString())  
        let rowElement = document.createElement("tr") //Create a table row for each item in the data object array
        const arrayData = [index,value.value.toFixed(2),new Date(value.timestamp).toLocaleString()]
        arrayData.forEach((v) => {
          const cellElement = document.createElement("td") //For each item in the object array, create three table data elements
          cellElement.textContent=v
          rowElement.appendChild(cellElement)
        })
        tableData.appendChild(rowElement)
      })
      drawChart(stockTimestamps,stockValues) //Call drawChart function, sending array of stock values and timestamps as parameters
      })
      .catch((error) => {
        console.log(error) //When error occurs (1 in 10 chance), logs error and displays error to user via alert box
        stockData.style.display = "none" //Hides table when error occurs to prevent empty table from displaying on page
        alert(error)
      })
      Spinner.style.display = "none" //Hide spinner when function completes
})
