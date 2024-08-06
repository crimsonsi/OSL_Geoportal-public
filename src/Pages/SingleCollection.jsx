import React, {useState, useEffect, useRef} from "react";
import Header from "../components/Utils/header";
import SelectMain from "../components/Utils/SelectMain";
import Footer from "../components/Utils/footer";
import "../Styles/singlecollection.scss";
import Pagination from "../components/Utils/pagination";

const criteria = ["Title", "Description", "Owner", "Keywords"];

export default function SingleCollection(props) {
  const pathName = window.location.pathname.split("/")[2].replace("%20", " ");

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [crit, setCrit] = useState(criteria[0]);
  const [loading, setLoading] = useState(null);
  const [filter, setFilter] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const [query, setQuery] = useState(null);
  const srch = useRef();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if(!query) {
        fetch(`/api/data/collection/${pathName}/${(currentPage - 1) * 12}`, {
            method: "GET",
            credentials: "include",
            })
            .then((res) => {
                if (res.ok) return res.json();
                else throw Error("");
            })
            .then((data) => {
                setData(data);
            })
            .catch((e) => {
                console.log(e);
            });
    } else {
        search(query);
    }
  }, [currentPage, refresh, query]);

  function search(q) {
    setLoading(true);
    fetch(`/api/data/collection/${pathName}/search/${crit}/${q}/${(currentPage - 1) * 12}`, {
        method: "GET",
        credentials: "include",
    }).then(res => {
        if (res.ok) return res.json();
        else throw Error("");
    }).then((data) => {
        setData(data);
    }).catch(e => {
        console.log(e);
    });
  };

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
        <div className="content">
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
                  } else {
                    setQuery(e.target.value);
                  }
                }}
              />
              <i className="fa fa-search"></i>
            </form>
          </div>
          <div style={{"padding":"10px"}}>
            <h4>Collection: {pathName.replaceAll("%20", " ")}</h4>
          </div>
          {/* data page */}
          {data && data?.data?.length > 0 ? (
            <div className="list">
              {data?.data?.map((item, i) => {
                return <MyDocument key={i} item={item} />;
              })}
            </div>
          ) : (
            <div className="nodata">
              <p>
                Oops! There is no result for this criteria at the moment. To
                suggest or request data, please contact us{" "}
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
    </div>
  );
}

const MyDocument = (props) => {
  return (
    <div
      title={"Map Description" + "\n\n" + props.item.Description}
      className="stk"
      onClick={() => {
        window.location.href = `/maps/${props.item.Category}/${props.item.ID}`;
      }}
    >
      <img src={`/api/${props.item.Thumbnail}`} alt="" />
      <div className="np">
        <div className="tp">
          <h3>{props.item.Title}</h3>
        </div>
        <h4>Owner: {props.item.Owner}</h4>
        {props.item.Collection && <h4>Collection: {props.item.Collection}</h4>}
        <h4>Date Published: {props.item.updatedAt.split("T")[0]}</h4>
        <p>{props.item.Description}</p>
      </div>
    </div>
  );
};
