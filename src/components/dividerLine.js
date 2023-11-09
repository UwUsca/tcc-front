import React from "react";

function DividerLine() {
    return(
        <div 
        className='divider'
        style={{
            height: '3px',
            borderRadius: '10px',
            backgroundImage: 'linear-gradient(-90deg,#2C24C4,#2464E4)'
        }}
        ></div>
    )
}

export default DividerLine();