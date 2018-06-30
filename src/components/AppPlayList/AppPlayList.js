import React from 'react';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { PlayList } from '../PlayList/PlayList.js';
import { EditBox } from '../EditBox/EditBox.js';
import './AppPlayList.css';

export const AppPlayList = (props) => {

  if (props.showEditBox === 'open') {
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
        <EditBox
          show={props.showEditBox}
          editListPlayLists={props.editListPlayLists}
          position={props.position}
          tracks={props.editListTracks}
          onClick={props.onClick}
          remove={props.remove}
          pagination={props.pagination} />
      </div>
    );
  } else {
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
}
