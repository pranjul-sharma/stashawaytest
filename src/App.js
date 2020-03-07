import './App.scss';

import React, { Component } from 'react';
import {
  RESTAURANTS_URL,
  NO_RESTAURANT_FOUND,
  SOMETHING_WENT_WRONG,
  MY_RESTAURANT_KEYS,
  RESTAURANT_RESPONSE_KEYS
} from './shared/constants';
import RestaurantCard from './components/RestaurantCard';
import SearchBar from './components/SearchBar';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ld_restaurantsList: true,
      er_restaurantsList: null,
      restaurantsList: [],
      allRestaurants: [],
      searchStr: ''
    };
  }

  getRestaurants = async () => {
    await this.setState({ ld_restaurantsList: true });
    fetch(RESTAURANTS_URL)
      .then(res => res.json())
      .then(restaurants => {
        if (restaurants && restaurants.length) {
          let restaurantsList = restaurants.map(restaurant => ({
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
          }));
          this.setState({
            ld_restaurantsList: false,
            restaurantsList,
            allRestaurants: restaurantsList
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
      <RestaurantCard restaurant={restaurant} />
    </React.Fragment>
  );

  onSearchBoxInput = async e => {
    await this.setState({
      searchStr: e.target.value
    });
    this.onSearchClicked(e);
  };

  onSearchClicked = e => {
    e.preventDefault();
    const { searchStr, allRestaurants } = this.state;
    const filteredRestaurants = allRestaurants.filter(restaurant =>
      restaurant[MY_RESTAURANT_KEYS.BRAND].toLowerCase().includes(searchStr)
    );
    this.setState({
      restaurantsList: filteredRestaurants
    });
  };

  render() {
    const {
      searchStr,
      ld_restaurantsList,
      er_restaurantsList,
      restaurantsList
    } = this.state;
    return (
      <div className="App">
        <SearchBar
          onInput={this.onSearchBoxInput}
          onSearchClicked={this.onSearchClicked}
          searchStr={searchStr}
        />
        <div id="restuarant-list-container">
          {restaurantsList &&
            restaurantsList.map((restaurant, index) =>
              this.renderRestaurant(restaurant, index)
            )}
        </div>
      </div>
    );
  }
}

export default App;
