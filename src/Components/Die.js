import React from "react"
export default function Die({value, handleIsHold, isHold}) {
    const styles = {
        backgroundColor: isHold ? "#59E391" : "white"
    }
    return (
        <div className="die-face" onClick={handleIsHold} style={styles}>
            <h1 className="die-number">{value}</h1>
        </div>
    )
}