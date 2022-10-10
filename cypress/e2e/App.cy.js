describe('App container test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Visit the app container and show the Hello World!', () => {
    cy.log('MATCH HEADING');
    cy.get('h1').should((title$) => {
      expect(title$.text()).to.eq('Hello, world!');
    })
  })
})