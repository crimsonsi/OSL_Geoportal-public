import { useState, useEffect } from "react";
import Commentcontent from "./Commentcontent";
import { Typography, Box, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

export default function CommentsSection(props) {
  const [data, setData] = useState(null);
  const [time, setTime] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sNo, setSNo] = useState((currentPage - 1) * 12 + 1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setData(null);
    setSNo((currentPage - 1) * 12 + 1);
    fetch(
      `/api/instance/comments/${props.instanceID}/${(currentPage - 1) * 12}`,
      {
        method: "get",
        credentials: "include",
      }
    )
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

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      {data ? (
        <Typography variant="body1" gutterBottom>
          Displaying {data?.data?.length} of {data.total} Comments. (No. {sNo} -{" "}
          {data?.data?.length === 12
            ? currentPage * 12
            : sNo + (data?.data?.length - 1)}
          )
        </Typography>
      ) : (
        <Typography variant="body1" gutterBottom>
          There are no Messages currently
        </Typography>
      )}

      <Box className="messagecontent">
        {data ? (
          data.data?.map((message) => {
            if (message.Verification) {
              return (
                <Commentcontent
                  key={message.CommentID}
                  message={message}
                  update_url={`api/comments/${message.CommentID}`}
                  replies_url={`api/repliesbycommentsid/${message.CommentID}`}
                  currentUser={props.currentUser}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          <CircularProgress />
        )}
      </Box>

      {data && (
        <Box mt={2}>
          <Pagination
            count={Math.ceil(data.total / 12)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
