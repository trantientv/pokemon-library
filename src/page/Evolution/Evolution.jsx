import classNames from "classnames/bind";

import styles from './Evolution.module.scss'
import EvolutionContent from '../../components/evolutionContent/EvolutionContent'

let cx = classNames.bind(styles)

function Evolution() {
    return (
        <div className={cx('wrapper')}>
            <EvolutionContent/>
        </div>
    )
}

export default Evolution;