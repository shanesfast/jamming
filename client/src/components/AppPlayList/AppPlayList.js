import React from 'react';
import useTrack from '../../hooks/useTrack';
import { SearchResults } from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import EditBox from '../EditBox/EditBox.js';
import './AppPlayList.css';

export const AppPlayList = () => {
  const { editBoxIsOpen } = useTrack();

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
        <SearchResults />
        <PlayList />
      </div>
    );
  }
}
