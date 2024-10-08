import { Box, Card, Container, Divider, Typography } from "@mui/material";
import ImageUpload from "./ImageUpload";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function PreviewData(props) {
  return (
    <Card>
      <Typography variant="h5" gutterBottom>
        {props.body.Title}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid2 container spacing={3}>
        <Grid2 item md={8}>
          <Typography variant="body1" gutterBottom>
            {props.body.Description}
          </Typography>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            <strong>Dataset: </strong>
            {props.body.Dataset}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Keywords: </strong>
            {props.body.Keywords}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Collection: </strong>
            {props.body.Collection ? props.body.Collection : `None`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Owner: </strong>
            {props.body.Owner}
          </Typography>
          {props.body.SourceLink && (
            <Typography variant="body1" gutterBottom>
              <strong>Link: </strong>
              <a
                className="sourcelink"
                href={props.body.SourceLink}
                target="_blank"
              >
                Go to Source
              </a>
            </Typography>
          )}
          <Typography variant="body1" gutterBottom align="left">
            <strong>Date of Capture: </strong>
            {props.body.AcquisitionDate ? props.body.AcquisitionDate : `N/A`}
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            <strong>Classification Type: </strong>
            {props.body?.Data[0]?.style?.type} Classification
          </Typography>
        </Grid2>
        <Grid2 item md={4}>
          <ImageUpload
            preview={true}
            body={props.body}
            updateBody={props.updateBody}
          />
        </Grid2>
      </Grid2>
    </Card>
  );
}
