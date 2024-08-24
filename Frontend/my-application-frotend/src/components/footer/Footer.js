import React from "react";
import { Link } from "react-router-dom";
import "../../style/footer.css"
const Footer = () => {
  return (
      <div>
        <footer className="py-2 pt-4">
          <div className="bottom-footer">
            <div className="container text-center  mx-auto ">
              <p>
                Copyright @ {/*?php  echo date("Y"); ?*/} All Rights are
                reserved by <Link to="#" className="text-info"> @ServiceProvider</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default Footer;
