import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-dark p-4 text-white mt-5 text-center">
        <p>&copy;{new Date().getFullYear()} DevConnector</p>
      </div>
    </div>
  );
};

export default Footer;
