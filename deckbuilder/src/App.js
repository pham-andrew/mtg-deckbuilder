import React, { useEffect, useState } from 'react'
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
  const handleColorCheckboxChange = (event) =>{
    let newColor = event.target.id
    let indexOfColor = -1
    let newColorArray = colorChecked
    if(colorChecked.includes(newColor)){
      indexOfColor = colorChecked.indexOf(newColor)
      newColorArray.splice(indexOfColor, 1)
      setColor([...newColorArray])
    }else {
      setColor([...colorChecked, newColor])
    }
  }

  const handleTypeCheckboxChange = (event) =>{
    let newType = event.target.id
    let indexOfType = -1
    let newTypeArray = typeChecked
    if(typeChecked.includes(newType)){
      indexOfType = typeChecked.indexOf(newType)
      newTypeArray.splice(indexOfType, 1)
      setType([...newTypeArray])
    }else {
      setType([...typeChecked, newType])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCards();
  }

  const [cards, setCards] = useState([])
  const [colorChecked, setColor] = useState([])
  const [typeChecked, setType] = useState([])

  async function fetchCards(){
    let url = `https://api.magicthegathering.io/v1/cards?gameFormat=standard`
    if (colorChecked.length !== 0) {
      url = `${url}&colors=${colorChecked.join('|')}`
    }
    if (typeChecked.length !== 0){
      url = `${url}&types=${typeChecked.join('|')}`
    }
    console.log(url)
    let res = await fetch(url)
    let newCards = await res.json()
    console.log(newCards)
    console.log(newCards.cards[5].imageUrl)
    setCards(newCards)
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const classes = useStyles();

  if(cards.cards)
    return (
      <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="checkbox" id="Blue" name="Blue" value='blue' onChange={handleColorCheckboxChange}/>
            <label for="Blue">Blue</label>
          <input type="checkbox" id="White" name="White" value='white' onChange={handleColorCheckboxChange}/>
            <label for="White">White</label>
          <input type="checkbox" id="Red" name="Red" value='red' onChange={handleColorCheckboxChange}/>
            <label for="Red">Red</label>
          <input type="checkbox" id="Black" name="Black" value='black' onChange={handleColorCheckboxChange}/>
            <label for="Black">Black</label>
          <input type="checkbox" id="Green" name="Green" value='green' onChange={handleColorCheckboxChange}/>
            <label for="Green">Green</label>
          <input type="checkbox" id="Colorless" name="Colorless" />
            <label for="Colorless">Colorless</label>
        </div>
        <div>
          <input type="checkbox" id="Creature" name="Creature" value='Creature' onChange={handleTypeCheckboxChange}/>
            <label for="Creature">Creature</label>
          <input type="checkbox" id="Instant" name="Instant" value='Instant' onChange={handleTypeCheckboxChange}/>
            <label for="Instant">Instant</label>
          <input type="checkbox" id="Sorcery" name="Sorcery" value='Sorcery' onChange={handleTypeCheckboxChange}/>
            <label for="Sorcery">Sorcery</label>
          <input type="checkbox" id="Artifact" name="Artifact" value='Artifact' onChange={handleTypeCheckboxChange}/>
            <label for="Artifact">Artifact</label>
          <input type="checkbox" id="Enchantment" name="Enchantment" value='Enchantment' onChange={handleTypeCheckboxChange}/>
            <label for="Enchantment">Enchantment</label>
          <input type="checkbox" id="Land" name="Land" value='Land' onChange={handleTypeCheckboxChange}/>
            <label for="Land">Land</label>
          <input type="checkbox" id="Planeswalker" name="Planeswalker" value='Planeswalker' onChange={handleTypeCheckboxChange}/>
            <label for="Planeswalker">Planeswalker</label>
          <input type="submit" value="Search" />
        </div>
      </form>
      <div className={classes.root}>
        {cards.cards.filter(card => card.imageUrl !== undefined)
        .map((card) => (
          <Paper elevation={3} className="cards">
            <img src={card.imageUrl} alt={card.name} />
            <IconButton size="small"><AddCircleOutlineIcon /></IconButton>
          </Paper>
        ))}
      </div>
      </>
    );
  else
    return(<div>Loading...</div>)
}