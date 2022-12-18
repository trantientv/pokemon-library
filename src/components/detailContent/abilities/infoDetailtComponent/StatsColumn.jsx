import classNames from 'classnames/bind';

import styles from './infoDetail.module.scss'
let cx = classNames.bind(styles)

function StatsColumn({stats}) {
    const {base_stat,effort, stat}= stats
    const renderStat = (value)=>{
        let arrStatLine = []
        let numberOfLine = Math.ceil(15 * value / 100)
        for(let i = 0;i<15;i++){
            i<numberOfLine ? 
                arrStatLine.push(<li key={i} style={effort?{backgroundColor: "#f1561e"}:{}} className={cx("line","active")}></li>)
                : arrStatLine.push(<li key={i} className={cx("line")}></li>)        
        }
        return arrStatLine
    }
    
    return ( 
        <div className={cx('stats-column-wrapper')}>
            <ul className={cx("stat-column-block")}>
                {
                    renderStat(base_stat)
                }
            </ul>
            <span style={effort?{fontWeight:"600", color:"#f1561e",textShadow:" 0 0 3px #000, 2px 2px 7px #f1561e, -2px -2px 7px #f1561e"}:{color: "beige"}}
            >
                {stat.name}
            </span>
        </div>
     );
}

export default StatsColumn;