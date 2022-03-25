import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components'
import { COLORS } from '../constants/colors';
import { SwapiHomeworldResultInterface, SwapiSpeciesResultInterface, SwapiVehicleResultInterface } from '../types/swapi';

interface CardInterface {
    gender: string;
    vehicleCount: number;
    starshipCount: number;
    homeworld: string;
    race: Array<string>;
    dob: string;
    name: string;
    onClick: Function
}

let MiniCard: FC<CardInterface> = (props) => {

    let [vehicles, setVehicles] = useState<Array<string>>([]);
    let [starships, setStarships] = useState<Array<string>>([]);
    let [homeworld, setHomeworld] = useState<string>("");
    let [species, setSpecies] = useState<string>("");

    let fetchData = async (method: string, url: string,) => {
        let data = await fetch(url, {
            method: method.toLocaleUpperCase(),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data.json();
    }


    let getHomeworld = async () => {
        if (props.homeworld) {
            let response: SwapiHomeworldResultInterface = await fetchData("GET", props.homeworld);
            setHomeworld(response.name)
        }
    }

    let getSpecies = async () => {
        if (props.race && props.race.length > 0) {
            let response: SwapiSpeciesResultInterface = await fetchData("GET", props.race[0]);
            setSpecies(response.name)
        }
    }

    useEffect(() => {
        getHomeworld()
        getSpecies()
    }, [])

    return (
        <CardContainer onClick={()=>props.onClick()}>
            <CardHeader>
                <div
                    style={{
                        marginLeft: 20,
                        marginTop: 15,
                        marginBottom: 15,
                    }}
                >
                    <img src="/assets/card.svg" alt="card" />
                    <Text
                        style={{ fontSize: 24, color: "#fff", marginTop: 10 }}
                    >{props.name}</Text>
                </div>
            </CardHeader>
            <CardBody>
                <div
                    style={{ padding: 20 }}
                >

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 15,
                        borderBottom: `2px solid ${COLORS.pageBackground}`
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <img src={`/assets/Gender-${props.gender === 'female' ? "Female" : "Male"}.svg`} alt="card" />
                            <Text style={{ marginLeft: 15 }}>{props.dob}</Text>
                        </div>
                        <Text>{species}</Text>
                    </div>

                    <CardField
                        imgType='HomeWorld'
                        cardName='HOMEWORLD'
                        value={homeworld}
                    />

                    <CardField
                        imgType='Vehicle'
                        cardName='VEHICLE'
                        value={props.vehicleCount.toString()}
                    />

                    <CardField
                        imgType='Starship'
                        cardName='STARSHIP'
                        value={props.starshipCount.toString()}
                    />

                </div>
            </CardBody>
        </CardContainer>
    );
}

interface CardFieldInterface {
    imgType: string;
    cardName: string;
    value: string;
}

let CardField: FC<CardFieldInterface> = (props) => {
    return (
        <CardFieldContainer>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={`/assets/${props.imgType}.svg`} alt="card" />
                <Text style={{ marginLeft: 15 }}>{props.cardName}</Text>
            </div>
            <Text style={{ textAlign: 'right' }}>{props.value}</Text>
        </CardFieldContainer>
    )
}

let CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 280px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    width: 300px;
    &:hover {
        cursor: pointer;
    }
`;

let CardHeader = styled.div`
    height: 90px;
    width: 100%;
    background-color: ${COLORS.cardHeaderGrey};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

let Text = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: ${COLORS.grey};
    font-size: 14px;
`;

let CardBody = styled.div`

`;

let CardFieldContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${COLORS.pageBackground};
    padding: 10px;
    border-radius: 8px;
    margin-top: 15px;
`;

export default MiniCard;
