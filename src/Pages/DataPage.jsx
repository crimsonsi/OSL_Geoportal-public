import { React, useEffect, useState } from "react";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/footer";
import "../Styles/documents.scss";
import Pagination from "../components/Utils/pagination";
import { useRef } from "react";
import SelectMain from "../components/Utils/SelectMain";
import WaveLoading from "../components/Utils/WaveLoading";
import placeholder from "../assets/imgs/folder1.png";

const criteria = ["Title", "Collection", "Description", "Owner", "Keywords"];

export default function DataPage(props) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [crit, setCrit] = useState(criteria[0]);
  const [loading, setLoading] = useState(null);
  const [filter, setFilter] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const [query, setQuery] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const srch = useRef();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsFixed(scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!query || query == "") {
      if (filter == "All") {
        setLoading(true);
        fetch(`/api/data/status/${(currentPage - 1) * 12}`)
          .then((res) => {
            if (res.ok) return res.json();
            else throw Error("");
          })
          .then((data) => {
            setLoading(false);
            setData(data);
          })
          .catch((e) => {
            setLoading(false);
          });
      } else {
        setLoading(true);
        fetch(`/api/data/apaginated/status/${filter}/${(currentPage - 1) * 12}`)
          .then((res) => {
            if (res.ok) return res.json();
            else throw Error("");
          })
          .then((data) => {
            setLoading(false);
            setData(data);
          })
          .catch((e) => {
            setLoading(false);
          });
      }
    }
    else {
      search(query);
    }
  }, [currentPage, refresh, filter, query]);

  function search(q) {
    if (filter == "All") {
      setLoading(true);
      fetch(`/api/data/status/search/${crit}/${q}/${(currentPage - 1) * 12}`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          setData(data);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
    else {
      setLoading(true);
      fetch(`/api/data/category/${filter}/status/search/${crit}/${q}/${(currentPage - 1) * 12}`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          setData(data);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  }

  return (
    <div className="data">
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="Browse Data"
      />
      <div className="dcontainer">
        <div className="arc">
          <div className="slist">
            <div className="scontainer">
              <div className={`left ${isFixed ? "fixed" : ""}`}>
                <Category
                  txt="All"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                />
                <Category
                  txt="Agriculture"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                />
                <Category
                  txt="Climate and Weather"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                />
                <Category
                  txt="Natural Resources"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                />
                <Category
                  txt="Spatial Planning"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                />
                <Category
                  txt="Disaster"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                />
                {/* <Category
                  txt="Raster Data"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                /> */}
                <Category
                  txt="General Data"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                />
                <Category
                  txt="Time Series"
                  filter={filter}
                  setFilter={setFilter}
                  setCurrentPage={setCurrentPage}
                />
              </div>
              <div className="smain">
                <div className="top">
                  <dir className="yr">
                    <h4>Search Criteria</h4>
                    <SelectMain
                      data={criteria}
                      getSelected={(v) => {
                        setCrit(v);
                      }}
                    />
                  </dir>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      ref={srch}
                      type="text"
                      placeholder={"Searching by " + crit}
                      required
                      onChange={(e) => {
                        if (e.target.value == "") {
                          setData(null);
                          setRefresh(!refresh);
                          setQuery(e.target.value);
                        } else {
                          setQuery(e.target.value);
                        }
                      }}
                    />
                    <i className="fa fa-search"></i>
                  </form>
                </div>

                {data && data?.data?.length > 0 ? (
                  <div className="list">
                    {data?.data?.map((item, i) => {
                      return (
                        <MyDocument key={i} item={item}/>
                      );
                    })}
                  </div>
                ) : (
                  <div className="nodata">
                    <p>
                      Oops! There is no result for this criteria at the moment.
                      To suggest or request data, please contact us{" "}
                      <a href="/contact" title="Talk to us.">
                        here
                      </a>
                      .
                    </p>
                  </div>
                )}
                <br />
                <br />
                {data && (
                  <Pagination
                    totalItems={data.total}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
            {loading && <WaveLoading />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const Category = (props) => {
  return (
    <div
      onClick={() => {
        props.setFilter(props.txt);
        props.setCurrentPage(1);
      }}
      style={{
        backgroundColor: props.txt == props.filter ? "#60606030" : "white",
      }}
      className="category"
    >
      <p>{props.txt}</p>
    </div>
  );
};

const MyDocument = (props) => {
  return (
    <div
      title={props.item.Collection ? `Collection: ${props.item.Collection}` : `Map Description: \n\n ${props.item.Description}`}
      className={props.item.Collection ? "stk col":"stk"}
      onClick={() => {
        if (props.item.Collection) {
          window.location.href = `/collections/${props.item.Collection}`;
        } else {
          window.location.href = `/maps/${props.item.Category}/${props.item.ID}`;
        }
      }}
    >
      {props.item.Collection ? <span className="collectionLabel">Data Group</span>:""}
      {props.item.Collection ? <img src={placeholder} alt="" /> : <img src={`/api/${props.item.Thumbnail}`} alt="" />}
      <div className="np">
        <div className="tp">
          {props.item.Collection ? <h3>{`Collection: ${props.item.Collection}`}</h3> : <h3>{props.item.Title}</h3>}
        </div>
        <h4>Owner: {props.item.Owner}</h4>
        {props.item.Collection && <h4>Collection: {props.item.Collection}</h4>}
        <h4>Date Published: {props.item.updatedAt.split("T")[0]}</h4>
        <p>{props.item.Description}</p>
      </div>
    </div>
  );
};
