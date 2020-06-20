
console.log('Client side java script loaded')


const formSelector = document.querySelector('form')
const searchSelector = document.querySelector('input')

formSelector.addEventListener('submit', (e) => {
    e.preventDefault();
    const stringToSearch = searchSelector.value


    fetch("/weather?location=" + stringToSearch).then((response) => {

    response.json().then((data) => {
        if(data.error){
            document.querySelector('#locationResult').innerHTML = data.error;
        }else{
            const msg = 'Location:' + data.location + '.The temperature out is ' + data.temperature + '. The chance of rain is ' + data.humidity;
            document.querySelector('#locationResult').innerHTML = msg
        }
        
    })
});

})
