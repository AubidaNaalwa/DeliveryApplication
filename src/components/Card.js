import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://blog.totango.com/wp-content/uploads/2020/01/What_is_Customer_Retention_Management_and_Why_Does_it_Matter_.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.order.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            From: {props.order.area}
          </Typography>
          <Typography variant="body2" component="p">
            Phone Number: {props.order.phoneNumber}
          </Typography>
          <Typography variant="body2" component="p">
            ID: {props.order.id}
          </Typography>
          <Typography variant="body2" component="p">
            Order Id: {props.order._id}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="primary" onClick={() => { props.setRecieved(props.order._id) }}>
          set Deliverd
        </Button>        
      </CardActions>

    </Card>
  );
}