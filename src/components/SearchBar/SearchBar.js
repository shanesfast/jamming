import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    const terms = e.target.value;
    this.props.onChange(terms);
  }

  render() {
    return (
      <div className="SearchBar">
        <input id="searchBar" placeholder="Search here" onChange={this.handleSearch} />
      </div>
    );
  }
}
