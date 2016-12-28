import React from 'react';
import Header from './Header';
import Game from '../game/Game';

function Layout() {
  return (
    <div>
      <Header />
      <section>
        <Game />
      </section>
      <footer />
    </div>
  );
}

export default Layout;
