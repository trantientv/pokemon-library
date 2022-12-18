import classNames from "classnames/bind";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom'

import styles from './EvolutionContent.module.scss'
let cx = classNames.bind(styles)

function EvolutionItem() {
    const navigate = useNavigate()
    const [item,setItem]= useState([])
    const [loading,setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [alert ,setAlert] = useState(false)
    const getDataEvolution = async ()=>{
        if(searchValue<1 || searchValue > 468){
            setAlert(true)
            setTimeout(()=>{setAlert(false)},3000)
            return
        }
        setLoading(true)
        const idSearch = Number(searchValue)
        let queueList= []
        setItem([])
        const res = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${idSearch}`)
        const allData = res.data
        console.log(res)
        const resFirstEvo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${allData.chain.species.name}`)
        queueList.push(resFirstEvo)
        if(allData.chain.evolves_to.length>0){
            const resSecondEvo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${allData.chain.evolves_to[0].species.name}`)
            queueList.push(resSecondEvo)
        }
        let specialEvoData= [];
        if(allData.chain?.evolves_to[0]?.evolves_to.length > 0){
            const resThirdEvo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${allData.chain.evolves_to[0].evolves_to[0].species.name}`)
            const resSpecialEvo = await axios.get(allData.chain.evolves_to[0].evolves_to[0].species.url)
            specialEvoData = resSpecialEvo.data.varieties.filter(evo=>!evo.is_default).map( s =>  axios.get(s.pokemon.url))
            queueList.push(resThirdEvo)
        }
        Promise.all([...queueList,...specialEvoData])
            .then(data=>{
                data.forEach(item =>  setItem(prev=>[...prev,{
                    name: item.data.name,
                    img : item.data.sprites.front_default
                    }]) 
                )
            })  
        setLoading(false)
        setAlert(false)
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx("back-btn")}
                onClick={()=>navigate(-1)}
            >
                <i className="fa-solid fa-backward"></i>
            </div>
            <div className={cx("handle-search")}>
                <input type="number" 
                    value={searchValue}
                    placeholder="Enter ID of Pokemon"
                    onChange={e=>setSearchValue(e.target.value)}
                    onKeyDown={e=>{
                        if(e.key==="Enter"){
                            getDataEvolution()
                        }
                    }}
                />
                {alert && <span className={cx("alert")}>ID must be between 1 and 468</span>}
                { !loading ? 
                    <div onClick={getDataEvolution}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    :<i className={cx("fa-solid fa-spinner","loading")}></i>}
            </div>
            <div className={cx("evolution-list")}>
                {
                    item?.map((evoItem,index)=>(
                        <div key={index} className={cx("evolution-item")}>
                            <img src={evoItem.img} alt="" />
                            <p>{evoItem.name}</p>
                        </div>
                    ))
                }
            </div>         
        </div>
     );
}

export default EvolutionItem;