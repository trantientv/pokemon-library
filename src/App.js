import './App.css';
import { Routes , Route} from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Home from './page/Home/Home'
import PokemonDetail from './page/DetailPokemon/PokemonDetail'
import Evolution from './page/Evolution/Evolution'
import Expoler from './page/Expoler/Expoler'
import Notfound from './page/NotFound/NotFound';

import { updateList, pushItem} from './redux/slice/pokemonListSlice'
import { setAllPokemon } from './redux/slice/allPokemonSlice'

function App() {
  const dispatch = useDispatch()
  const pokemonListRedux = useSelector((state)=>state.pokemonList.pokemonList)
  const getPokemonList = async (url)=>{
    return await axios.get(url)
        .then(res=>{
            return res.data.results
        })
        .then(listPokemon => listPokemon.map(async item => 
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
            .then(res=> {
                let newItem = {
                    name : item.name,
                    info : res.data
                };
                dispatch(pushItem(newItem))
            })     
        ),
        )
        .then(()=>dispatch(updateList(pokemonListRedux)))
  }
  const getAllpokemon = async ()=>{
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0")
    const data = res.data.results
    dispatch(setAllPokemon(data))
  }

  useEffect(()=>{
      getPokemonList(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
      getAllpokemon()
  },[])

  return (
    <div className="App">
        <div className='dont-support'>
            <h1>Sorry, We don't support this device</h1>
        </div>
        <Routes>
          <Route path ="/" element = {<Home/>}></Route>
          <Route path ="/evolution" element = {<Evolution/>}></Route>
          <Route path ="/expoler" element = {<Expoler/>}></Route>
          <Route path ="/pokemon/:name" element = {<PokemonDetail/>}></Route>
          <Route path ="*"  element = {<Notfound/>}></Route>
        </Routes>
    </div>
  );
}

export default App;   