import React from 'react';
import useTrack from '../../hooks/useTrack';
import { SearchResults } from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import EditBox from '../EditBox/EditBox.js';
import './AppPlayList.css';

export const AppPlayList = (props) => {
  const { editBoxIsOpen } = useTrack();

  // const { onClick, onAdd, sortBy, addAlbum, getAlbums, 
  //         playListTracks, remove } = props;

  if (editBoxIsOpen === true) {
    return (
      <div className="App-playlist">
        <SearchResults />
        <EditBox />
      </div>
    );
  } else {
    return (
      <div className="App-playlist">
        <SearchResults
          // onClick={onClick}
          // onAdd={onAdd}
          // sortBy={sortBy}
          // addAlbum={addAlbum}
          // getAlbums={getAlbums} 
        />
        <PlayList
          // playListTracks={playListTracks}
          // onClick={onClick}
          // remove={remove} 
        />
      </div>
    );
  }
}
