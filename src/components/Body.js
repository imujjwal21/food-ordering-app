import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";  
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "./useOnlineStatus";

const Body = () => {
  
  const [listOfRestaurants, setListOfRestaurant] = useState([]); 
  const [filteredRestaurants, setFilteredRestaurant] = useState([]);  

  const [searchText, setSearchText] = useState("")


  useEffect(() => {
     fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    ); 

    const json = await data.json();

    setListOfRestaurant(
      json.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants  
    ); 

    setFilteredRestaurant(
      json.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1> You are offline! Check your internet connection. </h1>
    )
  } 

  
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            onClick={() => {
              console.log(searchText);

              const filteredList = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredList);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            filteredListOfRestaurants = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.1
            );

            setFilteredRestaurant(filteredListOfRestaurants);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>

        <div className="res-container">
          {filteredRestaurants.map((restaurant) => (
          
            <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}>    
            <RestaurantCard  resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;