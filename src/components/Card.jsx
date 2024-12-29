import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react/prop-types
export default function CustomCard({ title, time, cardImg }) {
  return (
    <Card sx={{ maxWidth: 345, width: "250px" }}>
      <CardMedia sx={{ height: 200 }} image={cardImg} title="time" />
      <CardContent>
        <Typography gutterBottom variant="h2" component="div">
          {time}
        </Typography>
        <Typography variant="h5" sx={{ color: "text.secondary" }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
