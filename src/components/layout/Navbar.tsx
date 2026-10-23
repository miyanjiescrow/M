import React from 'react';

export const Navbar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => (
  <nav className="p-4 bg-white shadow-sm">
    <div className="container mx-auto flex justify-between">
      <span className="font-bold">Miyanji</span>
      <button onClick={toggleTheme}>Theme: {theme}</button>
    </div>
  </nav>
);
