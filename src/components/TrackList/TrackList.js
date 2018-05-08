import React, { Component } from 'react';

export class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichRender: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.artist !== '') {
      this.setState({
        whichRender: true
      });
    } else {
      this.setState({
        whichRender: false
      })
    }
  }

  render() {
    if (this.state.whichRender && Array.isArray(this.props.artist)) {
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>Tiny Dancer</h3>
            <p>{ this.props.artist[0].name } | Madman Across The Water</p>
          </div>
          <a className="Track-action">+</a>
        </div>
      );
    } else {
      return (
        <div>
          <br /><p>Search for an Artist</p>
        </div>
      );
    }
  }


}
