import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GiWhiteBook } from 'react-icons/gi';
import { FormContainer, FormLabel, FormInput, FormBtm } from './ContactForm.styled';

const INITIAL_STATE = {
    name: '',
    number: '',
};

class ContactForm extends Component{
    state = {
        ...INITIAL_STATE
    };

    handleOnChange = event => {    
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleOnSubmitForm = event => {
        event.preventDefault();
        this.props.onSubmit({ ...this.state });
        this.reset();
    }

    reset = () => {        
        this.setState({ ...INITIAL_STATE });
    };

    render() {
        const { name, number } = this.state;       

        return (
            <FormContainer onSubmit={this.handleOnSubmitForm} >
                <FormLabel >
                    Muggle Name
                    <FormInput type="text" name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces."
                        value={name} onChange={this.handleOnChange} required />
                </FormLabel>
                <FormLabel >
                    Not a Magic Number
                    <FormInput type="tel" name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. At least 5 symbols"
                        value={number} onChange={this.handleOnChange} required />
                </FormLabel>
                <FormBtm type="submit" ><GiWhiteBook/> Lumos Contact!</FormBtm>
            </FormContainer>
        )
    }
}

ContactForm.propType = {
    onSubmit: PropTypes.func.isRequired,   
}

export default ContactForm;