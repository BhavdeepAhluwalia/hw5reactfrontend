import React, { Component} from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import {submitTransactionDonate} from "../actions/TransactionActions";
import {submitTransaction} from "../actions/TransactionActions";
import { connect } from 'react-redux';
//import DropdownInput from 'react-dropdown-input';
import { Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Select from 'react-select';
import {withRouter} from "react-router-dom";

class AddReview extends Component {

    constructor() {
        super();

        this.updateDetails = this.updateDetails.bind(this);
        this.AddReview = this.AddReview.bind(this);
        this.transactionDonate = this.transactionDonate.bind(this);
        this.state = {
            details: {
                MovieName: '',
                Rating: Number,
                Review: ''

            },
            togglePostReview: false
        };
    }

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    AddReview() {
        const {dispatch} = this.props;
        dispatch(postReview(this.state.details));
    }

    transactionDonate() {
        const {dispatch} = this.props;
        dispatch(submitTransactionDonate(this.state.details));
    }

    showDonate() {

        if (this.state.toggleDonate === true) {
            this.setState({
                toggleDonate: false
            });
        }
        else {
            this.setState({
                toggleDonate: true
            });
        }
    }

    submitAgain(){
        window.location.reload();
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        console.log(`Selected: ${selectedOption.label}`);
    }

    updateValue(newValue) {
        this.setState({
            selectValue: newValue
        });
    }

    render() {


        /*const charityInfo = ({reviews}) => {
            return reviews.map((review, i) =>
            );
        }*/

        /*
                const Donate = ({charities}) => {
                    return (
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Charity:
                            </Col>
                            <Col sm={10}>
                                <FormControl onChange={this.updateDetails} value={this.state.details.CharityName} type="text"
                                             placeholder="CharityName"/>
                            </Col>
                        </FormGroup>
                    );
                };
        */
        return (
            <Form horizontal>
                <FormGroup controlId="Name">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name:
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.Name} type="text"
                                     placeholder="Name"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="movieRating">
                    <Col componentClass={ControlLabel} sm={2}>
                        Rating:
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.CreditCard} type="text"
                                     placeholder="rating 1 - 5"/>
                    </Col>
                </FormGroup>


                <FormGroup controlId="ExpirationDate">
                    <Col componentClass={ControlLabel} sm={2}>
                        Exp:
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.ExpirationDate} type="text"
                                     placeholder="ExpDate"/>
                    </Col>
                </FormGroup>


                <button onClick={this.showDonate.bind(this)}>Donate</button>
                {this.state.toggleDonate ? <FormGroup controlId="CharityName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Charity:
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.CharityName} type="text"
                                     placeholder="CharityName"/>
                    </Col>
                </FormGroup> : " "}

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        {this.state.toggleDonate ? <Button onClick={this.transactionDonate}>Submit</Button> :
                            <Button onClick={this.transaction}>Submit</Button>}
                    </Col>
                </FormGroup>

            </Form>
        );

    }
}

const mapStateToProps = state => {
    return {
        charities: state.charity.charities,
        transactions: state.transaction.transactions
    }
}

export default connect(mapStateToProps)(Transaction);
