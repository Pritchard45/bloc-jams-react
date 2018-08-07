import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import {Media, Row, Col, Image } from 'reactstrap';
import '../Styles/Library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return(
      <Row className="library">
        {
          this.state.albums.map( (album, index) =>
          <Col xs="6" sm="4" key={index} className="library-album-section">
            <Link to={`/album/${album.slug}`} key={index}>
              <div className="library-album-title"> {album.title}</div>
                <Media object data-src="album-cover-art" responsive="true" src={album.albumCover} alt={album.title} height={274} width={340}/>
                <div>{album.artist}</div>
                <div>{album.songs.length} songs</div>
            </Link>
          </Col>
          )
        }
      </Row>
    );
  }
}

export default Library;
