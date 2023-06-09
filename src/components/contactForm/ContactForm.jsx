import { useState } from 'react';
import PropTypes from 'prop-types';
import { GiWhiteBook } from 'react-icons/gi';
import { FormContainer, FormLabel, FormInput, FormBtm } from './ContactForm.styled';

const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleOnChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    }

    const handleOnSubmitForm = event => {
        event.preventDefault();   
        onSubmit(name, number);
        setName('');
        setNumber('');
    }

    return (
        <FormContainer onSubmit={handleOnSubmitForm} >
            <FormLabel >
                Muggle Name
                <FormInput type="text" name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces."
                    value={name} onChange={handleOnChange} required />
            </FormLabel>
            <FormLabel >
                Not a Magic Number
                <FormInput type="tel" name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. At least 5 symbols"
                    value={number} onChange={handleOnChange} required />
            </FormLabel>
            <FormBtm type="submit" ><GiWhiteBook /> Lumos Contact!</FormBtm>
        </FormContainer>
    );
}

ContactForm.propType = {
    onSubmit: PropTypes.func.isRequired,   
}

export default ContactForm;