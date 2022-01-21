import axios from 'axios';
import React from 'react';
import { Card, ListGroup, Container, ListGroupItem } from 'react-bootstrap/';
// import Weather from './Weather';
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
      weatherData: [],
      showWeatherData: false,
      errorMessageTwo: '',
      renderErrorTwo: false,
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
      // console.log(cityResults.data)
      this.setState({
        cityData: cityResults.data[0],
        showMapAndCityInfo: true
      })

      // let serverUrl = `${process.env.REACT_APP_SERVER_URL}/weather?searchQuery=${this.state.searchQuery}`;
      // let weatherResults = await axios.get(serverUrl);

      // console.log(serverUrl);
      // console.log(weatherResults.data);
      // this.setState({
      //   weatherData: weatherResults.data,
      //   showWeatherData: true,
      // })


    } catch (error) {
      console.log(`Error Occurred: ${error.response.status}, City Not Found`);
      this.setState({
        renderError: true,
        errorMessage: `Error Occurred: ${error.response.status}, City Not Found`
      })
    }
    this.getWeatherInfo();
  }


  getWeatherInfo = async () => {

    try {
      let serverUrl = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
      let weatherResults = await axios.get(serverUrl);

      console.log(serverUrl);
      console.log(weatherResults.data);
      this.setState({
        weatherData: weatherResults.data,
        showWeatherData: true,
      })


    } catch (error) {
      console.log(`Error Occurred: ${error.response.status}, City Not Found`);
      this.setState({
        renderErrorTwo: true,
        errorMessageTwo: `Error Occurred: error status 500`
      })
    }

  }










  render() {
    // console.log(this.state);
    // console.log(this.state.weatherData.data);

    let weatherToRender = this.state.weatherData.map((weather, idx) => (
      <div>

      <ListGroup.Item key={idx}>
        Date: {weather.date},
      </ListGroup.Item>   
      <ListGroup.Item>
        High: {weather.max_temp}, Low: {weather.min_temp},    {weather.description}
      </ListGroup.Item>
    </div>
    ));
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
            <div className='error'>
              <Card.Text>{this.state.renderErrorTwo}{this.state.errorMessageTwo}</Card.Text>
            </div>
            {
              this.state.showMapAndCityInfo &&
              <article className='art1'>

                <Card.Header><h3>{this.state.cityData.display_name}</h3></Card.Header>
                <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&zoom=13&center=${this.state.cityData.lat},${this.state.cityData.lon}`} alt={`map of ${this.state.cityData.display_name}`} />
                <Card.Text>lat: {this.state.cityData.lat} lon: {this.state.cityData.lon}</Card.Text>

              </article>
            }



          </Card>
            {
              this.state.showWeatherData &&
              <article>
               <ListGroup>
                  <ListGroup.Item>
                    {weatherToRender}
                  </ListGroup.Item>
                </ListGroup>
              </article>
            }    
        </main>
      </>
    )
  }
}
export default App;
