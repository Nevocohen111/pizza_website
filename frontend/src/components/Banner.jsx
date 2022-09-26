import React from 'react';
import ReactDOM from 'react-dom';
import "../Banner.css"

function Banner({onClose}) {
    return ReactDOM.createPortal(
        <div>
        <div>
        <button className='bg-red-500 hover:bg-gray-400 text-white font-bold py-1 px-1' onClick={onClose} style={{zIndex:'9999',position:'relative',left:'34.4%',bottom:'-5.3rem',borderRadius:'1px'}}><i className="window close icon"></i></button>
        </div>
        <div className="container1" style={{zIndex:'-1'}}>
       
 
            <div className="banner">
                <div className="phrase-1">
                    Opened since 2021
                </div>
                <div className="phrase-2">
                <div>Copyright <i class="copyright icon"></i>2022</div>
                </div>
                <div className="blob-1"></div>
                <div className="blob-2"></div>
                <div className="blob-3"></div>
            </div>
        </div>
        </div>, document.querySelector('#banner-root')
    )
}

export default Banner
