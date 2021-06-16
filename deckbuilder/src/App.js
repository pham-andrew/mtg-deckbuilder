import React, { useEffect, useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import TranslateIcon from '@material-ui/icons/Translate';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CloseIcon from '@material-ui/icons/Close';

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
  drawer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(10),
      height: theme.spacing(15),
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
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

  useEffect(() => {
    fetchCards()
  }, [])

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

  const [deck, setDeck] = useState([])
  const [decks, setDecks] = useState([])
  const [lang, setLang] = useState("english")
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSpanish = () => {
    setLang("spanish");
    handleMenuClose();
  };
  const handleEnglish = () => {
    setLang("english");
    handleMenuClose();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEnglish}>English</MenuItem>
      <MenuItem onClick={handleSpanish}>Spanish</MenuItem>
    </Menu>
  );

  const [openDecks, setOpenDecks] = useState(false)
  const handleDecksOpen = () => setOpenDecks(true)
  const handleDecksClose = () => setOpenDecks(false)

  const [openDeck, setOpenDeck] = useState(false)
  const handleDeckOpen = () => setOpenDeck(true)
  const handleDeckClose = () => setOpenDeck(false)

  const getURL = (card) => {
    if(lang==="english")
      return card.imageUrl
    if(lang==="spanish")
      if(card.foreignNames[1].imageUrl)
        return card.foreignNames[1].imageUrl
  };

  if(cards.cards)
    return (
      <div>
        {/* App Bar */}
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                The Better Deck Builder
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <div className={classes.grow} />
              <div>
                <IconButton color="inherit" onClick={handleDeckOpen}>
                  <Badge badgeContent={deck.length} color="secondary">
                    <ViewCarouselIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleDecksOpen}>
                  <Badge badgeContent={decks.length} color="secondary">
                    <LibraryBooksIcon />
                  </Badge>
                </IconButton>
                <IconButton edge="end" onClick={handleProfileMenuOpen} color="inherit">
                  <TranslateIcon />
                </IconButton>
              </div>
              <div>
                <IconButton color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </div>
        {/* Drawer Slide Outs */}
        <Drawer anchor="right" open={openDeck} onClose={()=>{handleDeckClose(); setSaved(false)}}>
          <Collapse in={saved}>
            <Alert
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {setSaved(false)}}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Deck Saved
            </Alert>
          </Collapse>
          {deck.map((card) => (
            <Paper elevation={3} className={classes.drawer}>
              <img src={card.card.imageUrl} alt={card.card.name}/>
              <IconButton onClick={() => setDeck(deck.slice(0,deck.indexOf(card)).concat(deck.slice(deck.indexOf(card)+1)))}>
                <HighlightOffIcon />
              </IconButton>
            </Paper>
          ))}
          <Button variant="contained" color="primary" onClick={()=> {setDecks([...decks,{deck}]); setDeck([]); setSaved(true)}}>Save Deck</Button>
        </Drawer>
        <Drawer anchor="right" open={openDecks} onClose={()=>{handleDecksClose(); setLoaded(false)}}>
          <Collapse in={loaded}>
            <Alert
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {setLoaded(false);}}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Deck Loaded
            </Alert>
          </Collapse>
          {decks.map((d) => (
            <Paper elevation={3} className={classes.drawer}>
              <img src={d.deck[0].card.imageUrl} alt={d.deck[0].card.name} onClick={() => {setDeck(d.deck); setLoaded(true)}}/>
              <IconButton onClick={() => setDecks(decks.slice(0,decks.indexOf(d)).concat(decks.slice(decks.indexOf(d)+1)))}>
                <HighlightOffIcon />
              </IconButton>
            </Paper>
          ))}
        </Drawer>
        {/* Filters */}
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
        {/* Cards */}
        <div className={classes.root}>
          {cards.cards.filter(card=>card.imageUrl!==undefined).map((card) => (
            <Paper elevation={3} className="cards">
              <img src={getURL(card)} alt={card.name}/>
              <IconButton size="small" onClick={()=>setDeck([...deck,{card}])}><AddCircleOutlineIcon /></IconButton>
            </Paper>
          ))}
        </div>
      </div>
    )
  else
    return(<div>Loading...</div>)
}