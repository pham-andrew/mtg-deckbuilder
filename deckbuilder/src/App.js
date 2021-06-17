import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import About from './About'

import { fade, makeStyles, withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Alert from '@material-ui/lab/Alert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import TranslateIcon from '@material-ui/icons/Translate';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CloseIcon from '@material-ui/icons/Close';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FilterListIcon from '@material-ui/icons/FilterList';

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
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

//dialog box styling
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
        <IconButton className={classes.closeButton} onClick={onClose}>
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

  //filter
  const [cards, setCards] = useState([])
  const [colorChecked, setColor] = useState([])
  const [typeChecked, setType] = useState([])
  const [cost, setCost] = useState(0)
  const [setChecked, setSet] = useState([])
  const [search, setSearch] = useState("")

  const handleColorCheckboxChange = (event) =>{
    let newColor = event.target.name
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
    let newType = event.target.name
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

  const handleCostChange = (event) => {
    setCost(event.target.name)
  }

  const handleSetChange = (event) => {
    let newSet = event.target.name
    let indexOfSet = -1
    let newSetArray = setChecked
    if(setChecked.includes(newSet)) {
      indexOfSet = setChecked.indexOf(newSet)
      newSetArray.splice(indexOfSet, 1)
      setSet([...newSetArray])
    } else {
      setSet([...setChecked, newSet])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCards();
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    console.log(search)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCards();
  }

  function resetFilters(e) {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.checked = false))
    setColor([])
    setType([])
    setCost(0)
    setSet([])
  }

  async function fetchCards(){

    let url = `https://api.magicthegathering.io/v1/cards?gameFormat=standard`
    if(setChecked.length !== 0) {
      url = `${url}&set=${setChecked.join('|')}`
    }
    if (colorChecked.length !== 0) {
      url = `${url}&colors=${colorChecked.join('|')}`
    }
    if (typeChecked.length !== 0){
      url = `${url}&types=${typeChecked.join('|')}`
    }
    if (cost !== 0) {
      url = `${url}&cmc=${cost}`
    }

    if(search !== ""){
      url = `https://api.magicthegathering.io/v1/cards?gameFormat=standard&name=${search}`
    }

    console.log(url)
    let res = await fetch(url)
    let res2 = await fetch(`${url}&page=2`)
    let res3 = await fetch(`${url}&page=3`)
    let res4 = await fetch(`${url}&page=4`)
    let res5 = await fetch(`${url}&page=5`)

    let newCardsPg1 = await res.json()
    let newCardsPg2 = await res2.json()
    let newCardsPg3 = await res3.json()
    let newCardsPg4 = await res4.json()
    let newCardsPg5 = await res5.json()

    let allCards = [...newCardsPg1.cards, ...newCardsPg2.cards, ...newCardsPg3.cards, ...newCardsPg4.cards, ...newCardsPg5.cards]
    setCards(allCards)
  }

  //filter drawer
  const [openFilter, setOpenFilter] = useState(false)
  const handleFilterOpen = () => setOpenFilter(true)
  const handleFilterClose = () => setOpenFilter(false)

  //deck
  const [occ, setOcc] = useState({})
  const [deck, setDeck] = useState([])
  const [decks, setDecks] = useState([])
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const countDup = () => {
    var c = {}
    for(var i=0;i<deck.length;i++)
      if(!c[deck[i].card.name])
        for(var j=0;j<deck.length;j++)
          if(deck[i].card.name===deck[j].card.name)
            c[deck[i].card.name]=-~c[deck[i].card.name]
    setOcc(c)
  }

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

  //disable ripple
  const theme = createMuiTheme({
    props: {
      // Name of the component
      MuiButtonBase: {
        // The properties to apply
        disableRipple: true // No more ripple, on the whole application!
      }
    },
    overrides: {
      MuiIconButton: {
        root: {
          '&:hover': {
            backgroundColor: "transparent"
          }
        }
      }
    }
  });

  //paper color
  const getColor = (c) => {
    if(c){
      if(c[0] === "G")
        return "lightGreen"
      if(c[0] === "B")
        return "lightSlateGray"
      if(c[0] === "U")
        return "lightBlue"
      if(c[0] === "R")
        return "#ffcccb"
    }
  }

  useEffect(() => {
    fetchCards()
  }, [colorChecked, typeChecked, cost, setChecked])

  //the whole app
  if(cards){
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
                onClick={handleFilterOpen}
              >
                <FilterListIcon />
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
        <MuiThemeProvider theme={theme}>
          <Drawer anchor="right" open={openDeck} onClose={()=>{handleDeckClose(); setSaved(false)}}>
            <Collapse in={saved}>
              <Alert
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => {setSaved(false)}}
                    style={{ backgroundColor: 'none' }}
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
                    <img src={getImgLangURL(card.card)} alt={card.card.name}/>
                    <IconButton onClick={() => setDeck(deck.slice(0,deck.indexOf(card)).concat(deck.slice(deck.indexOf(card)+1)))}>
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                    <IconButton onClick={() => setDeck(deck.concat(card))}>
                      <AddBoxIcon />
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
        </MuiThemeProvider>
        {/* Filters TODO DISABLE RIPPLE*/}
        <Drawer anchor="left" open={openFilter} onClose={()=>handleFilterClose()} variant="persistent">
          <div className={classes.drawerHeader}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={handleFilterClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <form onChange={handleSubmit}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Color</FormLabel>
              <FormGroup name="color">
                <FormControlLabel control={<Checkbox />} id="Blue" name="blue" value='blue' onChange={handleColorCheckboxChange} label="Blue" />
                <FormControlLabel control={<Checkbox />} id="White" name="white" value='white' onChange={handleColorCheckboxChange} label="White" />
                <FormControlLabel control={<Checkbox />} id="Red" name="red" value='red' onChange={handleColorCheckboxChange} label="Red" />
                <FormControlLabel control={<Checkbox />} id="Black" name="black" value='black' onChange={handleColorCheckboxChange} label="Black" />
                <FormControlLabel control={<Checkbox />} id="Green" name="green" value='green' onChange={handleColorCheckboxChange} label="Green" />
                <FormControlLabel control={<Checkbox />} id="Colorless" name="colorless" value='colorless' onChange={handleColorCheckboxChange} label="Colorless" />
              </FormGroup>
              <FormLabel component="legend">Type</FormLabel>
              <FormGroup name="type">
                <FormControlLabel control={<Checkbox />} type="Creature" id="Creature" name="Creature" value='creature' onChange={handleTypeCheckboxChange} label="Creature" />
                <FormControlLabel control={<Checkbox />} type="Instant" id="Instant" name="Instant" value='instant' onChange={handleTypeCheckboxChange} label="Instant" />
                <FormControlLabel control={<Checkbox />} type="Sorcery" id="Sorcery" name="Sorcery" value='sorcery' onChange={handleTypeCheckboxChange} label="Sorcery" />
                <FormControlLabel control={<Checkbox />} type="Artifact" id="Artifact" name="Artifact" value='artifact' onChange={handleTypeCheckboxChange} label="Artifact" />
                <FormControlLabel control={<Checkbox />} type="Enchantment" id="Enchantment" name="Enchantment" value='enchantment' onChange={handleTypeCheckboxChange} label="Enchantment" />
                <FormControlLabel control={<Checkbox />} type="Land" id="Land" name="Land" value='land' onChange={handleTypeCheckboxChange} label="Land" />
                <FormControlLabel control={<Checkbox />} type="Planeswalker" id="Planeswalker" name="Planeswalker" value='planeswalker' onChange={handleTypeCheckboxChange} label="Planeswalker" />
              </FormGroup>
              <FormLabel component="legend">Cost</FormLabel>
              <RadioGroup name="cost">
                <FormControlLabel control={<Radio />} id="0" name="0" value="0" onChange={handleCostChange} label="0" />
                <FormControlLabel control={<Radio />} id="1" name="1" value="1" onChange={handleCostChange} label="1" />
                <FormControlLabel control={<Radio />} id="2" name="2" value="2" onChange={handleCostChange} label="2" />
                <FormControlLabel control={<Radio />} id="3" name="3" value="3" onChange={handleCostChange} label="3" />
                <FormControlLabel control={<Radio />} id="4" name="4" value="4" onChange={handleCostChange} label="4" />
                <FormControlLabel control={<Radio />} id="5" name="5" value="5" onChange={handleCostChange} label="5" />
                <FormControlLabel control={<Radio />} id="6" name="6" value="6" onChange={handleCostChange} label="6" />
                <FormControlLabel control={<Radio />} id="7" name="7" value="7" onChange={handleCostChange} label="7" />
                <FormControlLabel control={<Radio />} id="8" name="8" value="8" onChange={handleCostChange} label="8" />
                <FormControlLabel control={<Radio />} id="9" name="9" value="9" onChange={handleCostChange} label="9" />
                <FormControlLabel control={<Radio />} id="10" name="10" value="10" onChange={handleCostChange} label="10" />
                <FormControlLabel control={<Radio />} id="11" name="11" value="11" onChange={handleCostChange} label="11" />
                <FormControlLabel control={<Radio />} id="12" name="12" value="12" onChange={handleCostChange} label="12" />
              </RadioGroup>
              <FormLabel component="legend">Set</FormLabel>
              <FormGroup name="set">
                <FormControlLabel control={<Checkbox />} id="ELD" name="ELD" value="ELD" onChange={handleSetChange} label="Throne of Elraine" />
                <FormControlLabel control={<Checkbox />} id="THB" name="THB" value="THB" onChange={handleSetChange} label="Theros Beyond Death" />
                <FormControlLabel control={<Checkbox />} id="IKO" name="IKO" value="IKO" onChange={handleSetChange} label="Ikoria Lair of Behemoths" />
                <FormControlLabel control={<Checkbox />} id="M21" name="M21" value="M21" onChange={handleSetChange} label="Core 2021" />
                <FormControlLabel control={<Checkbox />} id="ZNR" name="ZNR" value="ZNR" onChange={handleSetChange} label="Zendikar Rising" />
                <FormControlLabel control={<Checkbox />} id="KHM" name="KHM" value="KHM" onChange={handleSetChange} label="Kaldheim" />
                <FormControlLabel control={<Checkbox />} id="STX" name="STX" value="STX" onChange={handleSetChange} label="Strixhaven" />
              </FormGroup>
            </FormControl>
          </form>
        </Drawer>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Search by card name" value={search} onChange={handleSearchChange}/>
              <input type="submit" value="Search"/>
        </form>
        {/* Cards */}
        <div className={classes.root}>
          {cards
          .filter(card=>card.imageUrl!==undefined)
          .filter((card, index, self) => index === self.findIndex(t=> t.name === card.name))
          .map((card) => (
            <>
              {/* Each Card */}
              <Badge badgeContent={occ[card.name]} color="secondary">
                <Paper elevation={3} className="cards" style={{backgroundColor: getColor(card.colorIdentity)}}>
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
  }
  else
    return(<>Loading...</>)
}