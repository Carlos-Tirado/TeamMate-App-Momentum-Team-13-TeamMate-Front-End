import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewOpenGame from "./pages/newOpenGame";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { TbBallTennis } from "react-icons/tb";
import Login from "./pages/login.js";
import { Navigate } from "react-router-dom";
import Register from "./pages/register";
import Theme from "./components/theme";
import { Text, useDisclosure } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import UserProfile from "./pages/userProfile";
import axios from "axios";
import EditGame from "./pages/editGame";
import CalendarExample from "./components/calendar-example";
import MyGames from "./pages/myGamesPage";
import OpenGamesPage from "./pages/openGamesPage";
import Survey from "./pages/survey";
import NotificationsList from "./components/NotificationsList";

function App() {
    const [token, setToken] = useLocalStorageState("teammateToken", null);
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );
    const [allGamesList, setAllGamesList] = useState([]);
    const [currentGame, setCurrentGame] = useState({});
    const [game, setGame] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(1);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    const setAuth = (username, token) => {
        setToken(token);
        setUsername(username);
    };

    useEffect(() => {
        console.log("App.js useEffect for open games");
        console.log('app reload' + reload);
        axios
            .get("https://teammate-app.herokuapp.com/session/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                // console.log(res.data);
                const responseOpen = res.data;
                const openExpandedGames = [];
                for (let game of responseOpen) {
                    const confirmedPlayers = [];
                    for (let guest of game.guest_info) {
                        // console.log(guest);
                        if (
                            guest.status === "Host" ||
                            guest.status === "Accepted"
                        ) {
                            // console.log("Confirmed Player");
                            confirmedPlayers.push(guest);
                        }
                        // console.log(confirmedPlayers);
                    }
                    const expandedGame = {
                        cardTitle: null,
                        displayStatus: "join",
                        bgColor: "#ffffff",
                        icon: null,
                        tennisBall: TbBallTennis,
                        tennisBallColor: game.host_info.profile.teammate_rank,
                        displayUsers: confirmedPlayers,
                        displayUsersUsernames: null,
                        historyStatus: null,
                        buttonTitle: null,
                        buttons: [
                            { label: "Join", job: "send a join request" },
                        ],
                        ...game,
                    };
                    // console.log(expandedGame);
                    openExpandedGames.push(expandedGame);

                    setAllGamesList(openExpandedGames);
                }
            })
            .catch((error) => {
              setToken(null)
              if (!token) {
                return <Navigate to="/" />;
            }
            });
    }, [token, setAllGamesList, reload]);

    return (
        <ChakraProvider Theme={Theme} Text={Text}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setAuth={setAuth} />} />
                    <Route
                        path="/new"
                        element={<NewOpenGame token={token} />}
                    />
                    <Route
                        path=":username/survey/:id" element={<Survey setAuth={setAuth} token={token} username={username} />} />
                    <Route
                        path="register"
                        element={<Register setAuth={setAuth} />}
                    />
                    <Route
                        path="open-games/"
                        element={
                            <OpenGamesPage
                                token={token}
                                allGamesList={allGamesList}
                                setAllGamesList
                                username={username}
                                setGame={setGame}
                                game={game}
                                reload={reload}
                                setReload={setReload}
                                onClose={onClose}
                                onOpen={onOpen}
                                isOpen={isOpen}
                                alertTitle={alertTitle}
                                alertMessage={alertMessage}
                                setAlertTitle={setAlertTitle}
                                setAlertMessage={setAlertMessage}
                            />
                        }
                    />
                    <Route
                        path="my-games/"
                        element={
                            <MyGames
                                token={token}
                                username={username}
                                game={game}
                                setGame={setGame}
                                reload={reload}
                                setReload={setReload}
                            />
                        }
                    ></Route>
                    <Route path="my-games/edit/">
                        <Route
                            path=":id"
                            element={<EditGame token={token} />}
                        />
                    </Route>

                    <Route
                        path=":username"
                        element={
                            <UserProfile
                                token={token}
                                allGamesList={allGamesList}
                                game={game}
                                username={username}
                                reload={reload}
                                setReload={setReload}
                            />
                        }
                    />
                    <Route path="my-games/calendar" element={<CalendarExample/>} />
                    {/* Notifications path is just for during development - when header is ready this will be rendered in a modal */}
                    <Route
                        path="notifications"
                        element={<NotificationsList token={token} />}
                    />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
