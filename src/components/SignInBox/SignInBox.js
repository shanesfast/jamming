import React from 'react';
import useSpotify from '../../hooks/useSpotify';

import './SignInBox.css';

export const SignInBox = () => {
  const { getSpotifyAccess } = useSpotify();

  return (
    <>
      <section className="sign-in-box">
        <h2>Welcome!</h2>
        <p>Please sign in with your Spotify account to continue:</p>
        <button className="sign-in-btn" onClick={ getSpotifyAccess }>sign in</button>
      </section>
    </>
  );
}
