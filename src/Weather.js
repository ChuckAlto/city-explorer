import React from 'react';
import { ListGroup } from 'react-bootstrap';
import WeatherDay from './WeatherDay';


class Weather extends React.Component {

  render() {
    let weatherToRender = this.props.weatherData.map((weather, idx) => (
      <WeatherDay weather={weather} key={idx}/>
    ));
    return (
      <main>
        <ListGroup>
          {weatherToRender}
        </ListGroup>
      </main>
    )
  }
}

export default Weather;
