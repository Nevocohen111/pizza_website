import React, { useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import "../App.css";


export default function SearchAnInput(props) {
    const [entry, setEntry] = React.useState("");
    const { auth } = React.useContext(AuthContext);

    const onFormSubmit = (event) => {
        event.preventDefault();
        props.onSearchSubmit(entry);
    }

    useEffect(() => {
        document.body.classList.remove("textBG");
    }, [])



    return (
        <div>
            <div className="ui center aligned icon header" >
                <i className="circular images icon" style={{ backgroundColor: '#E97451' }}></i>
            </div>
            <br></br>
            <div className="container ml-48 px-96 slide-in-left" style={{ opacity: '0.85' }}>
                <div className="ui segment" style={{ backgroundColor: '#E97451' }}>
                    <div className="flex flex-col items-center justify-center p-20">
                        <form>
                            <div className="ui massive icon input mb-8">
                                <input type="text" placeholder="Search..." onChange={(e) => setEntry(e.target.value)} style={{ width: '605px' }} value={entry}></input>
                            </div>

                            <div className="ui massive icon input">
                                <button onClick={onFormSubmit} ><i className="search icon" style={{ marginLeft: '-50px' }} ></i></button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 mb-5 ">

                        {props.images.length > 0 ? props.images.map((image) => { return <div className="ui big images myImages" key={image.id} ><img src={image.largeImageURL} alt={image.tags} className="myImage" /> </div> }) :
                            <div className="ui segment" style={{ width: '605px' }}><img src="https://react.semantic-ui.com/images/wireframe/paragraph.png" alt="Empty content text field" className="ui image" />
                                <div className="ui active dimmer">
                                    <div className="ui text loader"></div>
                                    <br></br><br></br><br></br><br></br>
                                    <div className="ui placeholder">No content</div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )

}