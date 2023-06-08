import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { MainHeader, SecondHeader } from './App.styled';

import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

const INITIAL_STATE = {
    contacts: [
      { id: 'id-1', name: 'Harry Potter', number: '459-12-56' },      
      { id: 'id-2', name: 'Ronald Weasley', number: '443-89-12' },
      { id: 'id-3', name: 'Hermione Granger', number: '745-17-79' },
      { id: 'id-4', name: 'Rubeus Hagrid', number: '645-17-79' },
    ],
    filter: '',
};

class App extends Component{

  state = {
    ...INITIAL_STATE
  };

  componentDidMount() {     
    const savingUsersContact = JSON.parse(localStorage.getItem("usersContact"));
    if (savingUsersContact) {   
      this.setState({ contacts: savingUsersContact });
    }
  }

  componentDidUpdate(_, prevState) { 
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("usersContact", JSON.stringify(this.state.contacts));
    }
  }

  heandleOnFilter = evt => {
    const { value } = evt.target;      
    this.setState({ filter: value });
  }
  
  handleOnSubmit = ({ name, number }) => { 
    const { contacts } = this.state;

    const checkedName = contacts.find(contact => {
      const nameLower = name.toLowerCase();
      const contactNameLower = contact.name.toLowerCase();

      return contactNameLower === nameLower || contact.number === number;
    });

    if (checkedName) {
      return alert(`${name} => Magic name is already in contacts!`);
    }

    const newUser = {
      id: nanoid(),
      name,
      number,
    };

    this.setState({ contacts: [...this.state.contacts, newUser] });    
  }

  handleUpdateContactList = () => {
    const { contacts, filter } = this.state;  

    return contacts.filter(contact => {
      const filterLower = filter.toLowerCase();
      const contactNameLower = contact.name.toLowerCase();
      
      return contactNameLower.includes(filterLower);
    })
  }

  onDeleateButton = (id) => {
    const { contacts } = this.state;
    const updateUsersList = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: [...updateUsersList] });    
  }
  
  render() {
    const { filter } = this.state;  

    return (
      <div >
        <MainHeader >Hogwarts Magical Phonebook</MainHeader>
        <ContactForm onSubmit={this.handleOnSubmit} />
        <SecondHeader>Contacts</SecondHeader>
        <Filter filterValue={filter} filteringMethod={this.heandleOnFilter} />
        <ContactList contactsNames={this.handleUpdateContactList()} deleteBtn={this.onDeleateButton} />
      </div>
    )
  }  
}

export default App;
