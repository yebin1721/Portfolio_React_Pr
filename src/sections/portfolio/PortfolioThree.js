import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Col, Container } from 'react-bootstrap'
import styled from 'styled-components'
import PortfolioItem from 'sections/portfolio/parts/PortfolioItem.js'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import AnimatedHeading from 'components/animated-heading'
import AnimationContainer from 'components/animation-container'

class PortfolioThree extends React.Component {

      constructor(props) {
        super(props)
        this.state = {
            height: 0,
            width: 0
        }
    }

    updateDimensions = () => {
        if (this.state.height !== window.innerHeight) {
            this.setState({height: window.innerHeight})
        }
        if (this.state.width !== window.innerWidth) {
            this.setState({width: window.innerWidth})
        }
    }

    
    componentDidMount() {
        this.setState({height: window.innerHeight, width: window.innerWidth})
        window.addEventListener('resize', this.updateDimensions)
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }
    
    render() {

        const Section = styled.section`
          background-color: #050505;
          padding: 100px 0;
        `
        const PortfolioContainer = styled.div`
            .slick-slide {
              display: block;
              margin: 0px 0 70px 0px;
            }
            .slick-dots {
              bottom: 0;
              li button:before,.slick-dots li.slick-active button:before {
                color: #04e5e5;
              }
            }
          }
        `


        const settings = {
            dots: true,
            swipe: true,
            infinite: true,
            speed: 500,
            slidesToScroll:  this.state.width < 500 ? 1 : 2,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 10000,
            loop: true,
            slidesToShow: this.state.width < 500 ? 1 : this.state.width > 500 && this.state.width <= 1024 ? 3 : 4,

        }
        
        return (
            <Section id="portfolio">
                  <Col md={12} style={{padding: 0}}>
                    <Container>
                      <AnimatedHeading text="Recent projects" />
                    </Container>
                    <PortfolioContainer>
                      <AnimationContainer animation="fadeIn">
                        <Slider {...settings}>
                          {this.portfolio()}
                        </Slider>
                      </AnimationContainer>
                    </PortfolioContainer>
                </Col>
            </Section>
        )
    }

  portfolio() {
      const { items } = this.props

      return items.map((value, index) => {
        return (
          <PortfolioItem 
            key={index}
            index={index} 
            image={value.content.frontmatter.image.childImageSharp.fluid.src} 
            text={value.content.frontmatter.title} 
            category={value.content.frontmatter.category}
            link={value.content.frontmatter.link}
            type="slider"
          />
        )
      })
    }
}

export default props => (
  <StaticQuery
      query={graphql`
          query {
              items: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(portfolio)/"}}, sort: {fields: [frontmatter___id], order: ASC}, limit: 9) {
                edges {
                  content: node {
                    frontmatter {
                      id
                      title
                      category
                      link
                      image {
                        childImageSharp {
                          fluid(maxWidth: 1000) {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            }           
          `}
      render={({ items }) => <PortfolioThree items={items.edges} {...props} />}
  />
)