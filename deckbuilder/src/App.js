import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import './App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(20),
      height: theme.spacing(30),
    },
  },
}));

export default function App() {
  const [cards, setCards] = useState([])

  async function fetchCards(){
    let res = await fetch('https://api.magicthegathering.io/v1/cards?setName=kaldheim')
    let json = await res.json()
    setCards(json)
    console.log(json)
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const classes = useStyles();
  
  if(cards.cards)
    return (
      <div className={classes.root}>
        {cards.cards.map((card) => (
          <Paper elevation={3} className="cards">
            <img src={card.imageUrl} alt={card.name}/>
            <IconButton><AddCircleOutlineIcon /></IconButton>
          </Paper>
        ))}
      </div>
    );
  else
    return(<div>Loading...</div>)
}