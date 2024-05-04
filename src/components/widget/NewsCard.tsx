import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { INews } from "../../@types/News";

interface NewsCardProps {
  news: INews;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { urlToImage, title, description } = news;

  return (
    <Card component='li' sx={{ width: 300 }}>
      <CardMedia component='img' height='140' image={urlToImage} alt='News Image' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <Button size='small'>Read More...</Button>
    </Card>
  );
};

export default NewsCard;
