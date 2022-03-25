import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Card from './components/Card';
import MainScreenSmallScard from './components/mainScreenSmallCard';
import MiniCard from './components/MiniCard';
import { COLORS } from './constants/colors';
import { SCREEN_WIDTH_CONSTANTS } from './constants/Screens';
import { People } from './types/local';
import { SwapiPeopleResultInterface, SwapiSpeciesResultInterface, SwapiStarshipResultInterface, SwapiVehicleResultInterface } from './types/swapi';

interface SwapiMultiEntityResponseInterface {
  count: string;
  next: string;
  previous: any;
  results: Array<any>
}

function App() {

  let BASE_URL = "https://swapi.dev/api/"

  let [peopleResult, setPeopleResult] = useState<Array<SwapiPeopleResultInterface>>([]);
  let [peopleResultMapped, setPeopleResultMapped] = useState<Array<People>>([]);
  let [loadedEntity, setLoadedEntity] = useState<People>();

  useEffect(() => {
    if (peopleResult.length == 0) {
      fetchData("GET", BASE_URL + "people")
        .then((apiResult: SwapiMultiEntityResponseInterface) => {
          console.log(apiResult);
          let results: Array<SwapiPeopleResultInterface> = apiResult.results
          setPeopleResult(results);

        });
    }
  }, [])

  useEffect(() => {
    let tempArray: Array<any> = []
    peopleResult.forEach(async item => {
      let person: People = {
        name: item.name,
        gender: item.gender,
        species: item.species.length > 0 ? item.species[0] : null,
        birthYear: item.birth_year,
        vehicles: item.vehicles,
        starships: item.starships,
        homeworld: item.homeworld
      }
      tempArray = [...tempArray, person];
    })
    setPeopleResultMapped(tempArray);
  }, [peopleResult])


  let fetchData = async (method: string, url: string,) => {
    let data = await fetch(url, {
      method: method.toLocaleUpperCase(),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data.json();
  }

  return (
    <PageContainer>
      <PageContentWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 15,
            borderBottom: `1px solid ${COLORS.cardHeaderGrey}`
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <MainScreenSmallScard
              imgUrl='/assets/Card-white.svg'
              text='All Cards'
              onClick={() => setLoadedEntity(undefined)}
              containerStyles={{marginRight: 15}}
            />
            <MainScreenSmallScard
              imgUrl='/assets/Deck.svg'
              text='Decks'
              containerStyles={{backgroundColor: '#E4E4E4'}}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '10px',
              width: '90px',
              borderRadius: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              border: `1px solid ${COLORS.cardHeaderGrey}`
            }}
          >
            <Text>Delano Bailey</Text>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 15
          }}
        >
          <Text
            onClick={() => setLoadedEntity(undefined)}
          >All Cards</Text>
          <img src={'/assets/right-arrow.svg'} alt={"icon"} style={{ marginRight: 10, marginLeft: 10 }} />
          <Text style={{ color: COLORS.black, fontWeight: '500' }}>{loadedEntity ? loadedEntity.name : "Select a card"}</Text>
        </div>
        <ContentContainer
          style={loadedEntity ? { justifyContent: 'flex-start' } : {}}
        >
          {loadedEntity && <Card
            gender={loadedEntity.gender ? loadedEntity.gender : ""}
            vehicles={loadedEntity.vehicles}
            starships={loadedEntity.starships}
            homeworld={loadedEntity.homeworld}
            race={loadedEntity.species}
            dob={loadedEntity.birthYear}
            name={loadedEntity.name}
          />}

          {!loadedEntity && peopleResultMapped.map((person, index) => (
            <MiniCard
              key={"card" + index}
              gender={person.gender ? person.gender : ""}
              vehicleCount={person.vehicles.length}
              starshipCount={person.starships.length}
              homeworld={person.homeworld}
              race={person.species}
              dob={person.birthYear}
              name={person.name}
              onClick={() => {
                let entity: People = {
                  gender: person.gender,
                  vehicles: person.vehicles,
                  starships: person.starships,
                  homeworld: person.homeworld,
                  species: person.species,
                  birthYear: person.birthYear,
                  name: person.name
                }
                setLoadedEntity(entity)
              }}
            />
          ))}

        </ContentContainer>
      </PageContentWrapper>
    </PageContainer>
  );
}

let PageContainer = styled.div`
  background-color: ${COLORS.pageBackground};
  height: 100%;
  min-height: 100vh;
  /* width: 100%; */
  padding: 20px;
`;

let ContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: ${SCREEN_WIDTH_CONSTANTS.tabletS}) {
        display: grid;
        align-items: stretch;
        grid-gap: 20px;
        grid-template-rows: 1fr;
        grid-auto-flow: row;
        justify-content: center;
        grid-template-columns: repeat(auto-fit, 300px);
    }
    @media only screen and (min-width: ${SCREEN_WIDTH_CONSTANTS.laptop}) {
        grid-template-columns: repeat(auto-fit, 300px);
        /* max-width: 2000px; */
    }
`;
let Text = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: ${COLORS.grey};
    font-size: 14px;
    &:hover{
      cursor: pointer;
    }
`;

let PageContentWrapper = styled.div`
`;

export default App;
