import React from "react";
import Conversations from "./Conversations";
import Searchbar from "./Searchbar";

const Sidebar = () => {
  return (
    <div>
      <Searchbar />
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
};

export default Sidebar;
