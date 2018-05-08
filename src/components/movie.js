import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem, Form, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";
import {postReview} from "../actions/movieActions";

//support routing by creating a new component

class Movie extends Component {
    constructor(props) {
        super(props)
        this.updateAttributes = this.updateAttributes.bind(this);
        this.reviewPoster = this.reviewPoster.bind(this);
        this.state = {
            details:{
                MovieReview:'',
                MovieRating: 0,
                movieTitle:''
            }
        }

    }
    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null)
            dispatch(fetchMovie(this.props.movieId));
    }
    updateAttributes(event) {
    let updateAttributes = Object.assign({}, this.state.details);

    updateAttributes[event.target.id] = event.target.value;
    this.setState ({
            details: updateAttributes
        });//updates based on form controls
    }

  reviewPoster(){
        console.log('reviewPoster was called')
    const {dispatch} = this.props
    dispatch(postReview(this.state.details, this.props.movieId))

}
    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.ActorName}</b> {actor.CharacterName}
                </p>
            );
        };

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                <b>{review.ReviewerName}</b> {review.MovieReview}
                    <Glyphicon glyph={'star'} /> {review.MovieRating}
                </p>
            );
        };


        var currentMovie = this.props.selectedMovie

        if (!currentMovie) { // evaluates to true if currentMovie is null
            return <div>Loading...</div>;
        }
        return (
            <Panel>
                <Panel.Heading>Movie Detail</Panel.Heading>
                <Panel.Body><Image className="image" src={currentMovie.imageUrl} thumbnail /></Panel.Body>
                <ListGroup>
                    <ListGroupItem>{currentMovie.title}</ListGroupItem>
                    <ListGroupItem><ActorInfo actors={currentMovie.Actors} /></ListGroupItem>
                    <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.averageRating} </h4></ListGroupItem>
                </ListGroup>
                <ListGroup>
                    <Panel.Body>
                        <Form horizontal>
                            <FormGroup controlId="MovieReview">
                                <Col componentClass={ControlLabel} sm={2}>Please Leave a Review</Col>
                                <FormControl onChange = {this.updateAttributes} value = {this.state.details.MovieReview} type="text" placeholder ="Enter review here"/>
                            </FormGroup>
                            <FormGroup controlId="MovieRating">
                                <Col componentClass={ControlLabel} sm={2}>Please Leave a Rating 1-5</Col>
                                <FormControl onChange = {this.updateAttributes} value = {this.state.details.MovieRating} type="int" placeholder ="1 - 5"/>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={2}>
                                <Button onClick = {this.reviewPoster}>Post Review</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Panel.Body>
                </ListGroup>
                <Panel.Body><ReviewInfo reviews={currentMovie.review} /></Panel.Body>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));