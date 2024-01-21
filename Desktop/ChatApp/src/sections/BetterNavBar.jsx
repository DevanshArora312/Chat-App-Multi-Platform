import { FaChevronDown } from "react-icons/fa";
import {PiChatsTeardropDuotone} from "react-icons/pi"
import {AiOutlineSearch} from 'react-icons/ai'
import {GiHamburgerMenu} from "react-icons/gi"
import SideBar from "../components/SideBar"
import { useState } from "react";
import FeaturesBar from "../components/fBar";
import { Link } from "react-router-dom";

const BetterNavBar = () => {
    const [openSide,setOpenSide] = useState(false);
    const [openFeatures,setOpenFeatures] = useState(false);
    const sideBarOperation = () => {
        setOpenSide(!openSide);
        // window.scrollTo(0,0);
    }
    const buttonStyle = "focus:outline-none bg-transparent flex items-end border-b-2 border-transparent hover:border-blue-500 duration-700 ease";
    
    const features = () => {
        setOpenFeatures(!openFeatures);
        
    }

    return (  
        <>
            <div id="Nav" className="z-2 text-black text-lg flex justify-between bg-[#FCF5EB]/80 w-full h-[15%] py-5 px-8 sticky top-0 left-0 overflow-hidden ">
                <div className="lg:hidden items-center flex">
                    <button onClick={sideBarOperation}>
                        <GiHamburgerMenu />
                    </button>
                </div>
                <div className="text-blue-500 text-2xl strong font-bold flex max-lg:text-md">
                    <PiChatsTeardropDuotone className="text-[40px] items-baseline mr-2"/>
                    ChatApp
                </div>
                <div className="bg-black text-white lg:hidden">
                    
                </div>
                <div className="flex justify-around w-[50%] items-center max-lg:hidden">
                    
                    <button className={buttonStyle} onClick={features}> 
                        Features
                        <FaChevronDown className="my-[3px]"/>
                    </button>
                    
                    <button className={buttonStyle}>Blogs</button>
                    <button className={buttonStyle}>Join us</button>
                    <button className={buttonStyle}>Desktop</button>
                    <button className={buttonStyle}>Android</button>
                </div>
                <div className="flex justify-around items-center max-lg:hidden">
                    <button className="focus:outline-none bg-transparent flex items-end border-b-2 border-transparent hover:border-blue-500 duration-700 ease">Sign Up</button>
                    <Link to="/home" className='ml-5 border-black border rounded-[50px] bg-blue-700 px-5 py-3 text-black focus:outline-none flex items-end'>
                        Explore Now <AiOutlineSearch className='mb-[5px] ml-2'/>
                    </Link>
                </div>
            </div>
            {
                openSide && <SideBar vis = {openSide} setVis = {setOpenSide}/>
            }
            {
                openFeatures && <FeaturesBar show = {openFeatures}/>
            }
        </>
    );
}
 
export default BetterNavBar;