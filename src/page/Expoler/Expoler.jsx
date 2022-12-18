import classNames from "classnames/bind";

import styles from './Expoler.module.scss'
import ExpolerContent from '../../components/expolerContent/ExpolerContent'

let cx = classNames.bind(styles)

function Expoler() {
    return (
        <div className={cx('wrapper')}>
            <ExpolerContent/>
        </div>
    )
}

export default Expoler;