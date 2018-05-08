import React, { Component } from 'react';

export class ResultList extends React.Component {

  render() {

    if (this.props.sortBy === "Artist") {
      return (
        <div className="Track">
          <div className="Track-information">
            <img src={this.props.img.url} alt={this.props.name}></img>
            <h1>{ this.props.name }</h1>
          </div>
          <a className="Track-action">+</a>
        </div>
      );
    } else if (this.props.sortBy === "Album") {
      return (
        <div>
          <div className="Track">
            <div className="Track-information">
              <img src={this.props.img.url} alt={this.props.name}></img>
              <h3>{this.props.name}</h3>
              <p>{ this.props.artistName }</p>
            </div>
            <a className="Track-action">+</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>{ this.props.name }</h3>
            <p>{ this.props.artistName } | { this.props.albumName }</p>
          </div>
          <a className="Track-action">+</a>
        </div>
      );
    }
  }


}
