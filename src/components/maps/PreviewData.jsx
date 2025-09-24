import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Dataset as DatasetIcon,
  Tag as TagIcon,
  Folder as CollectionIcon,
  Person as PersonIcon,
  Link as LinkIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  BrokenImage as BrokenImageIcon,
} from "@mui/icons-material";

export default function PreviewData(props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 4,
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          {props.body.Title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            opacity: 0.9,
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          {props.body.Description}
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Metadata Cards */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "1px 1px 5px #60606030",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        mr: 2,
                        width: 24,
                        height: 24,
                      }}
                    >
                      <DatasetIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Dataset
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {props.body.Dataset}
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "1px 1px 5px #60606030",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "secondary.main",
                        mr: 2,
                        width: 24,
                        height: 24,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Owner
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {props.body.Owner}
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "1px 1px 5px #60606030",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "success.main",
                        mr: 2,
                        width: 24,
                        height: 24,
                      }}
                    >
                      <CollectionIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Collection
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {props.body.Collection || "None"}
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "1px 1px 5px #60606030",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "info.main",
                        mr: 2,
                        width: 24,
                        height: 24,
                      }}
                    >
                      <CalendarIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Date of Capture
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {props.body.AcquisitionDate || "N/A"}
                  </Typography>
                </Paper>
              </Grid>

              {/* Keywords Section */}
              <Grid size={{ xs: 12 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "1px 1px 5px #60606030",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "warning.main",
                        mr: 2,
                        width: 24,
                        height: 24,
                      }}
                    >
                      <TagIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Keywords
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {props.body.Keywords?.split(",").map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword.trim()}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 2 }}
                      />
                    )) || (
                      <Typography variant="body2" color="text.secondary">
                        No keywords specified
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Grid>

              {/* Additional Information */}
              <Grid size={{ xs: 12 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "1px 1px 5px #60606030",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Additional Information
                  </Typography>

                  {props.body?.Data?.[0]?.style?.type && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body1">
                        <strong>Classification Type:</strong>{" "}
                        {props.body.Data[0].style.type} Classification
                      </Typography>
                    </Box>
                  )}

                  {props.body.SourceLink && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LinkIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body1">
                        <strong>Source:</strong>{" "}
                        <Typography
                          component="a"
                          href={props.body.SourceLink}
                          target="_blank"
                          sx={{
                            color: "primary.main",
                            textDecoration: "none",
                            fontWeight: 600,
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          Go to Source
                        </Typography>
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: "sticky", top: 20 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: "grey.300",
                }}
              >
                <img
                  src={props.body.Thumbnail}
                  alt="Thumbnail"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <Box
                  sx={{
                    display: "none",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                    height: "100%",
                  }}
                >
                  <BrokenImageIcon sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="body2">
                    Thumbnail not available
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
