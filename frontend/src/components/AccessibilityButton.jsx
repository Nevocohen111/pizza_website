import React from "react";
import Portal from "./Portal";
import { useEffect } from "react";
import myCursor from "../assets/images/cursor.png";

export default function AccessibilityButton() {
    const [grayScale, setGrayScale] = React.useState(false);
    const [contrast, setContrast] = React.useState(false);
    const [fontSize, setFontSize] = React.useState(false);
    const [cursor, setCursor] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    useEffect(() => {
        document.body.classList.remove("textBG");
    }, [])

    const toggleCursorOnClick = () => {
        setCursor(!cursor);
        if (cursor) {
            document.body.style.cursor = `url(${myCursor}), auto`;
        } else {
            document.body.style.cursor = "default";
        }
    }

    const toggleBodyColorOnClick = () => {
        setGrayScale(!grayScale);
        if (!grayScale)
            document.body.style = 'background-image=url(React_projects/pizza_shop/src/assets/images/pizzaBackground.jpg);filter:grayscale(100%);';

        else
            document.body.style = 'background-image=url(React_projects/pizza_shop/src/assets/images/pizzaBackground.jpg);'

    }

    const toggleBodyContrastOnClick = () => {
        setContrast(!contrast);
        if (!contrast)
            document.body.style = 'background-image=url(React_projects/pizza_shop/src/assets/images/pizzaBackground.jpg);filter:contrast(220%);';

        else
            document.body.style = 'background-image=url(React_projects/pizza_shop/src/assets/images/pizzaBackground.jpg);'

    }

    const toggleBodyFontSizeOnClick = () => {
        setFontSize(!fontSize);
        if (!fontSize) {
            document.body.style.fontSize = '1.4rem';
            document.querySelectorAll('.menuHeader').forEach((element) => {
                element.style.fontSize = '2rem';
            });
            document.getElementsByClassName('navbarChangeSize')[0].style.padding = '1.5rem';
            document.getElementsByClassName('navbarChangeSize')[0].style.fontSize = '1.2rem';
            document.getElementsByClassName('menuButton')[0].style.fontSize = '1.2rem';
        }
        else {
            document.body.style.fontSize = '1rem';
            document.querySelectorAll('.menuHeader').forEach((element) => {
                element.style.fontSize = '1.2rem';
            });
            document.getElementsByClassName('navbarChangeSize')[0].style.padding = '0rem';
            document.getElementsByClassName('navbarChangeSize')[0].style.fontSize = '1rem';
            document.getElementsByClassName('menuButton')[0].style.fontSize = '1rem';
        }
    }




    return (
        <>
            <div className="ui compact menu positive " style={{ width: '144.5px', backgroundColor: "#50C878", position: 'relative', top: '-14px' }}>
                <div className="ui simple dropdown item" style={{ width: '144.5px', display: "inline" }} >
                    <i className="wheelchair icon" style={{ marginLeft: "25px" }}></i>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <button onClick={() => { toggleBodyColorOnClick() }} className="item">Gray Shade <i className="bitbucket icon"></i></button>
                        <button onClick={() => { toggleBodyContrastOnClick() }} className="item">Contrasity <i className="adjust icon" style={{ position: 'relative', left: '5px' }}></i></button>
                        <button onClick={() => { toggleBodyFontSizeOnClick() }} className="item">Big Font <i className="font icon" style={{ position: 'relative', left: '20px' }}></i></button>
                        <button onClick={() => {toggleCursorOnClick ()}} className="item">Cursor <i className="mouse pointer icon" style={{ position: 'relative', left: '29px' }}></i></button>
                        <button onClick={() => setShowModal(true)} className="item"><p style={{ fontSize: '0.8rem', color: '#4169e1', fontWeight: 'bolder' }}>Accessibility statement</p></button>
                    </div>
                </div>
            </div>
            {showModal && <Portal onClose={() => setShowModal(false)} />}
        </>

    );
}