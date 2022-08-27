import { IconButton, Box} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { BsFillPersonFill, BsFillHouseFill, BsStickies } from "react-icons/bs";
import { SearchIcon, PlusSquareIcon, Icon } from "@chakra-ui/icons";
import useLocalStorageState from "use-local-storage-state";

function Footer() {
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );

    return (

            <Box className="footer">
                <Link to='/open-games'><a className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' 
                border= 'none' variant='outline' className='footer-button' icon={<BsFillHouseFill />} />
                <span className='tooltiptext'>Open Games</span></a></Link>
            


                <Link to='/new'><a className='tooltip'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' 
                border= 'none' variant='outline' className='footer-button' icon={<PlusSquareIcon/>} />
                <span className='tooltiptext'>New Game</span></a></Link>  


                <Link to={`/${username}`}><a className='tooltip'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' 
                border= 'none' variant='outline' className='footer-button' icon={<Icon as={BsFillPersonFill} />} />
                <span className='tooltiptext'>My Profile</span></a></Link>

                <Link to='/my-games'><a className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' 
                border= 'none' variant='outline' className='footer-button' icon={<BsStickies/>} />
                <span className='tooltiptext'>My Games</span></a></Link>

            </Box>
    

    )


}

export default Footer;
