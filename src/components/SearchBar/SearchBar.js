import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {

  handleSearch = (e) => {
    const terms = e.target.value;
    this.props.onChange(terms);
  }

  render() {
    return (
      <div className="SearchBar">
        <input id="searchBar" placeholder="Search Spotify" onChange={this.handleSearch} />
      </div>
    );
  }
}
