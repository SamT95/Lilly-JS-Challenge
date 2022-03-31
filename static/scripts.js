const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')
const getStockNames = document.querySelector('#getStocks')
const getStockData = document.querySelector('#getData')
const Spinner = document.querySelector('.spinner')
const stockNames = document.querySelector('#stockList')
const stockData = document.querySelector('#stockData')
const tableData = document.querySelector('.tableData')


function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])



//Display list of all stock names using fetch() 
getStockNames.addEventListener('click', () => {
  Spinner.style.display = "block";
  stockNames.innerHTML = "" // Clears the HTML when the button is clicked
  tableData.innerHTML = ""
  stockData.style.display = "none"
  stockNames.insertAdjacentHTML("beforeend", "Below is a list of all available stocks:")
  fetch ('http://localhost:3000/stocks')
    .then(response => {return response.json()})
    .then(data => {
      console.log(data)
      for (var i=0; i<data.stockSymbols.length; i++) {
        var html = '<p>Name: ' + data.stockSymbols[i] + '</p>'
        stockNames.insertAdjacentHTML("beforeend", html)
    }
  })
    .catch(err => console.log(err))
    Spinner.style.display = "none";
})


//Display chosen stock data to table. Uses fetch() to fetch stock results then creates table elements
getStockData.addEventListener('click', () => {
  stockNames.innerHTML = ""
  tableData.innerHTML = ""
  stockData.style.display = "block"
  var chosenStock = document.querySelector('#stockName').value
  /*stockData.insertAdjacentHTML("afterbegin", "Below is the recent stock data for: " + chosenStock)*/
  var fetchURL = 'http://localhost:3000/stocks/' + chosenStock
  fetch(fetchURL)
    .then(response => {return response.json()})
    .then(data => {
      for (var i=0; i<data.length; i++) {
        var rowElement = document.createElement("tr")
        for (var j=0; j<3; j++) {
          var cellElement = document.createElement("td")
          console.log(j);
          if (j==0) {
            cellElement.textContent=i;
          } 
          else if (j==1) {
            cellElement.textContent=data[i].value;
          } 
          else if (j==2) {
            cellElement.textContent=data[i].timestamp;
          }
          else {
            null;
          }
          rowElement.appendChild(cellElement);
        }
        tableData.appendChild(rowElement)
      }
    })
    .catch(err => {
      console.log(err)
      alert("The stock data failed to load. Please try again!")
    })
})


