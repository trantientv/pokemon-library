import { Link } from 'react-router-dom'

import './PokemonItem.scss'
import checkTypePokemon from '../../utils/checkTypePokemon'

function PokemonItem({pokemonItem}) {
    const typeList =  checkTypePokemon(pokemonItem.info.types)
    return ( 
            <div className="pokemon-item">
                <div className='pokemon-item-effect'>
                    <div ></div>
                    <div ></div>
                </div>
                <Link to={`pokemon/${pokemonItem.name}`} state={{info:pokemonItem}}>
                    <div className="pokemon-img">
                        <img style={{filter: `drop-shadow(4px -4px 6px ${typeList[0].color})`}} src={pokemonItem.info.sprites.other.dream_world.front_default} alt="" />
                    </div>
                </Link >
                <div className="pokemon-info">
                    <Link to={`pokemon/${pokemonItem.name}`} state={{info:pokemonItem}}>
                        <p className="pokemon-info-name">{pokemonItem.info.name}</p>
                    </Link>
                    <div className="pokemon-info-types">
                        {
                            typeList.map((type,index)=> <div key={index}>{type.icon}</div>)
                        }
                    </div>
                </div>
            </div>
     );
}

export default PokemonItem;