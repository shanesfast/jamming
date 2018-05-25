import React from 'react';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { PlayList } from '../PlayList/PlayList.js';
import './AppPlayList.css';

export const AppPlayList = (props) => {
    return (
      <div className="App-playlist">
        <SearchResults
        artist={props.artist}
        album={props.album}
        track={props.track}
        onClick={props.onClick}
        onAdd={props.onAdd}
        sortBy={props.sortBy}
        addAlbum={props.addAlbum}
        getAlbums={props.getAlbums} />
        <PlayList
        artist={props.artist}
        album={props.album}
        track={props.track}
        playListTracks={props.playListTracks}
        onClick={props.onClick}
        remove={props.remove} />
      </div>
    );
}
