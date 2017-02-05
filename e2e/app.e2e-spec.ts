import { UsersNg2SpringPage } from './app.po';

describe('users-ng2-spring App', function() {
  let page: UsersNg2SpringPage;

  beforeEach(() => {
    page = new UsersNg2SpringPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
