import classNames from "classnames/bind";
import axios from "axios";
import { useDispatch, useSelector} from 'react-redux'
import { setEgg,setShow, setHabitat, setCurrent } from '../../redux/slice/expolerDetailSlice'
import styles from './ExpolerContent.module.scss'
let cx = classNames.bind(styles)


function ExpolerColumn({name,data,setShowIns}) {
    const dispatch = useDispatch()
    let current = useSelector(state=>state.expolerDetail.current)
    const handleShowDetail = async (src,name)=>{
        setShowIns(false)
        dispatch(setCurrent(""))
        switch (src){
            case "egg":
                const getDataEgg = await axios.get(`https://pokeapi.co/api/v2/egg-group/${name}`)
                const dataEgg = getDataEgg.data.pokemon_species
                dispatch(setEgg(dataEgg))
                break
            case "habitat":
                const getDataHabitat = await axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${name}`)
                const dataHabitat = getDataHabitat.data.pokemon_species
                dispatch(setHabitat(dataHabitat))
                break
            default:
                return
        }
        dispatch(setCurrent(name))
        dispatch(setShow(src))
        setShowIns(true)
    }
    let styleActive = {
        transform: "translateX(8px)",
        color : "#e5ff24"
    }
    return ( 
        <div className={cx("expoler-item")}>
            <h3>{name}</h3>
            <ul>
                {
                    data.map((item,index)=>(
                        <li key={index} 
                            style={item.name===current?styleActive:{}}
                            onClick={()=>handleShowDetail(name,item.name)}
                        >
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
     );
}

export default ExpolerColumn;