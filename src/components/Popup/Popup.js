import React from "react";

const Popup = props => {
    const {setIsPopupOpened, content} = props;

    return (
        <React.Fragment>
            <div className="popup">
                <div className="popup-overlay" onClick={() => setIsPopupOpened(false)} />
                <div className="popup-content">
                    <div className="close" onClick={() => setIsPopupOpened(false)}/>
                    <h2>{content.heading}</h2>
                    {content.content}<br />
                    {content.button}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Popup;