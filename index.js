const url = 'https://covid-193.p.rapidapi.com/history?country=&day=2023-05-23';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '3ba1890afdmsh0ad4cbab99002b6p1c2b59jsn50f2fbd4c084',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
  }
}; 

var region = document.getElementById('negara');
var activeCase = document.getElementById('active-case');
var newCase = document.getElementById('new-case');
var recoveredCase = document.getElementById('recovered-case');
var totalCase = document.getElementById('total-case');
var totalDeath = document.getElementById('total-death');
var totalTest = document.getElementById('total-test');

fetch(url, options)
  .then(response => {
    console.log(response, 'ini response');
    return response.json();
  })
  .then(result => {
    console.log(result, 'ini result');
    region.textContent = result.response[0].country;
    activeCase.textContent = result.response[0].cases.active
    newCase.textContent = result.response[0].cases.new;
    recoveredCase.textContent = result.response[0].cases.recovered;
    totalCase.textContent = result.response[0].cases.total;
    totalDeath.textContent = result.response[0].deaths.total;
    totalTest.textContent = result.response[0].tests.total;
      })
      .catch(err => console.log(err));

let btnChange = document.getElementById('btn-change');

  function handleClick(event) {
    event.preventDefault();
    let inputNegaraValue = document.getElementById('input-negara').value;
    fetch(`https://covid-193.p.rapidapi.com/history?country=${inputNegaraValue}&day=2023-05-23`, options)
      .then(response => response.json())
      .then(result => {
        if (result.response.length > 0) {
          region.textContent = result.response[0].country;
          activeCase.textContent = result.response[0].cases.active;
          newCase.textContent = result.response[0].cases.new;
          recoveredCase.textContent = result.response[0].cases.recovered;
          totalCase.textContent = result.response[0].cases.total;
          totalDeath.textContent = result.response[0].deaths.total;
          totalTest.textContent = result.response[0].tests.total;
          Swal.fire("Success", "Negara ditemukan!", "success");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Data tidak ditemukan!',
            footer: 'Silakan coba lagi dengan nama negara yang valid.'
          });
        }
      })
      .catch(err => console.log(err));
  }
  
  btnChange.addEventListener('click', handleClick);
