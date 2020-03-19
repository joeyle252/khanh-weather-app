import React, {Component} from 'react'
import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  state = {
    locationName: "",
    locationTemp: "",
    locationDescription: "",
    citiesData: [],
  };
  componentDidMount() {
    this.getWeatherForCities();
    const success = (position)=>{
      console.log("position",position);
      this.getWeatherForUser (position.coords.latitude,position.coords.longitude);
    }
    const error = ()=> {
      console.log('Khanh')
    }
    navigator.geolocation.getCurrentPosition (success,error);
    
  }
  convertFtoC(k) {
    return k - 273.15
  }

  async getWeatherForUser(latitude,longitude) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&apiKey=${process.env.REACT_APP_APIKEY}`
      let response = await fetch(url);
      let data = await response.json();
      console.log("data",data);
  if (data.cod * 1 === 200){
    this.setState({
      locationName: data.name,
      locationTemp: data.main.temp,
      locationDescription: data.weather[0].description,
      // put in more here
    })
  } else {
    // debugger;
    throw new Error (data.message)
    } 
  } catch (error) {
      console.log(error)
    }
    }

    async getWeatherForCities() {
      try {
        const url = `https://api.openweathermap.org/data/2.5/group?id=2017370,6251999,2147714,5391959,3175395&units=metric&apiKey=${process.env.REACT_APP_APIKEY}`
        let response = await fetch(url);
        let data = await response.json();
        console.log("citiesdata",data);
        this.setState ({
          citiesData: data.list,
        })

    } catch (error) {
        console.log(error)
      }
      }  

  render() {
    return (
      <div>
      <div className="container-fluid text-white my-auto height:100%;">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App 
            
            </h1>
            <h2 className="col-12">Location Name: {this.state.locationName}</h2>
            <h3 className="col-12 text-danger">Temperature: {this.convertFtoC(this.state.locationTemp)}C</h3>
            <h3 className="col-12">Weather Description: {this.state.locationDescription}</h3>
          </div>
        </div>
      </div>
      {this.state.citiesData.map((value,index)=>{
        return (
          <div key={index} className="container-fluid text-white my-auto height:100%;">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App 
            
            </h1>
            <h2 className="col-12">Location Name: {value.name}</h2>
            <h3 className="col-12 text-danger">Temperature: {(value.main.temp)}C</h3>
            <h3 className="col-12">Weather Description: {value.weather[0].description}</h3>
          </div>
        </div>
      </div>
        )
      })}
    </div>
    );
  }
}

export default App;

