/// <reference types="Cypress" />

import '@testing-library/cypress/add-commands';

const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl') + '/user/auth/signin',
    body: {
      email: Cypress.env('email'),
      password: Cypress.env('password')
    }
  }).then((res) => {
    window.localStorage.setItem('IQI_ERP_TOKEN', res.body.token);
  });
});

Cypress.Commands.add('FindHeading', ({ getKey, title }) => {
  cy.get(getKey).should(($btn2) => {
    expect($btn2.text()).to.eq(title);
  });
});

Cypress.Commands.add('TableTest1', ({ comboboxSelect }) => {
  cy.findByRole('combobox').select(comboboxSelect);
});

Cypress.Commands.add('TestButton1', ({ value }) => {
  cy.findByRole('button', {
    name: value
  }).then(($button) => {
    if ($button.is('enabled')) {
      console.log('BUTTON_IS_ENABLED');
      $button.click();
    } else {
      //do something else
      console.log('BUTTON_IS_NOT_ENABLED');
    }
  });
});
