import React, { Component } from 'react';
import './ResultList.css';

export class ResultList extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.trackInfo);
  }

  addAlbum(e) {
    this.props.addAlbum(
      e.target.getAttribute('data-id'),
      e.target.getAttribute('data-album')
    );
  }

  getAlbums(e) {
    this.props.getAlbums(
      e.target.getAttribute('data-artist-id'),
      e.target.getAttribute('data-artist-name')
    );
  }

  render() {

    if (this.props.sortBy === "Artist") {
      return (
        <div className="Track">
          <div className="Track-information">
            <img src={this.props.img.url}
            alt={this.props.name}
            data-artist-id={this.props.artistId}
            data-artist-name={this.props.name}
            onClick={this.getAlbums}></img>
            <h1 data-artist-id={this.props.artistId}
            data-artist-name={this.props.name}
            onClick={this.getAlbums}>{ this.props.name }</h1>
          </div>
        </div>
      );
    } else if (this.props.sortBy === "Album") {
      return (
        <div>
          <div className="Track">
            <div className="Track-information" id="album">
              <img src={this.props.img.url} alt={this.props.name}></img>
              <h3>{this.props.name}</h3>
              <p>{ this.props.artistName }</p>
            </div>
            <a className="Track-action"
            data-id={this.props.albumId}
            data-album={this.props.name}
            onClick={this.addAlbum}>+</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Track">
          <div className="Track-information" id="track">
            <h3>{ this.props.name }</h3>
            <p>{ this.props.artistName } | { this.props.albumName }</p>
          </div>
          <a className="Track-action" onClick={this.addTrack}>+</a>
        </div>
      );
    }
  }


}
