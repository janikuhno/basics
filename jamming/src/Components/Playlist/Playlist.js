import React from "react";
import './Playlist.css';
/* import { TrackList } from ''; */

export class Playlist extends React.Component {
    render() {
        return(
            <div className="New Playlist">
                <input defaultValue={'New Playlist'}/>
                {/* Add a TrackList component */}
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}