import { useState } from 'react';
// import ReactPageScroller from 'react-page-scroller';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom'
import styles from './DetailContent.module.scss'
import InfoBasic from './infoBasic/InfoBasic';
import Abilities from './abilities/Abilities';

let cx = classNames.bind(styles)
function DetailContent() {
    const navigate = useNavigate()
    const [page,setPage] = useState(0)
    const pageLength = 2
    const list = ()=>{
        let arrayNav =[]
        for (let i= 0;i<pageLength;i++){
            if(i===page){
                arrayNav.push(<li key={i} className={cx('active')}></li>)
            }
            else{
                arrayNav.push(<li key={i}></li>)
            }
        }
        return arrayNav
    }

    return ( 
        <div className={cx('wrapper')}>
            <InfoBasic/>
            <Abilities/>
            {/* <ReactPageScroller
                animationTimer={500}
                pageOnChange={(e)=>{
                    setPage(e)
                }}
            >
                <InfoBasic/>
                <Abilities/>
            </ReactPageScroller> */}
            <ul className={cx('nav-page')}>
                {list()}
            </ul>
            <div className={cx("handle-btn")}>
                <span className={cx("back-btn")}
                    onClick={()=>navigate(-1)}
                >
                    <i className="fa-solid fa-rotate-left"></i>
                </span>
                <span className={cx("back-btn")}
                    onClick={()=>navigate("/")}
                >
                    <i className="fa-solid fa-house"></i>
                </span>
            </div>
        </div>
    );
}

export default DetailContent;