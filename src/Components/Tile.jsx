import React from "react"
import '../Components/Tile.css'

export default function Tile({value}) {
  return <div className={`tile tile-${value}`}>
    {value !== 0 ? value : "0"}
  </div>
}
