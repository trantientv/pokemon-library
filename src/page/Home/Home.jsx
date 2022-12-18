import classNames from 'classnames/bind';
import styles from './Home.module.scss'
import { useEffect, useState } from 'react';

import Header from '../../components/header/Header'
import PokemonList from '../../components/pokemonList/PokemonList';

let cx = classNames.bind(styles)

function Home() {
    const [ isScrolllUp, setIsScrollUp] = useState(false)
    const scrollToTop = () =>{
        if(isScrolllUp){
            window.scrollTo({
                top: 0,
                behavior : "smooth"
            })
        }
        else{
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior : "smooth"
            })
        }
    }
    useEffect(()=>{
        window.addEventListener("mousewheel",(e)=>{
            e.deltaY > 0 ? setIsScrollUp(false) : setIsScrollUp(true)
        })
    },[isScrolllUp])
    return ( 
        <div className={cx('wrapper')}>
            <Header/>
            <PokemonList />
            <div className={cx("back-to-top-btn")}
                onClick={scrollToTop}
            >
                <i className={cx("fa-solid fa-chevron-up", !isScrolllUp ?"reverse":"")}/>
            </div>
        </div>
     );
}

export default Home;