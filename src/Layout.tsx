import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return <main className="layout">
      <div className="relative navbar z-10">
        <div className="flex gap-4">
          <a className="btn btn-ghost text-xl" href="#/">Home</a>
          <a className="btn btn-ghost text-xl" href="#/quiz">Quiz</a>
          {/* <a className="btn btn-ghost text-xl" href="#/puzzles">Puzzles</a> */}
        </div>
      </div>
      <div className="relative p-4 z-10">
        {children}
      </div>
    </main>;
}

export default Layout;
