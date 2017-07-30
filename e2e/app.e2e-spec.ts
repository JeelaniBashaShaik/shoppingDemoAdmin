import { ShoppingDemoAdminPage } from './app.po';

describe('shopping-demo-admin App', () => {
  let page: ShoppingDemoAdminPage;

  beforeEach(() => {
    page = new ShoppingDemoAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
