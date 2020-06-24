
console.log('Client side javascript file is loaded!')


// use .then in new line one if the arrow function is in single line or else use return if fun body is of multiple line like : 
// .then(response => {
//      return response.json()
// })
// fetch('http://localhost:3000/weather?address=boston')
//  .then(response => response.json())
//  .then(data => display(data))


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'loading'
    messageTwo.textContent = ''  // to clear the previously showed data

    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => {
        response.json()
    .then(data => {
        if(data.error){
            return messageOne.textContent = data.error
        }
            
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
            
        })
    })

    search.value = ''
})
 