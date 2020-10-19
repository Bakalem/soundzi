import React, { Component } from "react";
import { Card, CardImg, CardTitle, CardSubtitle, Col, Row} from "reactstrap";
import cardImg12 from "../../assets/img/photos/12.jpg";
import "../../assets/css/audioCard/audioCard.css";
import * as Icon from "react-feather";

class AudioCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playListIndex: this.props.playListIndex,
      musicIndex: this.props.musicIndex,
      play: this.props.play,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.state);
    this.setState({play : !this.state.play});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.play != this.props.play) {
      this.setState({
        playListIndex: this.props.playListIndex,
        musicIndex: this.props.musicIndex,
        play: this.props.play,
      });
    }
  }
  

  render() {

    return (  
      <div className="audioCardcontainer wrapper layout-dark" >
        <img src={cardImg12}  className="musicCover" />
        <div className="middle">
          <Col sm="12" md="12" className="fonticon-container">
            {this.state.play ? 
              <Icon.PauseCircle size={32} onClick={this.handleClick} className="mr-4 fonticon-wrap playCircle"/> 
              :
              <Icon.PlayCircle size={32} onClick={this.handleClick} className="mr-4 fonticon-wrap playCircle"/>
            }
          </Col>
        </div>
        <div className="left">
          <Col sm="12" md="12" className="fonticon-container">
            <Icon.PlusCircle size={32}  className="mr-4 fonticon-wrap plusCircle"/>
          </Col>
        </div>
        <div className="right">
          <Col sm="12" md="12" className="fonticon-container">
            <Icon.Info size={32}  className="mr-4 fonticon-wrap plusCircle"/>
          </Col>
        </div>
      </div>
    )
  }

}

export default AudioCard;