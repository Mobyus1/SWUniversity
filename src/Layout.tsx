import React from 'react';

import './Layout.css';

function Layout({ children }: { children: React.ReactNode }) {
  return <main className="layout">
      <div className="navbar">
        <div className="flex gap-4">
          <a className="btn btn-ghost text-xl" href="#/">Home</a>
          <a className="btn btn-ghost text-xl" href="#/quiz">Quiz</a>
          {/* <a className="btn btn-ghost text-xl" href="#/puzzles">Puzzles</a> */}
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </main>;
}

export default Layout;
