import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { INews } from "../../@types";

interface NewsCardProps {
  news: INews;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { image, title, description } = news;

  return (
    <Card component='li' sx={{ width: 300 }}>
      <CardMedia component='img' height='140' image={image} alt='News Image' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <Button size='small' sx={{ m: 2, p: 1, float: "right" }}>
        Read More...
      </Button>
    </Card>
  );
};

export default NewsCard;
