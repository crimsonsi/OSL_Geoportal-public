import React from 'react'
import Header from "../components/Utils/header"
import Footer from "../components/Utils/footer"
import about1Background from "../assets/imgs/about_1_background.jpg"
import about2Background from "../assets/imgs/about_2_background.jpg"

export default function AboutPage(props){


    return (
      <>
        <Header
          isAuthenticated={props.isAuthenticated}
          setIsAuthenticated={props.setIsAuthenticated}
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
        />
        <section className="aboutPage section-1">
          <div className="text-main">
            <h1>About</h1>
            <h2>The Data Portal</h2>
            <p>
              The data portal is a one stop Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Ducimus, rem blanditiis quaerat quos
              non nesciunt, ipsa voluptatibus, a cupiditate temporibus nam eaque
              vel nisi. Adipisci mollitia quibusdam in reprehenderit corrupti!
            </p>
            <a href="/#explore">Explore Products</a>
          </div>
          <div
            className="img-hero"
            style={{
              backgroundImage: `url(${about2Background})`,
            }}
          ></div>
        </section>
        <section className="aboutPage section-2">
          <div
            className="img-hero"
            style={{
              backgroundImage: `url(${about1Background})`,
            }}
          ></div>
          <div className="text">
            <h2>The kenya Space Agency</h2>
            <p>
              KSA is mandated to promote, coordinate and regulate space related
              activities in the country. This will be achieved through promotion
              of research and innovations in space science, technology and
              respective applications as well as enhancing the regulatory
              framework. It will also spur Kenya’s competitiveness and
              positioning in playing a critical role in the regional and global
              space agenda
            </p>
          </div>
        </section>
        <section className="aboutPage section-3">
          <h2>Data portal purpose and functionality</h2>

          <div className="container">
            <div>
              <h4>Disseminating Spatial Data</h4>
              <p>
                The KSA Data platform enables the agency share spatial data and
                maps in diverse formats such as PDF, Shapefiles, KML, GeoJSON,
                and Web Services.
              </p>
            </div>
            <div>
              <h4>Data Analysis</h4>
              <p>
                The platform provides several data analysis capabilities. Users
                can build simple to complex queries for the analysis of data
                attributes. The portal's search function allows query for
                specific data. Access to the Open Data Cube enables users
                analyse the Earth observation data.
              </p>
            </div>

            <div>
              <h4>Report Generation</h4>
              <p>
                After perfoming their data analysis, users are able to generate
                a report of their interaction with the data automatically. The
                portal allows export generation of PFD reports from its
                available templates which users can edit and export.
              </p>
            </div>
            <div>
              <h4>Download Data</h4>
              <p>
                Users are able to download spatial data in different data
                formats. Data available to users ranges from thematic data,
                topographical maps, cadastral maps to aerial images and web
                services.
              </p>
            </div>
          </div>
        </section>
        <section className="aboutPage section-4">
          <div className="vision">
            <h2>Kenya Space Agency Geoplatform </h2>
            <p>
              The KSA Data Portal is a platform created for the purpose of
              sharing spatial data with the public. The public who are the major
              stakeholders targeted by the portal consists of companies and
              organizations dealing with spatial data in their business
              operations, individual people who are key decision makers in their
              capacities and need spatial information to influence their
              decisions, researchers in the academia field and proffessionals
              needing spatial data for their projects and researches.
            </p>
            <p>
              The Data portal is an easy to use application. Public users
              register on the portal by creating an account. The account
              consists of an email address and password which a user uses to
              sign-in into the portal. On successful login, a user is able to
              access functionalities of the Geo-platform, beginning with a list
              of published instances organized categorically.
            </p>
            <p>
              The Data Portal consists of a data page showing all data in the
              public portal published by the administrator via the admin portal.
              Users can categorize the data and also search based on the titles
              and keywords in the data.
            </p>
            <p>
              Users can view single instances of the published data on the
              platfrom.
            </p>
            <p>
              The portal consists of a contact us page which provides an
              interactive feedback mechanism that provides the functionality for
              the user to communicate with the system administrator.
            </p>
            <h3>
              The Data Portal has got several special functionalities for its
              users.
            </h3>
            <ul>
              <li>
                It allows users access data for different thematic layers and
                base maps(high-resolution satellite images, topographical and
                hybrid maps) which are disseminated by KSA.
              </li>
              <li>
                It allow users perform spatial analysis of thematic data layers
                such as buffer analysis and proximit analysis.
              </li>
              <li>It allows users build custom queries on thematic data.</li>
              <li>
                It allows users report and update events such as forest fires,
                floods, landslides, and natural calamities along with photograph
                storage.
              </li>
              <li>
                It allows users access cadastral maps that have been availed by
                the Kenya Space Agency.
              </li>
              <li>
                It allows users access and prepare a digital atlas for
                administrators, planners, or resource managers.
              </li>
            </ul>
          </div>
        </section>
        <Footer />
      </>
    );
}