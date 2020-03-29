import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { Spotify } from '../Spotify';


const useSpotifyApiCalls = () => {
  const [artistResult, setArtistResult] = useState();
  const [albumResult, setAlbumResult] = useState();
  const [trackResult, setTrackResult] = useState();
  const { state } = useContext(SearchContext);
  const { searchTerms, sortBy } = state;

  useEffect(() => {
    async function searchSpotify() {
      if (searchTerms.length > 0) {
        if (sortBy === 'Artist') return searchArtist(searchTerms);
        if (sortBy === 'Album') return searchAlbum(searchTerms);
        if (sortBy === 'Track') return searchTrack(searchTerms);
      }
    }

    searchSpotify();
  }, [searchTerms, sortBy]);

  function searchArtist(terms) {
    Spotify.searchArtist(terms)
            .then(artists => {
              return setArtistResult(artists);
            });
  }

  function searchAlbum(terms) {
    Spotify.searchAlbum(terms)
          .then(albums => {
            return setAlbumResult(albums);
          });
  }

  function searchTrack(terms) {
    Spotify.searchTracks(terms)
          .then(tracks => {
            return setTrackResult(tracks);
          });
  }

  return {
    artistResult,
    albumResult,
    trackResult
  }
}

export default useSpotifyApiCalls;