import { Link } from "react-router-dom";
import styles from './NotFound.module.scss'
import classNames from 'classnames/bind';


let cx = classNames.bind(styles)
function Notfound() {
    
    let notFoundStyle = {
        position: "relative",
        backgroundColor: "#ccc",
        with: '100%',
        height: "100vh",
        display:"flex",
        justifyContent:"center",
        alignItems :"center"
    }
    return ( 
        <div style={notFoundStyle}>
            <Link to= "/" className={cx('link-home')}>X</Link>
            <h1 >Not Found, We are Sorry</h1>
        </div>
     );
}

export default Notfound;