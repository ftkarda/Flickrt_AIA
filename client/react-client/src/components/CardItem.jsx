import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function CardItem({ data }) {
  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      {/* End hero unit */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia component="img" image={data.media.m} alt="random" />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {data.title}
              </Typography>
              <Typography>{data.tags}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
