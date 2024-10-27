import React from 'react';
import './App.css';
import { Button } from '@mui/material'; 
import TextField from '@mui/material/TextField';
import Header from './components/Header'; 
import json from './web-scraper/sponsors_readable.json'

const App = () => {
    const [searchBar, setSearchBar] = React.useState("");
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [displayResult, setDisplayResult] = React.useState(true); // Check to false for default
    
    //const [json, setData]= React.useState(null);
    const [searchedResult, setSearchedResult] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(null);

    const toggleAdvancedSearch = () => {
        setIsExpanded(!isExpanded);
    };

    const setInput = (e) => {
        setSearchBar(e.target.value);
    };

    const searchSponsors = () => {
        // Implement your API calls here
        /* fetch('/sponsors.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          return response.json();
        })
        .then((jsonData) => {
            console.log(searchedResult);
            setData(jsonData);
        })
        .catch((error) => console.error('Error fetching data:', error)); */
        console.log(json);
    };

    const displayFilteredData = (i) => {
        return (
            <div className="cardGroup">
            {filteredData.slice(i, i+2).map((data) =>
                (
                    <div className="resultCard">
                        <div>{data["name"]}</div>
                        <img className="logo" src={data["logo"]}></img>
                        <div>Average Attendance : <strong>{Math.round(data["participants_num"]/data["hackathon_num"])}</strong></div>
                        <div>Keywords : <strong>{data["keywords"].slice(0,2).map((e, index)=>(<> {e}{index!=1 && ", "}</>))}</strong></div>
                    </div>
                )
            )}
            </div>
            
        )
    }
    const filterData = (lowercasedQuery) => {
        
        const filtered = json.filter(item => 
            item['name'].toLowerCase().includes(lowercasedQuery) ||
            item['keywords'].some(keyword => keyword.toLowerCase().includes(lowercasedQuery)) ||
            item['locations'].some(location => location.toLowerCase().includes(lowercasedQuery)) ||
            item['participants_num']/item['hackathon_num'] <= parseInt(lowercasedQuery)+parseInt(lowercasedQuery)*0.5
        );
        setFilteredData(filtered);
        console.log(filtered);
    }

    React.useEffect(searchSponsors, []);
    
    React.useEffect(() => {
        const lowercasedQuery = searchedResult.toLowerCase().split(",").map(element => element.trimStart())
        lowercasedQuery.forEach((query) => filterData(query));
        

    }, [searchedResult]);
    return (
        <div className="App">
            <Header />
            <main>
                <div className="searchBar">
                    <TextField
                        type="search"
                        id="search"
                        name="search"
                        label="Search sponsor..."
                        value={searchBar}
                        onChange={setInput}
                        variant="outlined"
                        sx={{
                          '& .MuiInputBase-input': {
                              color: 'white', // Text color
                          },
                          '& .MuiInputLabel-root': {
                              color: 'white', // Label color
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color for outlined variant
                        },
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {setSearchedResult(searchBar);}} 
                        disabled={!searchBar}
                        sx={{ backgroundColor: '#228B56'}}
                    >
                        Search
                    </Button>
                </div>
                
                <div className="advancedSearch text-bold">
                    <div>
                        Advanced Search
                        <Button onClick={toggleAdvancedSearch} className="arrowButton">
                            {isExpanded ? '▲' : '▼'}
                        </Button>
                    </div>
                    {isExpanded && (
                        <>
                            <div className="optionGroup">
                                <label htmlFor="number">Number of attendees</label>
                                <select name="number" id="number">
                                    <option>0 - 50</option>
                                    <option>50 - 100</option>
                                    <option>100 - 1000</option>
                                    <option>1000+</option>

                                </select>
                            </div>

                            <div className="optionGroup">
                                <label htmlFor="format">In-person/online</label>
                                <select name="format" id="format">
                                    <option>In-Person</option>
                                    <option>Online</option>
                                </select>
                            </div>

                            
                        </>
                    )}
                </div>
                
                {displayResult && (
                    <>
                        <div className="result">
                            <div className='resultsHeader text-bold'>Results</div>
                                {filteredData && displayFilteredData(0)}
                                {filteredData && displayFilteredData(20)}
                                {filteredData && displayFilteredData(40)}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default App;