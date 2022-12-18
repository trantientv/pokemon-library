import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind';
import { useState, useEffect} from 'react';
import axios from 'axios';

import styles from './Abilities.module.scss'
import StatsColumn from './infoDetailtComponent/StatsColumn'


let cx = classNames.bind(styles);
function Abilities() {
    const location = useLocation() 
    const {info} = location.state
    const { abilities, stats,held_items, sprites} = info.info
    const [ability,setAbility] = useState([])
    const [abilityDetails, setAbilityDetails] = useState("")

    const fetchDetailAbility = async (url)=>{
        await abilities.map(ability=>axios.get(ability.ability.url)
            .then(res=>{
                let effectEng = res.data.effect_entries.filter(effect=> effect.language.name==="en")
                let newAbility = {
                    effectEng : effectEng,
                    name : ability.ability.name
                }
                setAbility(prev=>[...prev,newAbility])
            })
        )
    }
    const handleShowAbility = (name)=>{
        let abilityShow = ability.find(ab=>ab.name===name)
        setAbilityDetails(abilityShow.effectEng[0].short_effect)
    }
    useEffect(()=>{
        fetchDetailAbility()
    },[])

    return ( 
        <div  className={cx("wrapper")}
        >
            <div className={cx("abilities")}>
                {
                    !abilityDetails && 
                        (<div className={cx("abilities-list")}> 
                            {
                                abilities.map((ability,index)=>(
                                    <div className={cx("abilities-item")} key={index}>
                                        <p>{ability.ability.name}</p>
                                        <span onClick={()=>handleShowAbility(ability.ability.name)}>
                                            <i className="fa-solid fa-question"></i>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>)
                }
                {
                    abilityDetails && (<div className={cx("abilities-detail")}>
                        <span
                            onClick={()=>setAbilityDetails("")}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                        <p style={{fontSize:"12px",marginTop: "40px", textAlign:"justify"}}>{abilityDetails}</p>
                    </div>)
                }               
            </div>
            <div className={cx("stats")}>
                {
                    stats.map((stat,index)=>(
                        <StatsColumn key={index} stats={stat}/>
                    ))
                }
            </div>
            <div className={cx("held-item")}>
                {
                    held_items.map((item,index)=>(
                        <p key={index}>{item.item.name}</p>
                    ))
                }
            </div>
            <div className={cx("sprites")}>
                <div className={cx("sprites-item")}>
                    <img src={sprites.versions["generation-v"]["black-white"].animated.back_default} alt="" />
                </div>
                <div className={cx("sprites-item")}>   
                    <img src={sprites.versions["generation-v"]["black-white"].animated.front_default} alt="" />
                </div>
            </div>
        </div>
     );
}

export default Abilities;