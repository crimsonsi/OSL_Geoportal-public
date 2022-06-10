import React from "react";
import FooterItem from "./footerItem";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer" id="footer">
        <div className="overlay"></div>
        <div className="container">
          <FooterItem
            title="Oakar Services Ltd."
            info="Promote, coordinate and regulate space related actiities in kenya"
          />
          <FooterItem
            title="Sitemap"
            i1="Home"
            link1="/"
            i2="Data"
            link2="/data"
            i4="About"
            link4="/about"
          />
          <FooterItem
            title="LEGAL"
            i1="Terms and Conditions"
            link1="/terms"
            i2="Privacy Policy"
            link2="/privacypolicy"
          />
          <FooterItem
            title="CONTACTS"
            mail="sales@osl.co.ke"
            num1="+254 700 000 000"
            num2="+254 733 000 000"
            social={true}
          />
        </div>
        <span className="copyright">Copyright 2022. All rights reserved.</span>
      </div>
    );
  }
}

export default Footer;
