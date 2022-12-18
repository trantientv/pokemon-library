import classNames from "classnames/bind";
import { useState, useEffect  } from "react";
import { useNavigate, Outlet} from "react-router-dom";
import styles from './ExpolerContent.module.scss'
import { useSelector} from 'react-redux'
import axios from "axios";
let cx = classNames.bind(styles)

function ExpolerDetail() {
    let show = useSelector(state=>state.expolerDetail.show)
    let allEgg = useSelector(state=>state.expolerDetail.egg)
    let allHabitat = useSelector(state=>state.expolerDetail.habitat)
    const [egg,setEgg] = useState([])
    const [habitat,setHabitat] = useState([])
    let remainEgg = allEgg.slice(0,30)
    let remainHabitat = allHabitat.slice(0,30)

    useEffect(()=>{
        setEgg([])
        setHabitat([])
        if(remainEgg.length>0){
            remainEgg.map(async (egg,index)=>{
                let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${egg.name}`)
                let eggData = res.data
                setEgg(prev=>[...prev,{
                    name:eggData.name,
                    img: eggData.sprites.versions["generation-v"]["black-white"].animated.front_default || eggData.sprites.front_default
                }])
            })
        }
        if(remainHabitat.length>0){
            remainHabitat.map(async (habitat,index)=>{
                let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${habitat.name}`)
                let habitatData = res.data
                setHabitat(prev=>[...prev,{
                    name:habitatData.name,
                    img: habitatData.sprites.versions["generation-v"]["black-white"].animated.front_default || habitatData.sprites.front_default
                }])
            })
        }
    },[show,allEgg,allHabitat])
    const renderView = ()=>{
        switch (show){
            case "egg":
                return (<div className={cx("info-detail")}>
                            {
                                egg.map((egg,index)=>(
                                    <div key={index} className={cx("info-item")}>
                                        <img  src={egg.img}/>
                                        <span>{egg.name}</span>
                                    </div>
                                ))
                                
                            }
                        </div>)
            case "natures":
                return (<div className={cx("info-detail")}></div>)
            case "habitat":
                return (<div className={cx("info-detail")}>
                            {
                                habitat.map((habitat,index)=>(
                                    <div key={index} className={cx("info-item")}>
                                        <img  src={habitat.img}/>
                                        <span>{habitat.name}</span>
                                    </div>
                                ))
                                
                            }
                        </div>)
            default:
                return (<div></div>)
        }
    }
    return ( 
        <div className={cx("wrapper-detail")}>
            {
               renderView()
            }
        </div>
     );
}

export default ExpolerDetail;