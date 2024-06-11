import axios from 'axios'
import { BASE_URL, API_KEY } from './src/constant'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import WeatherSearch from './src/components/weatherSearch';
import WeatherInfo from './src/components/weatherInfo';
import { useState } from 'react';

export default function App() {
  const [weatherData, setWeatherData] = useState()
  const [status, setStatus] = useState('')

  const renderComponent = () => {
    switch(status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return <WeatherInfo weatherData={weatherData} />
      case 'error':
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        )
    }
  }

  const searchWeather = (location) => {
    setStatus('loading')
    console.log(process.env);

    console.log(API_KEY)
    axios
      .get(`${BASE_URL}?q=${location}&&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp -= 273.15
        data.main.temp = data.main.temp.toFixed(2)
        setWeatherData(data)
        setStatus('success')
      })
      .catch((error) => {
        console.log(error)
        setStatus('error')
      })
  }

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.marginTop20}>{renderComponent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
});
