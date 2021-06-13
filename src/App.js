import React, { useContext, useEffect } from 'react';
import './App.css';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists';
import { SignInBox } from './components/SignInBox/SignInBox';
import { SearchResults } from './components/SearchResults/SearchResults.js';
import { PlayList } from './components/PlayList/PlayList.js';
import { AuthContext } from './context/AuthContext';
import { PlayListProvider } from './context/PlayListContext';
import { SearchProvider } from './context/SearchContext';

const App = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated, spotifyAccessToken, spotifyUsername } = state;

  useEffect(() => {
    if (spotifyAccessToken) dispatch({ type: 'PRIOR_SESSION' });
    else if (window.location.href.match(/access_token=([^&]*)/)) {
      const token = window.location.href.match(/access_token=([^&]*)/)[1].toString();
      window.opener.spotifyCallback(token);
    } 
  }, [dispatch, spotifyAccessToken]);

  const endSession = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch({ type: 'END_SESSION' });
  }

  const mainApp = (
    <>
      <div className="main-container">
        <SearchResults />
        <PlayList />
      </div>
      <ListOfPlayLists />
    </>
  );

  const userInfo = (
    <>
      <div class="user-info">
        <p>Hello { spotifyUsername }.</p>
        <a href="#" onClick={endSession}>_Logout</a>
      </div>
    </>
  );

  return (
    <PlayListProvider>
      <SearchProvider>
        <div className="App">
          <h1 className="main-header">Quick J<i className="highlight">amm</i>in&#39;</h1>
          { isAuthenticated ? userInfo : null }
          { isAuthenticated ? mainApp : <SignInBox /> }
        </div>
      </SearchProvider>
    </PlayListProvider>
  );
}

export default App;
