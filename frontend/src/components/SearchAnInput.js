import React,{useEffect} from "react";
import AuthContext from "../context/AuthProvider";
import "../App.css";


export default function SearchAnInput(props) {
    const [entry, setEntry] = React.useState("");
    const {auth} = React.useContext(AuthContext);

    const onFormSubmit = (event) => {
        event.preventDefault();
        props.onSearchSubmit(entry);
    }

    useEffect (() => {
        document.body.classList.remove("textBG");
    }, [])



    return (

        <div>
        {auth?.name !== undefined ?
        <div className="ui container">
          <h1 className="ui header text-center" style={{ position: 'relative', bottom: '50px', color: '#f1800e', textDecoration: 'underline' }}>Photo Finder</h1>
         </div> : null}
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
    )

}