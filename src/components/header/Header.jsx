import './Header.scss'
import { useRef, useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const audioRef = useRef(null)
    const [ isPlaying, setIsPlaying] = useState(false)
    const handlePlayMusic = ()=>{
        setIsPlaying(prev=>!prev)
    }
    useEffect(()=>{
        if(isPlaying){
            audioRef.current.play()
        }
        else{
            audioRef.current.pause()
        }
    },[isPlaying])
    return ( 
        <div className='header'>
            <div className="header-logo">
                <img src="/assets/img/pokemon-removebg.png" alt="" />
            </div>  
            <ul className='header-nav'>
                <Link to="/expoler">
                    <li>
                        <div>
                            <i className="fa-solid fa-book"></i>
                        </div>
                        <p>Expoler</p>
                    </li>
                </Link>
                <Link to="/evolution">
                    <li>
                        <div>
                            <i className="fa-solid fa-dna"></i>
                        </div>
                        <p>Evolution</p>
                    </li>
                </Link>
            </ul>
            <audio loop ref ={audioRef} src="/assets/music/mainAudio.mp3"></audio>
            <span className="volume-btn"
                onClick={handlePlayMusic}
            >
                {
                    isPlaying ? (<i className="fa-solid fa-volume-high"></i>)
                        : (<i className="fa-solid fa-volume-xmark"></i>)
                }
            </span>
        </div>
     );
}

export default Header;