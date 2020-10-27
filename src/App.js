import React, { useContext, useEffect } from 'react';
import './App.css';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SignInBox } from './components/SignInBox/SignInBox';
import { SearchResults } from './components/SearchResults/SearchResults.js';
import { PlayList } from './components/PlayList/PlayList.js';
import { AuthContext } from './context/AuthContext';
import { PlayListProvider } from './context/PlayListContext';
import { PositionProvider } from './context/PositionContext';
import { SearchProvider } from './context/SearchContext';

const App = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated, spotifyAccessToken } = state;

  useEffect(() => {
    if (spotifyAccessToken) dispatch({ type: 'PRIOR_SESSION' });
    else if (window.location.href.match(/access_token=([^&]*)/)) {
      const token = window.location.href.match(/access_token=([^&]*)/)[1].toString();
      window.opener.spotifyCallback(token);
    } 
  }, [dispatch, spotifyAccessToken]);

  const mainApp = (
    <>
      <SearchBar />
      <PositionProvider>
        <div className="main-container">
          <SearchResults />
          <PlayList />
        </div>
        <ListOfPlayLists />
      </PositionProvider>
    </>
  );

  return (
    <PlayListProvider>
      <SearchProvider>
        <div className="App">
          <h1 className="main-header">Quick J<i className="highlight">amm</i>in&#39;</h1>
          { isAuthenticated ? mainApp : <SignInBox /> }
        </div>
      </SearchProvider>
    </PlayListProvider>
  );
}

export default App;
