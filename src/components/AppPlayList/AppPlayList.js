import React from 'react';
import { SearchResults } from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import EditBox from '../EditBox/EditBox.js';
import './AppPlayList.css';

export const AppPlayList = (props) => {
  const { onClick, onAdd, sortBy, addAlbum, getAlbums, 
          showEditBox, editListPlayLists, position,  editListTracks, 
          playListTracks, remove, pagination } = props;

  if (showEditBox === 'open') {
    return (
      <div className="App-playlist">
        <SearchResults
          // artist={artist}
          // album={album}
          // track={track}
          onClick={onClick}
          onAdd={onAdd}
          sortBy={sortBy}
          addAlbum={addAlbum}
          getAlbums={getAlbums} />
        <EditBox
          show={showEditBox}
          editListPlayLists={editListPlayLists}
          position={position}
          tracks={editListTracks}
          onClick={onClick}
          remove={remove}
          pagination={pagination} />
      </div>
    );
  } else {
    return (
      <div className="App-playlist">
        <SearchResults
          // artist={artist}
          // album={album}
          // track={track}
          onClick={onClick}
          onAdd={onAdd}
          sortBy={sortBy}
          addAlbum={addAlbum}
          getAlbums={getAlbums} />
        <PlayList
          // artist={artist}
          // album={album}
          // track={track}
          playListTracks={playListTracks}
          onClick={onClick}
          remove={remove} />
      </div>
    );
  }
}
