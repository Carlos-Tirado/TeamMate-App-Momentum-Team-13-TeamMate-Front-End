import { Calendar } from "react-big-calendar";
import { luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { CheckCircleIcon, Icon } from "@chakra-ui/icons";
import { FaQuestionCircle } from "react-icons/fa";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    Modal,
    Text,
} from "@chakra-ui/react";
import GameDetail from "./GameDetail";


const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 });

export default function CalendarExample({  token, username, confirmedGames, actionRequiredGames, pendingPOVGuestGames, noGuestGames, hostOpenDoublesGames, guestOpenDoublesGames }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [game, setGame] = useState(null);
    const [calendarGames, setCalendarGames] = useState([]);
    let icon = 'teal'

    console.log("confirmed Games" + confirmedGames);
    // console.log(confirmedGames[0].start);

    useEffect(() => {
        const combinedGames = [];
        if (actionRequiredGames.length > 0) {
            combinedGames.push(...actionRequiredGames)
        }
        console.log(combinedGames)
        if (confirmedGames.length > 0) {
            combinedGames.push(...confirmedGames)
        }
        console.log(combinedGames)
        if (pendingPOVGuestGames.length>0) {
            combinedGames.push(...pendingPOVGuestGames)
        }
        console.log(combinedGames)
        if (noGuestGames.length>0) {
            combinedGames.push(...noGuestGames)
        }
        console.log(combinedGames)
        if (hostOpenDoublesGames.length>0) {
            combinedGames.push(...hostOpenDoublesGames)
        }
        console.log(combinedGames)
        if (guestOpenDoublesGames.length>0) {
            combinedGames.push(...guestOpenDoublesGames)
        }
        console.log(combinedGames)
        setCalendarGames(combinedGames)
    }, [ actionRequiredGames, confirmedGames, pendingPOVGuestGames, noGuestGames, hostOpenDoublesGames, guestOpenDoublesGames]);

    const handleOpenModal = (game) => {
        console.log("click open");
        console.log("modal game" + game);
        setModalIsOpen(true);
        setGame(game);
    };

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
    };

    const onSelectEvent = (calEvent) => {
        console.log("calendar event clicked");
        console.log(calEvent);
        handleOpenModal(calEvent);
    };

    // const eventStyleGetter = (event, start, end, isSelected) =>{
    //     console.log(event)
    //     return{
    //         backgroundColor: "#ffffff"
    //     }
    // }

    return (
        <>

        {(calendarGames.length===0) ? (
            <Box> 
            <Text>Bummer, you don't have any upcoming games. Go to Open Games to join a game, or start your own! </Text>
            </Box>
        ) : (
 <Box h='460px' maxW='400px'  m='auto'>
            {/* Container element around Calender needs to have height specified for it to show up on the page */}
            <Calendar
                localizer={localizer}
                views={['month', 'agenda']}
                events={calendarGames}
                startAccessor="start"
                endAccessor="end"
                popup
                // components={{event: Event}}
                tooltipAccessor={null}
                onSelectEvent={onSelectEvent}
                eventPropGetter={(event, start, end, isSelected) => ({
                    event,
                    start,
                    end,
                    style: { backgroundColor: 'rgba(255, 255, 255, 1)', height: 25, borderColor: 'teal', padding: '1em' },
                })}
            />
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Game Detail Modal"
                game={game}
            >
                <GameDetail
                    token={token}
                    game={game}
                    handleCloseModal={handleCloseModal}
                    setModalIsOpen={setModalIsOpen}
                    username={username}
                />
            </Modal>
        </Box>
        )}

       </>
    );
}

