import { React, useEffect, useRef, useState } from "react";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/footer";
import "../Styles/Publications.scss";
import WaveLoading from "../components/Utils/WaveLoading";
import Pagination from "../components/Utils/pagination";
import placeholder from "../assets/imgs/placeholder.png";
import { pdfjs } from "react-pdf";


export default function PublicationsPage(props) {
  const [publications, setPublications] = useState();
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(true);
  const [loading, setLoading] = useState(null);
  const [filter, setFilter] = useState("Publications");
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const srch = useRef();
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setShowing(false);
    } else {
      setShowing(true);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  const [arrow, setArrow] = useState("fa fa-angle-up");

  const toggle = () => {
    setShow(!show);
    if (show) {
      setArrow("fa fa-angle-down");
    } else setArrow("fa fa-angle-up");
  };



  useEffect(() => {
    setPublications(null)
    if (filter == "Story Maps") {
      setLoading(true);
      fetch(`/api/storymaps/paginated/${(currentPage - 1) * 12}`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          setPublications(data)
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(`/api/publications/type/${filter}/${(currentPage - 1) * 12}`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          setPublications(data);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  }, [currentPage, refresh, filter]);

  function search(q) {
    setPublications(null)
    setLoading(true);
    fetch(`/api/publications/search/${q}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("");
      })
      .then((data) => {
        setLoading(false);
        setPublications(data)
      })
      .catch((e) => {
        setLoading(false);
      });
  }

  //Try to use useState
  return (
    <div className="data">
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="Knowledge Hub"
      />
      <div className="publications">
        <div className="container">
          <div className="right">
            <div className="top">

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  ref={srch}
                  type="text"
                  placeholder="Type to search"
                  required
                  onChange={(e) => {
                    if (e.target.value == "") {
                      setPublications(null);
                      setRefresh(!refresh);
                    }
                  }}
                />
                <i onClick={() => {
                  if (srch.current.value != "") {
                    search(srch.current.value);
                  }
                }} className="fa fa-search"></i>
              </form>
            </div>
            <div className="left">
              <Category
                txt="Publications"
                filter={filter}
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
              />
              <Category
                txt="Story Maps"
                filter={filter}
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
              />
              <Category
                txt="Reports"
                filter={filter}
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
              />
              <Category
                txt="Learning Materials"
                filter={filter}
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
              />
              <Category
                txt="Other"
                filter={filter}
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <div className="list">
              {publications &&
                publications?.result?.length > 0 && <>{
                  filter == "Story Maps" ? publications?.result?.map((item, i) => {
                    return <StoryMap key={i} item={item} />;
                  }) : publications?.result?.map((item, i) => {
                    return <MyDocument key={i} item={item} />;
                  })
                }
                </>
              }
            </div>
            {publications && (
              <Pagination
                totalItems={publications.total}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
        {loading && <WaveLoading />}
      </div>
      {/* <Footer /> */}
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
  const [blob, setBlob] = useState(null);
  const [firstPageBlob, setFirstPageBlob] = useState(null);

  useEffect(() => {
    if (blob) {
      const fetchPdfFirstPage = async () => {
        try {
          const pdf = await pdfjs.getDocument(blob).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement("canvas");
          const canvasContext = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext, viewport }).promise;
          setFirstPageBlob(canvas.toDataURL());
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      };

      fetchPdfFirstPage();
    }
  }, [blob]);

  useEffect(() => {
    fetch(`/api/uploads/${props.item.File}`)
      .then((res) => {
        if (res.ok) return res.blob();
        else throw Error("");
      })
      .then((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          setBlob(url);
          return () => {
            window.URL.revokeObjectURL(url);
          };
        }
      })
      .catch((e) => { });
  }, []);

  return (
    <div className="stk"
    // onClick={()=>{
    //   window.location.href = "/portal/knowledgehub/preview/" + props.item.PublicationID
    // }}
    >
      {firstPageBlob ? (
        <img src={firstPageBlob} alt="" />
      ) : (
        <img src={placeholder} alt="" />
      )}
      <div className="np">
        <div className="tp">
          <h3>{props.item.Title}</h3>
        </div>
        <br />
        <p>{props.item.Description}</p>
        <p>Category: {props.item.Type}</p>
        {blob && (
          <a title="Download File" href={blob} target="_blank">
            View/Download <i className="fa fa-file-pdf-o">&#xf1c1;</i>
          </a>
        )}
      </div>
    </div>
  );
};

const StoryMap = (props) => {
  const [blob, setBlob] = useState(null);
  const [firstPageBlob, setFirstPageBlob] = useState(null);


  return (
    <div className="stk"
      onClick={() => {
        // window.location.href = "/portal/knowledgehub/preview/" + props.item.StoryMapID
      }}
    >
      {props.item?.Images?.length > 0 ? <img src={"/api/uploads/" + props.item.Images[0]} alt="" /> : <img src={placeholder} alt="" />}
      <div className="np">
        <div className="tp">
          <h3>{props.item.Title}</h3>
        </div>
        <br />
        <p>Category: {props.item.Category}</p>
        <a href={`/knowledgehub/storymap/${props.item.StoryMapID}`}>Click to view more</a>
      </div>
    </div>
  );
};
