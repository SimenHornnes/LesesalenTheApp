import React from 'react';
import {  WebView } from 'react-native';
import Autolink from 'react-native-autolink';


export default class WebViewHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: undefined,
            link: undefined,
            linkcheck: false
        }
      }
      componentWillMount(){
        this.setState({text: this.props.navigation.getParam('link', 'NO-ID')})
        
      }

      componentDidMount(){
            /*const start = this.state.text.indexOf('href=')+6
            const end = this.state.text.indexOf('id=')-2
            const substr = this.state.text.substr(start, end-start)*/
            if(this.state.text !== undefined && this.state.linkcheck === false){
            const start = this.state.text.indexOf('href=')
            for(let i = start; i < this.state.text.length; i++){
                if(this.state.text.charAt(i) === ' '){
                    const end = i
                    const substr = this.state.text.substr(start+6, end-start-7)
                    console.log(substr)
                    this.setState({linkcheck: true, link: substr})
                    break;
                }
            }
        }
        }
        //må bruke regex
      
    render(){
    
        console.log(this.state.link)
        console.log(this.state.linkcheck)

       
        console.log(this.state.text)
        return(
            <WebView
        source={{uri: this.state.link}}
        style={{}}
      />
        )
    }
}