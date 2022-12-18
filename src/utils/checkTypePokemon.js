const checkTypePokemon = (arrTypes)=>{
    if(arrTypes){
        const typeList = arrTypes.map(type => {
            switch (type.type.name){
                case "dragon":
                    return {
                        name: "dragon",
                        color : 'rgb(250, 162, 0)',
                        icon : <i className="fa-solid fa-dragon dragon"></i>
                    }
                case "electric":
                    return {
                        name: "electric",
                        color : 'rgb(246, 246, 11)',
                        icon : <i className="fas fa-bolt electric"></i>
                    }
                case "poison":
                    return {
                        name: "poison",
                        color : 'rgb(107, 255, 1)',
                        icon : <i className="fas fa-skull-crossbones poison"></i>
                    }
                case "ground":
                    return {
                        name: "ground",
                        color: 'rgb(99, 37, 37)',
                        icon : <i className="fas fa-mountain ground"></i>
                    }
                case "grass":
                    return {
                        name: "grass",
                        color: 'rgb(18, 105, 21)',
                        icon: <i className="fa-solid fa-seedling grass"></i>
                    }
                case "flying":
                    return {
                        name: "flying",
                        color: 'rgb(43, 174, 184)',
                        icon: <i className="fas fa-crow flying"></i>
                    }
                case "bug":
                    return {
                        name: "bug",
                        color: 'rgb(246, 148, 0)',
                        icon: <i className="fas fa-bug bug"></i>
                    }
                case "water":
                    return {
                        name: "water",

                        color: 'rgb(0, 149, 255)',
                        icon: <i className="fas fa-tint water"></i>
                    }
                case "psychic":
                    return {
                        name: "psychic",
                        color: 'rgb(204, 0, 255)',
                        icon: <i className="fa-solid fa-hat-wizard psychic"></i>
                    }
                case "fire":
                    return {
                        name: "fire",
                        color : 'rgb(248, 19, 19)',
                        icon : <i className="fa-solid fa-fire-flame-curved fire"></i>
                    }
                case "steel":
                    return {
                        name: "steel",
                        color: 'rgb(123, 123, 123)',
                        icon: <i className="fa-solid fa-shield-halved steel"></i>
                    }
                case "ice":
                    return {
                        name: "ice",
                        color: 'rgb(255, 255, 255)',
                        icon: <i className="fa-solid fa-snowflake ice"></i>
                    }
                case "fighting":
                    return {
                        name: "fighting",
                        color: 'rgb(228, 177, 130)',
                        icon: <i className="fa-solid fa-hand-fist fighting"></i>
                    }
                case "rock":
                    return {
                        name: "rock",
                        color: 'rgb(152, 43, 43)',
                        icon:<i className="fa-solid fa-cube rock"></i>
                    }
                case "ghost":
                    return {
                        name: "ghost",
                        color: 'rgb(150, 150, 150)',
                        icon: <i className="fa-solid fa-ghost ghost"></i>
                    }
                default:
                    return {
                        name: "normal",
                        color: 'rgb(255, 255, 255)',
                        icon: <i className="fa-solid fa-face-meh-blank normal"></i>
                    }
            }
        })
        return typeList
    }
}

export default checkTypePokemon