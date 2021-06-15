import React from 'react';
import { useEffect, useState } from 'react'

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
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState([])
  const [decks, setDecks] = useState([])
  const [lang, setLang] = useState("english")
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function fetchCards(){
    let res = await fetch('https://api.magicthegathering.io/v1/cards?setName=kaldheim')
    let json = await res.json()
    setCards(json)
  }

  useEffect(() => {
    fetchCards()
  }, [])

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
        {/* Cards */}
        <div className={classes.root}>
          {cards.cards.map((card) => (
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