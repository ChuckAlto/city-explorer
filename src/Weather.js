// import axios from 'axios';
// import React from 'react';
// import { ListGroup } from 'react-bootstrap';


// class Weather extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
      
//       renderError: false,
//       errorMessage: '',
//       weatherData: [],
//       showWeatherData: false,
//     }
//   } 
  
//   // getWeatherInfo = async e => {
//   //   e.preventDefault();
    
//   //   try {     
//   //     let serverUrl = `${process.env.REACT_APP_SERVER_URL}/weather?searchQuery=${this.state.searchQuery}`;
//   //     let weatherResults = await axios.get(serverUrl);
      
//   //     console.log(serverUrl);
//   //     console.log(weatherResults.data);
//   //     this.setState({
//   //       weatherData: weatherResults.data,
//   //       showWeatherData: true,
//   //     })
      
      
//   //   } catch (error){
//   //     console.log(`Error Occurred: ${error.response.status}, City Not Found`);
//   //     this.setState({
//   //       renderError: true,
//   //       errorMessage: `Error Occurred: ${error.response.status}, City Not Found`
//   //     })
//   //   } 
    
//   // }
//     render(){
//       let weatherToRender = this.state.weatherData.map((weather, idx) => (
//         <ListGroup.Item>
//           Date: {weather.date}, {weather.description} 
//         </ListGroup.Item>
//       ));
//       return(
//         <main>
//           <article>
//             {
//               this.state.showWeatherData &&
//               <ListGroup>
//                 {weatherToRender}
//               </ListGroup>
//             }

//           </article>

//         </main>





//       )
//     }
  
  
// }
  
//   export default Weather;
  