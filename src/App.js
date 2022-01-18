import axios from 'axios';
import React from 'react';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayCityData: false,
      cityData: [],
      searchQuery: ''
    }
  }

  handleSubmit = e =>{
    e.preventDefault();
      this.setState({
        searchQuery: e.target.city.value
      });
      
    }
    
    getCityInfo = async () => {
      
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`)
      
      console.log(cityResults);
    }
    
  



  render () {
    console.log(this.state.searchQuery);
    return (
      <>
      <header>
       <h1>City Explorer</h1>
      </header>
      <main>
        <form onSubmit={this.handleSubmit}>
        <label>Pick a City!
          <input name="city" type="text" />  
        </label>  
        <button onClick={this.handleClick}>Explore</button>
        </form>
      </main>
      </>
    )
  }
}
export default App;
