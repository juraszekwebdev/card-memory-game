import React from "react";

const Paused = () => {
    return (
        <React.Fragment>
            <div className="popup">
                <div className="popup-overlay"/>
                <div className="popup-content">
                    <h2>Game PAUSED</h2>
                    <p>Click P again to unpause</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Paused;