import React from 'react'
import Baffle from "baffle-react";
import handleViewport from 'react-in-viewport'

class Baffle_Text extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            inViewport: false,
            animation_complete: false,
            obfuscate: true,
            force: false
        }
    }

    componentDidUpdate() {
        if (this.state.inViewport !== this.props.inViewport && (!this.state.animation_complete)) {
            this.setState({inViewport: this.props.inViewport})
            this.setState({animation_complete: true})
            this.setState({obfuscate: false})
            this.forceUpdate()
            if (this.props.text == "Lee Chanwoo") {
                this.parentMethod()
            }
        }
    }

    forceUpdate() {
        setTimeout(() => { 
            this.setState({force:true})
        }, 2000);
    }

    parentMethod() {
        setTimeout(() => { 
            this.props.parentMethod()
        }, 2000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.animation_complete || this.state.force || !this.props.inViewport) {
            return false
        } else {
            return true
        }
    }

    render() {
        return(
            <span className="baffle_text">
                {this.text()}
            </span>
        )
    }

    text() {
        const { text, revealDuration, revealDelay } = this.props
        if (true) {
            return (
                <Baffle
                    speed={60}
                    characters={this.props.characters ? this.props.characters : "LECHANWO*%$#"}
                    obfuscate={false}
                    update={true}
                    revealDuration={revealDuration}
                    revealDelay={revealDelay}
                >
                    {text}
                </Baffle>
            )
        } else {
            return <span>{text}</span>
        }
    }
}
const BaffleText = handleViewport(Baffle_Text);

export default BaffleText