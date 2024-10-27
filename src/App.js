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
    
    const [participantOption, setParticipantOption] = React.useState("")
    const [onlineOption, setOnlineOption] = React.useState("")

    //const [json, setData]= React.useState(null);
    const [searchedResult, setSearchedResult] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(json);

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
    const handlParticipantSelectChange = (event) => {
        setParticipantOption(event.target.value); // Update state with selected value
    };

    const handleOnlineSelectChange = (event) => {
        setOnlineOption(event.target.value); // Update state with selected value
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
                        <div>Keywords : <strong>{data["keywords"].slice(0,2).map((e, index)=>(<> {e}{index!==1 && ", "}</>))}</strong></div>
                    </div>
                )
            )}
            </div>
            
        )
    }
    const filterData = (lowercasedQuery) => {
        
        
        const filtered = json.filter(item => 
            lowercasedQuery.every((item1)=> 
                item['name'].toLowerCase().includes(item1) ||
                item['keywords'].some(keyword => keyword.toLowerCase().includes(item1)) ||
                item['locations'].some(location => location.toLowerCase().includes(item1)) ||
                item['participants_num']/item['hackathon_num'] <= parseInt(item1)+parseInt(item1)*0.5
            )
            
        );
        setFilteredData(filtered);
        console.log(filtered);
    }

    React.useEffect(searchSponsors, []);
    
    React.useEffect(() => {
        const result = searchedResult + participantOption;
        const lowercasedQuery = result.toLowerCase().split(",").map(element => element.trimStart())
        filterData(lowercasedQuery);
        

    }, [searchedResult, participantOption]);

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
                                <select name="number" onChange={handlParticipantSelectChange} id="number">
                                    <option value=",">None</option>
                                    <option value=",25">0 - 50</option>
                                    <option value=",75">50 - 100</option>
                                    <option value=",500">100 - 1000</option>
                                    <option value =",10000">1000+</option>

                                </select>
                            </div>

                            <div className="optionGroup">
                                <label htmlFor="format">In-person/online</label>
                                <select name="format" id="format" onChange={handleOnlineSelectChange}>
                                    <option value="">In-Person</option>
                                    <option value="online" >Online</option>
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