import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';

const setupClarifai = (imageUrl) => {
// Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'd27f721370594b8b9779f463f8d16144';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'qg436u0tlv92';       
    const APP_ID = 'faceapp';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    
    });

      const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions
  }


class App extends Component{
  constructor () {
    super();
    this.state = {
      input:'',
      imageUrl:'',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

     fetch("https://api.clarifai.com/v2/models/" + 'faceapp' + "/outputs", setupClarifai(this.state.input))
        .then(response => response.json());
  }

  render() {
  return (
    <div className="App">
    <ParticlesBg type="cobweb" color="#ffffff" num={30} bg={true} />
    <Navigation />
    <Logo />
    <Rank />
    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
    <FaceRecognition imageUrl={this.state.imageUrl}/>

      
    </div>
  );
  }
}

export default App;
