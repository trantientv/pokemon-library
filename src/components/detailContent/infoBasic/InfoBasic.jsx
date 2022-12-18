import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from '../../../utils/customHook/useDebounce'

import styles from './InfoBasic.module.scss'
import checkTypePokemon from '../../../utils/checkTypePokemon';

let cx = classNames.bind(styles);

function InfoBasic() {
    const allPokemon = useSelector(state=>state.allPokemon.allPokemon)
    const location = useLocation()
    const navigate = useNavigate()
    const {info} = location.state
    const { weight, height, types, sprites, base_experience, id,name } = info.info
    const typeList = checkTypePokemon(types)
    const [ searchValue, setSearchValue ] = useState("")
    const [ suggest, setSuggest ] = useState([])
    const [ found, setFound ] = useState(false)
    const debounceSearch = useDebounce(searchValue,800)
    const [loading,setLoading] = useState(false)
    const handleSearch = async ()=>{
        setLoading(true)
        try {
            setFound(false)
            const res =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
            let data = res.data
            navigate(`/pokemon/${searchValue}`,{state:{info:{info:data}}},{ replace: false }) 
        }
        catch{
            setFound(true)
        }    
        setLoading(false)
        setSearchValue("")
        setSuggest([])
    }
    const handleChange = (e)=>{
        setSearchValue(e.target.value)
    }
    useEffect(()=>{
        const listSuggestRaw = allPokemon.filter(p=>p.name.includes(searchValue.trim()))
        if(searchValue.trim()!==""){
            const listSuggestSlice = listSuggestRaw.slice(0,4)
            setSuggest(listSuggestSlice)
        }
    },[debounceSearch])
    return ( 
        <div className={cx('detail-content')}>
            <div className={cx('detail-content-name')}>
                <p>{id}</p>
                <p>{name}</p>
            </div>
            <div className={cx('detail-content-img')}>
                <img className={cx('detail-content-img-thumb')} src="https://vn.portal-pokemon.com/play/resources/pokedex/img/pokemon_bg.png" alt="" />
                <img className={cx('detail-content-img-center')} src="https://vn.portal-pokemon.com/play/resources/pokedex/img/pokemon_circle_bg.png" alt="" />
                <div className={cx('detail-content-img-avt')}
                        style={{backgroundImage: `url(${sprites.other.dream_world.front_default||sprites.front_default})`}}
                >
               </div>
               <div className={cx('detail-content-img-effect')}>
                    <div className={cx('img-effect')}>
                        <p>Weight: {weight}</p>
                    </div>
                    <div className={cx('img-effect')}>
                        <p>Height: {height}</p>
                    </div>
                    <div className={cx('img-effect')}>
                        <p>Exp: {base_experience}</p>
                    </div>
                    <div className={cx('img-effect')}>
                        <div className={cx('detail-content-types')}>
                            <ul>
                                {
                                    typeList.map((type,index)=>(
                                        <li key={index} className={cx('detail-content-types-item')}>
                                            <div>
                                                {type.icon}
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
               </div>
            </div>
            <div className={cx("header-search")}>
                <input id="search" type="text" 
                    value={searchValue}
                    onChange={(e)=>handleChange(e)}
                    onKeyDown={(e)=> {
                        if(e.key==="Enter"){
                            handleSearch()
                        }
                    }}
                    autoComplete="off"
                    placeholder="Let's a discovery"
                />
                <ul className={cx("suggest-list")}>
                    {
                        suggest.map((suggest,index)=>(
                            <li key={index} className={cx("suggest-item")}
                                onClick={()=>setSearchValue(suggest.name)}
                            >
                                {suggest.name}
                            </li>
                        ))
                    }
                </ul>
                <div onClick={handleSearch}>
                    { !loading ? <i className="fa-solid fa-magnifying-glass"></i> : <i className={cx("fa-solid fa-spinner","loading")}></i> }
                </div>
                {
                   found && (<div className={cx("alert-float")}>
                    Pokemon not found 
                    </div>)
                }
            </div>
        </div>
    );
}

export default InfoBasic;