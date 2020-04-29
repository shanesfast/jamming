import React, { useContext, useEffect } from 'react';
import { AppPlayList } from './components/AppPlayList/AppPlayList';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SignInBox } from './components/SignInBox/SignInBox';

import { AuthContext } from './context/AuthContext';
import { PlayListProvider } from './context/PlayListContext';
import { PositionProvider } from './context/PositionContext';
import { SearchProvider } from './context/SearchContext';

import './App.css';

const App = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated, spotifyAccessToken } = state;

  useEffect(() => {
    if (spotifyAccessToken) dispatch({ type: 'PRIOR_SESSION' });
  }, [dispatch, isAuthenticated, spotifyAccessToken])

  const mainApp = (
    <>
      <SearchBar />
      <PositionProvider>
        <AppPlayList />
        <ListOfPlayLists />
      </PositionProvider>
    </>
  );

  return (
    <PlayListProvider>
      <SearchProvider>
        <div className="App">
          <h1>Quick J<i className="highlight">amm</i>in&#39;</h1>
          { isAuthenticated ? mainApp : <SignInBox /> }
        </div>
      </SearchProvider>
    </PlayListProvider>
  );
}

export default App;
