import React, { Component } from 'react';

export class TrackList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>Tiny Dancer</h3>
            <p>Elton John | Madman Across The Water</p>
          </div>
          <a className="Track-action">+</a>
        </div>
      );
  }


}
