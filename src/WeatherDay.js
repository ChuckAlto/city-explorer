import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

class WeatherDay extends React.Component{

  render(){
    return(
      <ListGroup.Item>
        Date: {this.props.weather.date}, {this.props.weather.description}
      </ListGroup.Item>
    )
  }
}

export default WeatherDay;
