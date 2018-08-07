import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import { Container, Row, Col, Table, Media} from 'reactstrap';
import '../Styles/Album.css';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min((this.state.album.songs.length - 1), currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime(seconds) {
    if (isNaN(seconds)) { return "-:--"; }
    const fullSeconds = Math.floor(seconds);
    const minutes = Math.floor(fullSeconds / 60);
    const remainingTime = fullSeconds % 60;
    let time = minutes + ':';
    if (remainingTime < 10) {
      time += '0';
    }
    time += remainingTime;
    return time
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume});
  }

  render() {
    return (

      <Container>
        <Row>
          <Col xs="6" align="center">
            <h1 id="album-title">{this.state.album.title}</h1>
            <Media object data-src="album-cover-art" responsive="true" src={this.state.album.albumCover} alt={this.state.album.title} height={240} width={340}/>
            <h3 className="artist">{this.state.album.artist}</h3>
            <div id="release-info">{this.state.album.release}</div>
          </Col>
          <Col xs="6" align="center">
          <Table responsive>
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
              {this.state.album.songs.map((song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)}
                onMouseEnter={() => this.setState({isHovered: index + 1})}
                onMouseLeave={() => this.setState({isHovered: false})}>

                <td className="song-action">
                  <button id="song-action-button">
                  { (this.state.currentSong.title === song.title) ?
                    <span className={this.state.isPlaying ? "ion-pause" : "ion-play"}></span>
                    :
                    (this.state.isHovered === index +1) ?
                    <span className="ion-play"></span>
                    :
                    <span className="song-number">{index+1}</span>
                  }
                  </button>

                </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{this.formatTime(song.duration)}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
      <Col sm="9" md={{ size: 9, offset:2 }} className="song-list" align="center">
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          formatTime={(e) => this.formatTime(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
        </Col>
      </Row>
    </Container>
    );
  }
}

export default Album;
