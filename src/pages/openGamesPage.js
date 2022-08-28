import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useState } from "react";
import { Button, Box, Select, Heading, Text } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import NewGamesList from "../components/GamesList";

    export default function OpenGamesPage({ token, allGamesList, username, game, setGame, setRefresh, setAllGamesList }) {
        const [displayDate, setDisplayDate] = useState("")
    const [filteredDate, setFilteredDate] = useState(null);
    const [searchDate, setSearchDate] = useState("");
    const [filteredLoc, setFilteredLoc] = useState(null);
    const [filteredSession, setFilteredSession] = useState(null);
    const [filteredMatch, setFilteredMatch] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchLoc, setSearchLoc] = useState("");
    const [searchSession, setSearchSession] = useState("");
    const [searchMatch, setSearchMatch] = useState("");
    const [filtered, setFiltered] = useState(false);

    console.log(allGamesList);
    console.log(filteredGames);

    const handleFilterDate = (date) => {
        console.log(date);
        console.log(DateTime.fromJSDate(date).toISODate(DateTime.DATE_MED));
        const formattedDate = DateTime.fromJSDate(date).toISODate(
            DateTime.DATE_MED
        );
        setSearchDate(`&date=${formattedDate}`);
    };

    const handleFilterGameLoc = (event) => {
        console.log(event.target.value);
        setFilteredLoc(event.target.value);
        setSearchLoc(`&park-name=${event.target.value}`);
    };

    const handleFilterSession = (event) => {
        console.log(event.target.value);
        setFilteredSession(event.target.value);
        setSearchSession(`&session-type=${event.target.value}`);
    };

    const handleFilterMatch = (event) => {
        console.log(event.target.value);
        setFilteredMatch(event.target.value);
        setSearchMatch(`&match-type=${event.target.value}`);
    };

    const handleSubmitFilter = () => {
        let searchURL = "https://teammate-app.herokuapp.com/session/?";
        console.log("submit filter clicked");
        searchURL += searchDate;
        searchURL += searchLoc;
        searchURL += searchSession;
        searchURL += searchMatch;
        console.log(searchURL);

        axios
            .get(`${searchURL}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setFilteredGames(res.data);
                setFiltered(true);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.detail);
            });
    };

    return (
        <>
            <Header />
            <Box className="app-body">
                <Box textAlign="center" 
                marginTop={5} marginBottom={2} maxW='350px' marginRight='auto' marginLeft='auto'
                >
                    <ReactDatePicker
                        onChange={(date) => {
                            console.log(date);
                            setDisplayDate(date)
                            setFilteredDate(date);
                            handleFilterDate(date);
                        }}
                        minDate={subDays(new Date(), 0)}
                        selected={displayDate}
                        placeholderText="Click to Select a date"
                        // isClearable
                    >
                        {/* <Text fontSize="md" color="blue" onClick={()=>{
                            console.log('any date button on calendar filter');
                            setDisplayDate(null)
                            setFilteredDate(null)
                            handleFilterDate(null)
                        }}>Any date</Text> */}
                    </ReactDatePicker>
                    <Select
                        w="25%"
                        size="s"
                        variant="filled"
                        borderRadius={10}
                        display="inline-block"
                        onChange={handleFilterGameLoc}
                        value={filteredLoc}
                        id="filter-location"
                        name="filter-location"
                    >
                        <option value="">Location</option>
                        <option value="">All</option>
                        <option value="Pullen Park">Pullen Park</option>
                        <option value="Sanderford Park">Sanderford Park</option>
                    </Select>
                    <Select
                        w="25%"
                        size="s"
                        m={2}
                        variant="filled"
                        borderRadius={10}
                        display="inline-block"
                        onChange={handleFilterSession}
                        value={filteredSession}
                        id="filter-type"
                        name="filter-type"
                    >
                        <option value="">Competitive Level</option>
                        <option value="">All</option>
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </Select>
                    <Select
                        w="25%"
                        size="s"
                        m={2}
                        variant="filled"
                        borderRadius={10}
                        display="inline-block"
                        onChange={handleFilterMatch}
                        value={filteredMatch}
                        id="filter-type"
                        name="filter-type"
                    >
                        <option value="">Number of Players</option>
                        <option value="">All</option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                    </Select>
                    <Button
                        w="25%"
                        colorScheme="teal"
                        onClick={() => handleSubmitFilter()}
                    >
                        Filter
                    </Button>
                </Box>
                {(!filtered)?  (<NewGamesList
                    token={token}
                    gamesList={allGamesList}
                    setGame={setGame}
                    game={game}
                    setRefresh={setRefresh}
                                setAllGamesList={setAllGamesList}

                /> ):(
                    filteredGames.length>0 ? (
                        <NewGamesList 
                        token={token}
                        gamesList={filteredGames} 
                        setGame={setGame}
                        game={game}
                        setRefresh={setRefresh}
                        setAllGamesList={setAllGamesList}

                        />
                    ) : (
                        <Box textAlign='center'>No games were found matching your filters</Box>
                    )
                )}
            </Box>
            <Footer />
        </>
    );
}
