const search = document.getElementById('search');
const matchList = document.getElementById('match-list');


/* Search and match // the json file in this folder is not being use, 
I am fetching fom a REST API  can be use when the remote API is stos working*/

async function searchCountries(searchText) {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json(); 

  //Get match to current input value
  let matches = countries.filter((country) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return country.name.match(regex) || country.alpha2Code.match(regex) || country.alpha3Code.match(regex);
  });

  if(searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};

// show search  esults

const outputHtml = matches => {
    if(matches.length > 0) {
      const html = matches.map(match => 
        `<div>
          <h2 style="color:#f6f6f6f6">${match.name}</h2>
          <svg width="50" height="25">
            <image href="${match.flag}" height="35" width="35">
          </svg> 
          <table class="table table-striped table-bordered "> 
            <tbody id="table-content" style="font-weight:800">
              <tr><td>ISO CODES(ALPHA2): <span class="text-primary">${match.alpha2Code}</span></td></tr>
              <tr><td>ISO CODES(ALPHA3): <span class="text-success">${match.alpha3Code}</span></td></tr>
              <tr><td>CAPITAL: <span class="text-info">${match.capital}</span></td></tr>
              <tr><td>CALLING CODE: <span class="text-danger">${match.callingCodes}</span></td></tr>
              <tr><td>POPULATION: <span class="text-info">${match.population}</span></td></tr>
              <tr><td>TIME ZONE: <span class="text-success">${match.timezones}</span></td></tr>
              <tr><td>CURRENCY: <span class="text-primary">${match.currencies[0].name} (${match.currencies[0].code})</span></td></tr>
            </tbody>
          </table>
        </div><br>`
    )
    .join('');

    matchList.innerHTML = html;
  }

}

/* classic fct syntax
search.addEventListener('input', function() {
  searchStates(search.value);
})
*/

// arrow => fct
search.addEventListener('input', () => searchCountries(search.value));

