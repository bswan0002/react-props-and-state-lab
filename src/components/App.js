import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  handleFilterChange = (animalType) => {
    this.setState({
      ...this.state,
      filters: {
        type: animalType,
      },
    });
  };

  handleFindPetsClick = () => {
    // fetch pets
    // update this.state.pets based on this.state.filters.type
    let fetchUrl = "/api/pets";
    if (this.state.filters.type !== "all") {
      fetchUrl = `/api/pets?type=${this.state.filters.type}`;
    }
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          ...this.state,
          pets: data,
        });
      });
  };

  handleAdoptPet = (petId) => {
    let petIndex = this.state.pets.findIndex((pet) => pet.id === petId);
    let newPets = [...this.state.pets];
    newPets[petIndex].isAdopted = true;

    this.setState({
      ...this.state,
      pets: newPets,
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handleFilterChange}
                onFindPetsClick={this.handleFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.handleAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
