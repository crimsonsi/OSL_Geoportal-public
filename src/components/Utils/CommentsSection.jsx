import { useState, useEffect } from "react";
import Commentcontent from "./Commentcontent";
import Pagination from "./pagination";

export default function CommentsSection(props) {
  const [data, setData] = useState(null);
  const [sNo, setSNo] = useState((currentPage-1) * 12 + 1);
  const [time, setTime] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setData(null);
    setSNo((currentPage-1) * 12 + 1);
    fetch(`/api/instance/comments/${props.instanceID}/${(currentPage - 1) * 12}`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch messages!!!");
        }
        return res.json();
      })
      .then((data) => {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var dateTime = date + " " + time;

        setTime(dateTime);
        setData(data);
      })
      .catch((err) => {});
  }, [props.refresh, props.changed, currentPage]);

  // function scrollPages(offset) {
  //   setOffset(offset);
  // }

  return (
    <>
      <h2>Comments</h2>
      {data && data ? (
        <p className="display">
          Displaying {data?.data?.length} of {data.total} Comments. (No. {sNo} -{" "}
          {data?.data?.length === 12 ? (currentPage) * 12 : sNo + (data?.data?.length - 1)})
        </p>
      ) : (
        <p className="display">There are no Messages currently</p>
      )}
      <div className="messagecontent">
        {data &&
          data.data?.map((message) => {
            if (message.Verification) {
              return (
                <Commentcontent
                  message={message}
                  update_url={`api/comments/${message.CommentID}`}
                  replies_url={`api/repliesbycommentsid/${message.CommentID}`}
                  currentUser={props.currentUser}
                />
              );
            }
          })}
      </div>
      {data && (
        <Pagination
        totalItems={data.total}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      )}
    </>
  );
}
