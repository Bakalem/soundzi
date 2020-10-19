// import external modules
import React, { PureComponent } from "react";
import classnames from "classnames";

// import internal(own) modules
import { FoldedContentConsumer, FoldedContentProvider } from "../utility/context/toggleContentContext";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import templateConfig from "../templateConfig";

import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { connect } from 'react-redux';
import { changeCurrentPlaylist } from "../redux/actions/music/musicActions";

class MainLayout extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      sidebarState: "close",
      sidebarSize: '',
      layout: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  updateWidth = () => {
    this.setState(prevState => ({
        width: window.innerWidth
    }));
  };

  handleSidebarSize = (sidebarSize) => {
    this.setState({ sidebarSize });
  }

  handleLayout = (layout) => {
    this.setState({ layout });
  }

  componentDidMount() {
    if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
    }
  }

  componentWillUnmount() {
    if (window !== "undefined") {
        window.removeEventListener("resize", this.updateWidth, false);
    }
  }

  toggleSidebarMenu(sidebarState) {
    this.setState({ sidebarState });
  }

  handleClick() {
    let index = this.props.currentPlaylistIndex === 0 ? 1 : 0;
    this.props.dispatch(changeCurrentPlaylist(index));
  }
  

  render() {

    const options = {
        //audio lists model
        audioLists: this.props.audioList,
      
        //default play index of the audio player  [type `number` default `0`]
        defaultPlayIndex: 0,
      
        //if you want dynamic change current play audio you can change it [type `number` default `0`]
        // playIndex: 0,
      
        //color of the music player theme    [ type `string`: 'light' or 'dark'  default `dark` ]
        theme: this.props.theme,
      
        // Specifies movement boundaries. Accepted values:
        // - `parent` restricts movement within the node's offsetParent
        //    (nearest node with position relative or absolute), or
        // - a selector, restricts movement within the targeted node
        // - An object with `left, top, right, and bottom` properties.
        //   These indicate how far in each direction the draggable
        //   can be moved.
        // Ref: https://github.com/STRML/react-draggable#draggable-api
        bounds: 'body',
      
        // Replace a new playlist with the first loaded playlist
        // instead of adding it at the end of it.
        // [type `boolean`, default `false`]
        clearPriorAudioLists: true,
      
        // Play your new play list right after your new play list is loaded turn false.
        // [type `boolean`, default `false`]
        autoPlayInitLoadPlayList: false,
      
        //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
        //"auto|metadata|none" "true| false"
        preload: false,
      
        //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
        glassBg: false,
      
        //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
        remember: false,
      
        //The Audio Can be deleted  [type `Boolean`, default `true`]
        remove: true,
      
        //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
        defaultPosition: {
          right: 50,
          bottom: 50,
        },
      
        defaultPlayMode: 'order',
      
        //audio mode        mini | full          [type `String`  default `mini`]
        mode: 'mini',
      
        /**
        * [ type `Boolean` default 'false' ]
        * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
        */
        once: false,
      
        //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
        autoPlay: false,
      
        //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
        toggleMode: true,
      
        //audio cover is show of the "mini" mode [type `Boolean` default 'true']
        showMiniModeCover: true,
      
        //audio playing progress is show of the "mini"  mode
        showMiniProcessBar: false,
      
        //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
        drag: true,
      
        //drag the audio progress bar [type `Boolean` default `true`]
        seeked: true,
      
        //Display chrome media session.  [type `Boolean` default `false`]
        showMediaSession: true,
      
        //Displays the audio load progress bar.  [type `Boolean` default `true`]
        showProgressLoadBar: true,
      
        //play button display of the audio player panel   [type `Boolean` default `true`]
        showPlay: true,
      
        //reload button display of the audio player panel   [type `Boolean` default `true`]
        showReload: true,
      
        //download button display of the audio player panel   [type `Boolean` default `true`]
        showDownload: true,
      
        //loop button display of the audio player panel   [type `Boolean` default `true`]
        showPlayMode: true,
      
        //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
        showThemeSwitch: true,
      
        //lyric display of the audio player panel   [type `Boolean` default `false`]
        showLyric: true,
      
        //destroy player button display  [type `Boolean` default `false`]
        showDestroy: false,
      
        //Extensible custom content       [type 'Array' default '-' ]
        extendsContent: null,
      
        //default volume of the audio player [type `Number` default `1` range `0-1`]
        defaultVolume: 1,
      
        //playModeText show time [type `Number(ms)` default `700`]
        playModeShowTime: 600,
      
        //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
        loadAudioErrorPlayNext: true,
      
        // Auto hide the cover photo if no cover photo is available [type `Boolean` default `false`]
        autoHiddenCover: false,
      
        // Play and pause audio through blank space [type `Boolean` default `false`]
        spaceBar: true,
      
        // international [type `en_US | zh_CN | Object` default `en_US`]
        locale: 'en_US',
      
        // Enable responsive player, auto toggle desktop and mobile [type `Boolean` default `true`]
        responsive: true,
      
        /**
        * @description Customer audio title [type `String | Function` default `${name} - ${singer}`]
        * @example
        * audioTitle: (audioInfo) => 'title'
        */
      
        // audioTitle: 'xxxx',
      
        //Music is downloaded handle
        onAudioDownload(audioInfo) {
          console.log('audio download', audioInfo)
        },
      
        //audio play handle
        onAudioPlay(audioInfo) {
          console.log('audio playing', audioInfo)
        },
      
        //audio pause handle
        onAudioPause(audioInfo) {
          console.log('audio pause', audioInfo)
        },
      
        //When the user has moved/jumped to a new location in audio
        onAudioSeeked(audioInfo) {
          console.log('audio seeked', audioInfo)
        },
      
        //When the volume has changed  min = 0.0  max = 1.0
        onAudioVolumeChange(currentVolume) {
          console.log('audio volume change', currentVolume)
        },
      
        //The single song is ended handle
        onAudioEnded(currentPlayId, audioLists, audioInfo) {
          console.log('audio ended', currentPlayId, audioLists, audioInfo)
        },
      
        //audio load abort
        onAudioAbort(currentPlayId, audioLists, audioInfo) {
          console.log('audio abort', currentPlayId, audioLists, audioInfo)
        },
      
        //audio play progress handle
        onAudioProgress(audioInfo) {
          // console.log('audio progress',audioInfo);
        },
      
        //audio reload handle
        onAudioReload(audioInfo) {
          console.log('audio reload:', audioInfo)
        },
      
        //audio load failed error handle
        onAudioLoadError(errMsg, currentPlayId, audioLists, audioInfo) {
          console.error(
            'audio load error',
            errMsg,
            currentPlayId,
            audioLists,
            audioInfo,
          )
        },
      
        //theme change handle
        onThemeChange(theme) {
          console.log('theme change:', theme)
        },
      
        onAudioListsChange(currentPlayId, audioLists, audioInfo) {
          console.log('[currentPlayId] audio lists change:', currentPlayId)
          console.log('[audioLists] audio lists change:', audioLists)
          console.log('[audioInfo] audio lists change:', audioInfo)
        },
      
        onAudioPlayTrackChange(currentPlayId, audioLists, audioInfo) {
          console.log(
            'audio play track change:',
            currentPlayId,
            audioLists,
            audioInfo,
          )
        },
      
        onPlayModeChange(playMode) {
          console.log('play mode change:', playMode)
        },
      
        onModeChange(mode) {
          console.log('mode change:', mode)
        },
      
        onAudioListsPanelChange(panelVisible) {
          console.log('audio lists panel visible:', panelVisible)
        },
      
        onAudioListsDragEnd(fromIndex, endIndex) {
          console.log('audio lists drag end:', fromIndex, endIndex)
        },
      
        onAudioLyricChange(lineNum, currentLyric) {
          // console.log('audio lyric change:', lineNum, currentLyric)
        },
      
        // custom music player root node
        getContainer() {
          return document.body
        },
      
        /**
        * @description get origin audio element instance , you can use it do everything
        * @example
        * audio.playbackRate = 1.5  // set play back rate
        * audio.crossOrigin = 'xxx' // config cross origin
        */
        getAudioInstance(audio) {
          console.log('audio instance', audio)
        },
      
        onBeforeDestroy(currentPlayId, audioLists, audioInfo) {
          console.log('currentPlayId: ', currentPlayId)
          console.log('audioLists: ', audioLists)
          console.log('audioInfo: ', audioInfo)
          return new Promise((resolve, reject) => {
            // your custom validate
            if (window.confirm('Are you confirm destroy the player?')) {
              // if resolve, player destroyed
              resolve()
            } else {
              // if reject, skip.
              reject()
            }
          })
        },
      
        onDestroyed(currentPlayId, audioLists, audioInfo) {
          console.log('onDestroyed:', currentPlayId, audioLists, audioInfo)
        },
      
        // transform audio info like return a Promise
      
        /**
        * @return
        *  {
        *    src: 'xxx',
        *    filename: 'xxx',
        *    mimeType: 'xxx'
        *  }
        */
        // onBeforeAudioDownload() {
        //   return Promise.resolve({
        //     src: '1.mp3',
        //   })
        // },
      
        /**
        * customer download handler
        * eg. a link , or https://www.npmjs.com/package/file-saver
        * @param {*} downloadInfo
        * @example
        *
            customDownloader(downloadInfo) {
              const link = document.createElement('a')
              link.href = downloadInfo.src
              link.download = downloadInfo.filename || 'test'
              document.body.appendChild(link)
              link.click()
            },
        */
        // customDownloader(downloadInfo) {
        //   console.log(downloadInfo.src)
        //   console.log(downloadInfo.filename)
        //   console.log(downloadInfo.mimeType)
        // },
    }
      
    return (
          <FoldedContentProvider>
              <FoldedContentConsumer>
                {context => (
                
                    <div
                      className={classnames("wrapper ", {
                          "menu-collapsed": context.foldedContent || this.state.width < 991,
                          "main-layout": !context.foldedContent,
                          [`${templateConfig.sidebar.size}`]: (this.state.sidebarSize === ''),
                          [`${this.state.sidebarSize}`]: (this.state.sidebarSize !== ''),
                      //    "layout-dark": (this.state.layout === 'layout-dark'),
                      //    " layout-dark": (this.state.layout === '' && templateConfig.layoutDark === true)
                          [`${templateConfig.layoutColor}`]: (this.state.layout === ''),
                          [`${this.state.layout}`]: (this.state.layout !== '')
                      })}
                    >

                      <Sidebar
                          toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
                          sidebarState={this.state.sidebarState}
                          handleSidebarSize={this.handleSidebarSize.bind(this)}
                          handleLayout={this.handleLayout.bind(this)}
                      />
                      <Navbar
                          toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
                          sidebarState={this.state.sidebarState}
                      />
                      <ReactJkMusicPlayer {...options} />
                      <main>{this.props.children}</main>
                      <Footer />
                    </div>
                )}
              </FoldedContentConsumer>
          </FoldedContentProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.musicApp.theme,
  audioList: 
    state.musicApp.musics[state.musicApp.currentPlaylistIndex],
  currentPlaylistIndex: state.musicApp.currentPlaylistIndex,
})

export default connect(
  mapStateToProps
)(MainLayout);
