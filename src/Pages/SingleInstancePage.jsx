import { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
} from "@mui/material";
import {
  Comment as CommentIcon,
  Send as SendIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Reply as ReplyIcon,
} from "@mui/icons-material";
import MapPreview from "../components/Map/MapPreview";
import WorldDataPreview from "../components/WorldData/WorldDataPreview";
import BaseMapPreview from "../components/BaseMap/BaseMapPreview";
import PreviewData from "../components/maps/PreviewData";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import TimeSeriesPreview from "../components/TimeSeries/TimeSeriesPreview";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export default function SingleInstancePage(props) {
  const pathname = window.location.pathname.split("/");
  const instanceId = window.location.pathname.split("/")[3];
  const [refresh, setRefresh] = useState(true);
  const [changed, setChanged] = useState(false);
  const rfContent = useRef();
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [replyDialog, setReplyDialog] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [body, updateBody] = useState({
    To: instanceId,
    From: "",
    Subject: "",
    Content: "",
    UserID: "",
  });
  const [choice, setChoice] = useState(null);
  const opts = [
    "Agriculture",
    "Climate and Weather",
    "Natural Resources",
    "Spatial Planning",
    "Disaster",
  ];

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("cilbup_ksa");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
        if (Date.now() >= decoded.exp * 1000) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const i = opts.map((e) => e).indexOf(pathname[2].replaceAll("%20", " "));

    if (i !== -1) {
      setChoice("thematic");
    } else {
      if (pathname[2].includes("Raster")) {
        setChoice("raster");
      } else if (pathname[2].includes("General")) {
        setChoice("general");
      } else if (pathname[2].includes("Time")) {
        setChoice("timeseries");
      } else window.location.href = "/portal/maps";
    }
  }, [pathname, opts]);

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, [refresh, instanceId]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const response = await fetch(`/api/comments/${instanceId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const postComment = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please login to post a comment",
        confirmButtonColor: "#1976d2",
      });
      return;
    }

    const content = rfContent.current.value.trim();
    if (!content) {
      Swal.fire({
        icon: "error",
        title: "Empty Comment",
        text: "Please enter some text for your comment",
        confirmButtonColor: "#1976d2",
      });
      return;
    }

    setSubmittingComment(true);

    const commentData = {
      To: instanceId,
      From: currentUser?.Name,
      Subject: instanceId,
      Content: content,
      UserID: currentUser?.UserID,
    };

    try {
      const response = await fetch("/api/comments/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(commentData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "Comment Posted!",
          text: "Your comment has been posted successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        rfContent.current.value = "";
        setRefresh(!refresh);
      } else {
        throw new Error(data.error || data.comment || "Failed to post comment");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to post comment. Please try again.",
        confirmButtonColor: "#1976d2",
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleMenuClick = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  const handleEditComment = () => {
    setEditContent(selectedComment.Content);
    setEditDialog(true);
    handleMenuClose();
  };

  const handleDeleteComment = async () => {
    handleMenuClose();

    const result = await Swal.fire({
      title: "Delete Comment?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#1976d2",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/comments/${selectedComment.id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Comment has been deleted",
            timer: 2000,
            showConfirmButton: false,
          });
          setRefresh(!refresh);
        } else {
          throw new Error("Failed to delete comment");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete comment",
          confirmButtonColor: "#1976d2",
        });
      }
    }
  };

  const handleReplyComment = () => {
    setReplyDialog(true);
    handleMenuClose();
  };

  const submitEdit = async () => {
    if (!editContent.trim()) {
      Swal.fire({
        icon: "error",
        title: "Empty Content",
        text: "Please enter some text",
        confirmButtonColor: "#1976d2",
      });
      return;
    }

    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ Content: editContent }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Comment has been updated",
          timer: 2000,
          showConfirmButton: false,
        });
        setEditDialog(false);
        setRefresh(!refresh);
      } else {
        throw new Error("Failed to update comment");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update comment",
        confirmButtonColor: "#1976d2",
      });
    }
  };

  const submitReply = async () => {
    if (!replyContent.trim()) {
      Swal.fire({
        icon: "error",
        title: "Empty Reply",
        text: "Please enter some text for your reply",
        confirmButtonColor: "#1976d2",
      });
      return;
    }

    try {
      const replyData = {
        To: instanceId,
        From: currentUser?.Name,
        Subject: instanceId,
        Content: replyContent,
        UserID: currentUser?.UserID,
        ParentID: selectedComment.id,
      };

      const response = await fetch("/api/comments/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(replyData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Reply Posted!",
          text: "Your reply has been posted",
          timer: 2000,
          showConfirmButton: false,
        });
        setReplyDialog(false);
        setReplyContent("");
        setRefresh(!refresh);
      } else {
        throw new Error("Failed to post reply");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to post reply",
        confirmButtonColor: "#1976d2",
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderComment = (comment, isReply = false) => (
    <Card
      key={comment.id}
      sx={{
        mb: 2,
        ml: isReply ? 4 : 0,
        border: isReply ? "1px solid #e0e0e0" : "none",
        boxShadow: isReply ? 1 : 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
            <PersonIcon />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 2 }}>
                {comment.From || "Anonymous"}
              </Typography>
              <Chip
                icon={<TimeIcon />}
                label={formatDate(comment.CreatedAt)}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            </Box>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
              {comment.Content}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isAuthenticated && (
                <Button
                  size="small"
                  startIcon={<ReplyIcon />}
                  onClick={() => {
                    setSelectedComment(comment);
                    handleReplyComment();
                  }}
                  sx={{ textTransform: "none" }}
                >
                  Reply
                </Button>
              )}
            </Box>
          </Box>
          {isAuthenticated && currentUser?.UserID === comment.UserID && (
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, comment)}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        parent="singleinstance"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ my: 2 }}>
          <MapPreview />
        </Box>

        {/* <Box sx={{ my: 4 }}>
          <PreviewData body={body} />
        </Box> */}

        {/* Comments Section */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CommentIcon color="primary" />
                Comments ({comments.length})
              </Typography>

              {/* Comment Form */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Leave a Comment
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder={
                    isAuthenticated
                      ? "Share your thoughts..."
                      : "Please login to post a comment"
                  }
                  inputRef={rfContent}
                  disabled={!isAuthenticated}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SendIcon />}
                  onClick={postComment}
                  disabled={!isAuthenticated || submittingComment}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 3,
                  }}
                >
                  {submittingComment ? "Posting..." : "Post Comment"}
                </Button>
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Comments List */}
              <Box>
                {loadingComments ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                          <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                            sx={{ mr: 2 }}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            <Skeleton
                              variant="text"
                              width="30%"
                              height={24}
                              sx={{ mb: 1 }}
                            />
                            <Skeleton variant="text" width="100%" height={20} />
                            <Skeleton variant="text" width="80%" height={20} />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))
                ) : comments.length === 0 ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 6,
                      color: "text.secondary",
                    }}
                  >
                    <CommentIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      No comments yet
                    </Typography>
                    <Typography variant="body2">
                      Be the first to share your thoughts!
                    </Typography>
                  </Box>
                ) : (
                  comments.map((comment) => renderComment(comment))
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                position: "sticky",
                top: 20,
                background: "linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%)",
                border: "1px solid rgba(25, 118, 210, 0.1)",
                boxShadow: "0 4px 20px rgba(25, 118, 210, 0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <CommentIcon
                  sx={{
                    fontSize: 28,
                    mr: 2,
                    color: "primary.main",
                    p: 1,
                    bgcolor: "rgba(25, 118, 210, 0.1)",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    fontSize: "1.1rem",
                  }}
                >
                  Discussion Guidelines
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "flex-start",
                    fontWeight: 500,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "success.main",
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  Keep comments relevant to the data
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "flex-start",
                    fontWeight: 500,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "info.main",
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  Be respectful and constructive
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "flex-start",
                    fontWeight: 500,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "warning.main",
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  Share insights and ask questions
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.primary",
                    display: "flex",
                    alignItems: "flex-start",
                    fontWeight: 500,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "error.main",
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  Report inappropriate content
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(25, 118, 210, 0.05)",
                  borderRadius: 2,
                  border: "1px solid rgba(25, 118, 210, 0.1)",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  💡 Quality discussions help everyone learn better
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditComment}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteComment} sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={submitEdit} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={replyDialog}
        onClose={() => setReplyDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reply to Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialog(false)}>Cancel</Button>
          <Button onClick={submitReply} variant="contained">
            Reply
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
}
