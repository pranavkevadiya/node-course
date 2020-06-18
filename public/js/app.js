
console.log('Client side java script loaded')


const formSelector = document.querySelector('form')
const searchSelector = document.querySelector('input')

formSelector.addEventListener('submit', (e) => {
    e.preventDefault();
    const stringToSearch = searchSelector.value


    fetch("http://localhost:3000/weather?location=" + stringToSearch).then((response) => {

    response.json().then((data) => {
        if(data.error){
            document.querySelector('#locationResult').innerHTML = data.error;
        }else{
            document.querySelector('#locationResult').innerHTML = 'humidity :' + data.humidity;
        }
        
    })
});

})
