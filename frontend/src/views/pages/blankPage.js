// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { Card, CardHeader, CardBody, CardImg, CardTitle, CardSubtitle, Button, CardDeck } from "reactstrap";
import { connect } from 'react-redux';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import * as Icon from "react-feather";
import AudioCard from "../../components/cards/audioCard";

class blankPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         activeItemIndex: 0,
         playListIndexOfActiveTrack: -1,
         musicIndexOfActiveTrack: -1,
      }
      this.onClick = this.onClick.bind(this);
   }

   onClick(state) {
      this.setState({
         playListIndexOfActiveTrack : state.playListIndex, 
         musicIndexOfActiveTrack : state.musicIndex
      });

   }

   isInPlayState(playListIndex, musicIndex) {
      return this.state.playListIndexOfActiveTrack === playListIndex 
         && this.state.musicIndexOfActiveTrack === musicIndex;
   }

   render() {
      return (
         <Fragment>
            <Card>
               <CardBody>
                  
                  {this.props.musics.map((item, key) =>
                     <div key={key}>
                        <h5 className="text-bold-400 text-uppercase" style={{paddingLeft: "10px"}}>TOP 50</h5>
                        <div style={{paddingLeft: "10px", marginBottom: "15px"}}>Les titres les plus écoutés de cette semaine</div>
                        <Carousel
                           slidesPerPage={5}
                           arrowLeft={<Icon.ChevronsLeft size={32} />}
                           arrowLeftDisabled={' '}
                           arrowRight={<Icon.ChevronsRight size={32} />}
                           arrowRightDisabled={' '}
                           addArrowClickHandler
                           slidesPerScroll={1}
                           offset={210}
                        >
                           {this.props.musics[key].map((audioList, innerKey) => 
                              <AudioCard key={innerKey} onClick={this.onClick} playListIndex={key} musicIndex={innerKey} play={this.isInPlayState(key, innerKey)} />
                           )}
                           
                        </Carousel>
                        <hr style={{margin: '3em 1em 3em 1em'}}/>
                     </div>
                  )}
                  
               </CardBody>
            </Card>
         </Fragment>
      );
   }
}

const mapStateToProps = (state) => ({
   musics: state.musicApp.musics,
})

export default connect(
   mapStateToProps
)(blankPage);
