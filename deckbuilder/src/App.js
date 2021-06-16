import React, { useEffect, useState } from 'react'

import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
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
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import Alert from '@material-ui/lab/Alert';

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

//styling
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

//dialog box
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
  

//the entire app...
export default function App() {
  const classes = useStyles();
  useEffect(() => {
    fetchCards()
  }, [])

  //fetch
  async function fetchCards(){
    let url = `https://api.magicthegathering.io/v1/cards?gameFormat=standard`
    if (colorChecked.length !== 0) {
      url = `${url}&colors=${colorChecked.join('|')}`
    }
    if (typeChecked.length !== 0){
      url = `${url}&types=${typeChecked.join('|')}`
    }
    let res = await fetch(url)
    let newCards = await res.json()
    setCards(newCards)
  }

  //filter
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

  //deck
  const [occ, setOcc] = useState({})
  const [deck, setDeck] = useState([])
  const [decks, setDecks] = useState([])
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const countDup = () => {
    var c = {}
    for(var i=0;i<deck.length;i++)
      for(var j=0;j<deck.length;j++)
        if(deck[i]===deck[j])
          c[deck[i].card.name]=-~c[deck[i].card.name]
    setOcc(c)
  };
  useEffect(() => {
    countDup()
  }, [deck])

  //language handling and menus
  const [lang, setLang] = useState("english")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLang = (l) => {
    setLang(l);
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
      <MenuItem onClick={()=>handleLang("english")}>English</MenuItem>
      <MenuItem onClick={()=>handleLang("spanish")}>Spanish</MenuItem>
      <MenuItem onClick={()=>handleLang("german")}>German</MenuItem>
    </Menu>
  );
  const getImgLangURL = (card) => {
    if(lang==="german" && card.foreignNames && card.foreignNames[0])
      if(card.foreignNames[0].language === "German")
        return card.foreignNames[0].imageUrl  
    if(lang==="spanish" && card.foreignNames && card.foreignNames[1])
      if(card.foreignNames[1].language === "Spanish")
        return card.foreignNames[1].imageUrl
    return card.imageUrl
  };
  const getNameLang = (card) => {
    if(lang==="german" && card.foreignNames && card.foreignNames[0])
      if(card.foreignNames[0].language === "German")
        return card.foreignNames[0].name  
    if(lang==="spanish" && card.foreignNames && card.foreignNames[1])
      if(card.foreignNames[1].language === "Spanish")
        return card.foreignNames[1].name
    return card.name
  };
  const getTextLang = (card) => {
    if(lang==="german" && card.foreignNames && card.foreignNames[0])
      if(card.foreignNames[0].language === "German")
        return card.foreignNames[0].text  
    if(lang==="spanish" && card.foreignNames && card.foreignNames[1])
      if(card.foreignNames[1].language === "Spanish")
        return card.foreignNames[1].text
    return card.text
  };

  //slide out drawer hooks
  const [openDecks, setOpenDecks] = useState(false)
  const handleDecksOpen = () => setOpenDecks(true)
  const handleDecksClose = () => setOpenDecks(false)
  const [openDeck, setOpenDeck] = useState(false)
  const handleDeckOpen = () => setOpenDeck(true)
  const handleDeckClose = () => setOpenDeck(false)

  //dialog
  const [dialog, setDialog] = useState({});
  const handleDialogOpen = (n) => {
    setDialog({...dialog, [n]: true});
  };
  const handleDialogClose = (n) => {
    setDialog({...dialog, [n]: false});
  };

  //the page
  if(cards.cards)
    return (
      <>
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
        {/* Deck Drawer Slide Outs */}
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
            <div style={{paddingLeft: "20px", paddingTop: "20px"}}>
              <Badge badgeContent={occ[card.card.name]} color="secondary" anchorOrigin={{vertical: 'top',horizontal: 'left',}} >
                <Paper elevation={3} className={classes.drawer}>
                  <img src={card.card.imageUrl} alt={card.card.name}/>
                  <IconButton onClick={() => setDeck(deck.slice(0,deck.indexOf(card)).concat(deck.slice(deck.indexOf(card)+1)))}>
                    <HighlightOffIcon />
                  </IconButton>
                </Paper>
              </Badge>
            </div>
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
          {cards.cards
          .filter(card=>card.imageUrl!==undefined)
          //TODO FILTER CARDS WITH DUPLICATE NAMES
          .map((card) => (
            <>
              {/* Each Card */}
              <Badge badgeContent={occ[card.name]} color="secondary">
                <Paper elevation={3} className="cards">
                  <img src={getImgLangURL(card)} alt={card.name} onClick={()=>handleDialogOpen(card.name)}/>
                  <IconButton size="small" onClick={()=>setDeck([...deck,{card}])}><AddCircleOutlineIcon /></IconButton>
                </Paper>
              </Badge>
              {/* Each Card's dialog */}
              <Dialog onClose={()=>handleDialogClose(card.name)} open={dialog[card.name]}>
                <DialogTitle onClose={()=>handleDialogClose(card.name)}>
                  {getNameLang(card)}
                </DialogTitle>
                <DialogContent dividers>
                  <img src={getImgLangURL(card)} alt={card.name}/>
                  <Typography gutterBottom>
                    {getTextLang(card)}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={()=>handleDialogClose(card.name)} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ))}
        </div>
      </>
    )
  else
    return(<>Loading...</>)
}