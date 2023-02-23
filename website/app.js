/* Global Variables */
const apiKey = 'a94dd5a06d73874f8eb83d845fe850b1';
const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let date = new Date();
let today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

// Add event listener to generate button
generateBtn.addEventListener('click', async () => {
    const zipCode = document.getElementById('zip').value;
    if (zipCode === '') {
        alert('Kindly, Enter a zip code');
    } else {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        const todayTemperature = await getTemperature(apiUrl);
        const feelingsEntry = document.getElementById('feelings').value;
        const data = {
            temp: todayTemperature,
            date: today,
            feelings: feelingsEntry
        }
        await sendData(data);
        await updateUi();
    }
});

// Get temperature from openweathermap.org
const getTemperature = async (url) => {
    const request = await fetch(url);
    try {
        const response = await request.json();
        const temperature = response.main.temp;
        return temperature;
    } catch(error) {
        console.log('error: ',error);

    }
};

// Save data in local server
const sendData = async (data) => {
    const response = await fetch('/sendData', {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
        console.log('error: ', error);
    }
};

// Update UI with data from local server
const updateUi = async () => {
    const request = await fetch('/getData');
    try {
        const response = await request.json();
        document.getElementById('date').innerHTML = `Today: ${response.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${response.temp} Celsius`;
        document.getElementById('content').innerHTML = `Feelings: ${response.feelings}`;
    } catch(error) {
        console.log('error: ',error);

    }
};