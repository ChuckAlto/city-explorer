import axios from 'axios';
import React from 'react';
import Card from 'react-bootstrap/Card';

import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCityData: false,
      cityData: {},
      searchQuery: '',
      showMapAndCityInfo: false,
      renderError: false,
      errorMessage: '',
    }
  } 

  handleSubmit = e => {
    this.setState({
      searchQuery: e.target.value
    });

  }


  getCityInfo = async e => {
    e.preventDefault();

    try {

      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`
      
      let cityResults = await axios.get(url)
      console.log(cityResults.data)
      this.setState({
        cityData: cityResults.data[0],
        showMapAndCityInfo: true
      })
      } catch (error){
          console.log(`Error Occured: ${error.response.status}, City Not Found`);
        this.setState({
          renderError: true,
          errorMessage: `Error Occured: ${error.response.status}, City Not Found`
        })
    } 
  }



  render() {
    console.log(this.state.searchQuery);
    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>
        <main>
          <form onSubmit={this.getCityInfo}>
            <label>Enter a City!
              <input type="text" onInput={this.handleSubmit} />
            </label>
            <button onClick={this.handleClick}>Explore</button>
          </form>
          <Card>
            <div className='error'>
            <Card.Text>{this.state.renderError}{this.state.errorMessage}</Card.Text>
            </div>
          {
            this.state.showMapAndCityInfo &&
            <article>
              
              <Card.Header><h3>{this.state.cityData.display_name}</h3></Card.Header>
              <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&zoom=13&center=${this.state.cityData.lat},${this.state.cityData.lon}`} alt={`map of ${this.state.cityData.display_name}`} />
              <Card.Text>lat: {this.state.cityData.lat} lon: {this.state.cityData.lon}</Card.Text>
            
            </article>
          }
          </Card>
        </main>
      </>
    )
  }
}
export default App;
