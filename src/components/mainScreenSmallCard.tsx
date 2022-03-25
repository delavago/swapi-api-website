import React, { FC, useState, useEffect, CSSProperties } from 'react';
import styled from 'styled-components'
import { COLORS } from '../constants/colors';

let MainScreenSmallScard = (props: {imgUrl: string, text: string,
    onClick?: Function, containerStyles?: CSSProperties}) => {
    return (
        <Container onClick={()=> {if(props.onClick) props.onClick()}} style={props.containerStyles}>
            <img src={props.imgUrl} alt={"icon"} style={{marginRight: 10}}/>
            <Text>{props.text}</Text>
        </Container>
    )
}

let Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    background-color: #fff;
    width: 90px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;

let Text = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: ${COLORS.black};
    font-size: 14px;
`;

export default MainScreenSmallScard;