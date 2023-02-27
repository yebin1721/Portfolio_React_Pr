import React from 'react'
import BaffleText from 'components/baffle-text'
import AnimationContainer from 'components/animation-container'
import styled, { keyframes } from 'styled-components';

class PageRevealer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            animation : false,
            complete: false,
            hide: false
        }
        this.reveal = this.reveal.bind(this)
    }

    reveal() {
            this.setState({animation: true, complete: true, hide: true})
            console.log(animation + " | " + complete + " | " + hide)
    }
    

    baffle() {
            return (
                <AnimationContainer animation="fadeIn">
                    <BaffleText
                        text="Lee Chanwoo"
                        revealDuration={500}
                        revealDelay={900}
                        parentMethod={this.reveal}
                        callMethodTime={2000}
                    />
                </AnimationContainer>
            )
    }

    render() {
        const RevealContainer = styled.div`
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            background-color: #000;
            opacity: 1;
            visibility: visible;
            overflow-x: hidden !important;
            overflow-y: hidden !important;
            font-size: 50px;
            color: #fff;
            text-transform: uppercase;
            font-weight: 700;
            @media (max-width: 500px) {
                font-size: 30px;
            }
        `

        return (
                <RevealContainer id="reveal_container" style={{display: this.state.hide ? "none" : "flex"}}>
                    {this.baffle()}
                </RevealContainer>
        )
    }
}

export default PageRevealer