import { useRef } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'

import { updateList, pushItem, updateUrl} from '../../redux/slice/pokemonListSlice'
import PokemonItem from '../pokemonItem/PokemonItem';
import './PokemonList.scss'
function PokemonList() {
    const pokemonListRef = useRef()
    const dispatch = useDispatch()
    const nextUrl = useSelector(state=>state.pokemonList.nextUrl)
    const pokemonListRedux = useSelector((state)=>state.pokemonList.pokemonList)

    const getPokemonList = async (url)=>{
        return await axios.get(url)
            .then(res=>{
                dispatch(updateUrl(res.data.next))
                return res.data.results
            })
            .then(listPokemon => listPokemon.map(async item => 
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
                .then(res=> {
                    let newItem = {
                        info : res.data
                    };
                    dispatch(pushItem(newItem))
                })     
            ),
            )
            .then(()=>dispatch(updateList(pokemonListRedux)))
    }
    const handleLoadMore = ()=>{
        getPokemonList(nextUrl)
    }
    
    return ( 
        <div className="pokemon-list-container"
            ref={pokemonListRef}
        >
            <div className="pokemon-list">
                {
                    pokemonListRedux.map((pokemonItem,index)=>(
                        <PokemonItem key={index} pokemonItem={pokemonItem}/>
                    ))
                }
            </div>
            <button className='load-more-btn' onClick={handleLoadMore}
            >
                <p>Load more</p>
            </button>
        </div>
     );
}

export default PokemonList;