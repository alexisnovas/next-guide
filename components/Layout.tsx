import React from "react";

const Layout: React.FC = ({children}) => {
  return (
    <div>
      <nav>
        <li>Home</li>
      </nav>
      {children}
    </div>
  );
};

export default Layout;