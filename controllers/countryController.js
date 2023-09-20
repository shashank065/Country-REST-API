import axios from 'axios';

// Define the base URL for the REST Countries API
const baseUrl = `https://restcountries.com/v3.1`
// Get detailed information about a specific country by name
export async function findCountryByName(req, res){
  const { name } = req.params;
  try {
    const response = await axios.get(`${baseUrl}/name/${name}`);
    if (response.data.length === 0) {
      res.status(404).json({ error: 'Country not found' });
    } else {
      res.json(response.data[0]);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unable to fetch country details' });
  }
};


// Function to filter countries based on criteria
function filterCountries(data, criteria) {
  return data.filter((country) => {
    // Filter by language
    if (criteria.language && country.languages) {
      const languages = Object.values(country.languages).map((el)=> { return el.toLowerCase()});
      if ( languages.indexOf(criteria.language.toLowerCase()) === -1) {
        return false;
      }
    }

    // Filter by population
    if (criteria.population && country.population) {
      if (country.population < criteria.population) {
        return false;
      }
    }

    // Filter by area
    if (criteria.area && country.area) {
      if (country.area < criteria.area) {
        return false;
      }
    }

    return true; // Include the country in the filtered result
  });
}

export async function getCountryNames(req, res) {
  try {
    // Fetch data from the REST Countries API
    const response = await axios.get(`${baseUrl}/all`);
    const countryData = response.data;

    // Extract query parameters
    const { page = 1, limit = 10, language, population, area, order = 'asc', sort = 'name' } = req.query;
    const offset = (page - 1) * limit;

    const filterCriteria = {
      language: language, // Filter by language (case-insensitive)
      population: population, // Filter by minimum population
      area: area, // Filter by minimum area
    };

    const filteredCountries = filterCountries(countryData, filterCriteria);

    // Sorting
    if (sort === 'name') {
      if (order === 'asc') {
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
      } else if (order === 'desc') {
        filteredCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
      }
    }

    if (sort === 'population') {
      if (order === 'asc') {
        filteredCountries.sort((a, b) => a.population - b.population);
      } else if (order === 'desc') {
        filteredCountries.sort((a, b) => b.population - a.population);
      }
    }

    if (sort === 'area') {
      if (order === 'asc') {
        filteredCountries.sort((a, b) => a.area - b.area);
      } else if (order === 'desc') {
        filteredCountries.sort((a, b) => b.area - a.area);
      }
    }

    // Paginate the filtered data
    const paginatedCountries = filteredCountries.slice(offset, offset + +limit);
    const countryNames = paginatedCountries.map(country => country.name.common);

    // Create metadata for the response
    const metadata = {
      total: filteredCountries.length,
      page: +page,
      limit: +limit,
      filter: filterCriteria,
      order : order,
      sort : sort
    };

    res.json({ metadata, countryNames });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}


