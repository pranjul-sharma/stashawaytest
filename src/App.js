import './App.scss';

import React, { Component } from 'react';
import {
  RESTAURANTS_URL,
  NO_RESTAURANT_FOUND,
  SOMETHING_WENT_WRONG,
  MY_RESTAURANT_KEYS,
  RESTAURANT_RESPONSE_KEYS,
  NAN,
  KEY_ALL,
  TRY_AGAIN,
  RELOAD,
  LOADING_RESTAURANTS,
  CLEAR_FILTER
} from './shared/constants';
import RestaurantCard from './components/RestaurantCard';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ld_restaurantsList: true,
      er_restaurantsList: null,
      restaurantsList: [],
      allRestaurants: [],
      searchStr: '',
      allYears: {},
      allCountries: {},
      selectedYear: KEY_ALL,
      selectedCountry: KEY_ALL
    };
  }

  getRestaurants = async () => {
    await this.setState({ ld_restaurantsList: true });
    fetch(RESTAURANTS_URL)
      .then(res => res.json())
      .then(restaurants => {
        if (restaurants && restaurants.length) {
          let allYears = {};
          let allCountries = {};
          let restaurantsList = restaurants.map(restaurant => {
            const KEY_YEAR = restaurant[
              RESTAURANT_RESPONSE_KEYS.TOP_TEN
            ].substring(0, 4);
            const KEY_COUNTRY = restaurant[RESTAURANT_RESPONSE_KEYS.COUNTRY];
            if (
              !KEY_YEAR.toLowerCase().includes(NAN) &&
              !allYears.hasOwnProperty(KEY_YEAR)
            ) {
              allYears[KEY_YEAR] = 1;
            }
            if (
              !KEY_COUNTRY.toLowerCase().includes(NAN) &&
              !allCountries.hasOwnProperty(KEY_COUNTRY)
            ) {
              allCountries[KEY_COUNTRY] = 1;
            }
            return {
              [MY_RESTAURANT_KEYS.BRAND]:
                restaurant[RESTAURANT_RESPONSE_KEYS.BRAND],
              [MY_RESTAURANT_KEYS.VARIETY]:
                restaurant[RESTAURANT_RESPONSE_KEYS.VARIETY],
              [MY_RESTAURANT_KEYS.STYLE]:
                restaurant[RESTAURANT_RESPONSE_KEYS.STYLE],
              [MY_RESTAURANT_KEYS.COUNTRY]:
                restaurant[RESTAURANT_RESPONSE_KEYS.COUNTRY],
              [MY_RESTAURANT_KEYS.STARS]:
                restaurant[RESTAURANT_RESPONSE_KEYS.STARS],
              [MY_RESTAURANT_KEYS.TOP_TEN]:
                restaurant[RESTAURANT_RESPONSE_KEYS.TOP_TEN]
            };
          });
          this.setState({
            ld_restaurantsList: false,
            restaurantsList,
            allRestaurants: restaurantsList,
            allYears: { ...allYears, [KEY_ALL]: 1 },
            allCountries: { ...allCountries, [KEY_ALL]: 1 }
          });
        } else {
          this.setState({
            ld_restaurantsList: false,
            er_restaurantsList: NO_RESTAURANT_FOUND
          });
        }
      })
      .catch(e => {
        this.setState({
          ld_restaurantsList: false,
          er_restaurantsList: SOMETHING_WENT_WRONG
        });
      });
  };

  componentDidMount() {
    this.getRestaurants();
  }

  handleReload = e => {
    e.preventDefault();
    this.getRestaurants();
  };

  renderRestaurant = (restaurant, key) => (
    <React.Fragment key={String(key + 1)}>
      <RestaurantCard
        restaurant={restaurant}
        onClick={this.onRestaurantClick}
      />
    </React.Fragment>
  );

  onRestaurantClick = restaurant => {
    alert(`You clicked on ${restaurant.brand}`);
  };

  onSearchBoxInput = async e => {
    await this.setState({
      searchStr: e.target.value
    });
    this.onSearchClicked();
  };

  onSearchClicked = e => {
    e && e.preventDefault();
    const { searchStr, allRestaurants } = this.state;
    const filteredRestaurants = allRestaurants.filter(restaurant =>
      restaurant[MY_RESTAURANT_KEYS.BRAND].toLowerCase().includes(searchStr)
    );
    this.setState({
      restaurantsList: filteredRestaurants
    });
  };

  onFilterByYear = e => {
    e && e.preventDefault();
    const currSelectedYear = e.target.value;
    const { selectedYear, allRestaurants } = this.state;
    if (currSelectedYear !== selectedYear) {
      let filteredRestaurants = [];
      if (currSelectedYear === KEY_ALL) {
        filteredRestaurants = allRestaurants;
      } else {
        filteredRestaurants = allRestaurants.filter(restaurant =>
          restaurant[MY_RESTAURANT_KEYS.TOP_TEN]
            .toLowerCase()
            .includes(currSelectedYear)
        );
      }
      this.setState({
        restaurantsList: filteredRestaurants,
        selectedYear: currSelectedYear
      });
    }
  };

  onFilterByCountry = e => {
    e && e.preventDefault();
    const currSelectedCountry = e.target.value;
    const { selectedCountry, allRestaurants } = this.state;
    console.log('CRRE SE', currSelectedCountry, selectedCountry);
    if (currSelectedCountry !== selectedCountry) {
      let filteredRestaurants = [];
      if (currSelectedCountry === KEY_ALL) {
        console.log('HERE IT COM');
        filteredRestaurants = allRestaurants;
      } else {
        filteredRestaurants = allRestaurants.filter(restaurant =>
          restaurant[MY_RESTAURANT_KEYS.COUNTRY].includes(currSelectedCountry)
        );
      }
      this.setState({
        restaurantsList: filteredRestaurants,
        selectedCountry: currSelectedCountry
      });
    }
  };

  clearFilters = () => {
    this.setState({
      selectedCountry: KEY_ALL,
      selectedYear: KEY_ALL,
      restaurantsList: this.state.allRestaurants,
      searchStr: ''
    });
  };

  render() {
    const {
      searchStr,
      ld_restaurantsList,
      er_restaurantsList,
      restaurantsList,
      allYears,
      selectedYear,
      allCountries,
      selectedCountry
    } = this.state;
    return (
      <div className="App">
        <SearchBar
          onInput={this.onSearchBoxInput}
          onSearchClicked={this.onSearchClicked}
          searchStr={searchStr}
        />
        <Filters
          allYears={Object.keys(allYears)}
          onFilterByYear={this.onFilterByYear}
          selectedYear={selectedYear}
          allCountries={Object.keys(allCountries)}
          selectedCountry={selectedCountry}
          onFilterByCountry={this.onFilterByCountry}
        />
        {ld_restaurantsList ? (
          <div className="center-container">
            <div>{LOADING_RESTAURANTS}</div>
          </div>
        ) : er_restaurantsList ? (
          <div className="center-container">
            <div>{SOMETHING_WENT_WRONG}</div>
            <div>{TRY_AGAIN}</div>
            <button onClick={this.handleReload}>{RELOAD}</button>
          </div>
        ) : (
          <div id="restuarant-list-container">
            {restaurantsList.length ? (
              restaurantsList.map((restaurant, index) =>
                this.renderRestaurant(restaurant, index)
              )
            ) : (
              <div className="center-container">
                <div>{NO_RESTAURANT_FOUND}</div>
                <button onClick={this.clearFilters}>{CLEAR_FILTER}</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
