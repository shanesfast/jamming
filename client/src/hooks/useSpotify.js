import { useContext, useEffect, useState } from 'react';
import useTrack from './useTrack';
import { SearchContext } from '../context/SearchContext';
import { Spotify } from '../Spotify';

const useSpotify = () => {
  const [artistResult, setArtistResult] = useState();
  const [albumResult, setAlbumResult] = useState();
  const [trackResult, setTrackResult] = useState();

  const { state } = useContext(SearchContext);
  const { searchTerms, sortBy } = state;

  const { addTrack } = useTrack();

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

  function getTracksFromAlbum(id, name, signal) {
    Spotify.getTracksFromAlbum(id, name, signal)
    .then(tracks => { tracks.forEach(track => { addTrack(track) }) });
  }

  function getAlbumsFromArtist(id, name, signal) {
    Spotify.getAlbumsFromArtist(id, name, signal)
    .then(albums => { 
      return setAlbumResult(albums) });
  }

  return {
    artistResult,
    albumResult,
    getAlbumsFromArtist,
    getTracksFromAlbum,
    trackResult
  }
}

export default useSpotify;