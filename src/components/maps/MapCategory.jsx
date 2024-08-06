import { useEffect, useState } from "react";
import Pagination from "../Utils/pagination";
import "../../Styles/documents.scss";
import WaveLoading from "../Utils/WaveLoading";
import SelectMain from "../Utils/SelectMain";
import { useRef } from "react";

const criteria = ["Title", "Description", "Owner", "Keywords"];

export default function MapCategory(props) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [crit, setCrit] = useState(criteria[0]);
  const [loading, setLoading] = useState(null);
  const [filter, setFilter] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const srch = useRef();
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (filter == "All") {
      setLoading(true);
      fetch(`/api/data/category/${props.category}/${(currentPage - 1) * 12}`)
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
      fetch(
        `/api/data/tpaginated/${props.category}/${filter}/${
          (currentPage - 1) * 12
        }`
      )
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
  }, [currentPage, refresh, filter]);

  function search(q) {
    setLoading(true);
    fetch(`/api/data/search/${crit}/${q}`)
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

  return (
    <div className="arc">
      <div className="slist">
        <div className="scontainer">
          <div className="left">
            <Category
              txt="All"
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
            />
            <Category
              txt="Raster"
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
            />
            <Category
              txt="Vector"
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
                    } else {
                      search(e.target.value);
                    }
                  }}
                />
                <i className="fa fa-search"></i>
              </form>
            </div>

            <div className="list">
              {data &&
                data?.data?.length > 0 &&
                data?.data?.map((item, i) => {
                  return <MyDocument key={i} item={item} />;
                })}
            </div>
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
        <h4>Date Published: {props.item.updatedAt.split("T")[0]}</h4>
        <p>{props.item.Description}</p>
      </div>
    </div>
  );
};
