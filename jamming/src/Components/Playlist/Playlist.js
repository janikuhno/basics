import React from "react";
import './Playlist.css';
/* import { Tracklist } from ''; */

export class Playlist extends React.Component {
    render() {
        return(
            <div className="New Playlist">
                <input defaultValue={'New Playlist'}/>
                {/* Add a Tracklist component */}
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}