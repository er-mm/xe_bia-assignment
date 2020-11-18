import React, { useState, useEffect } from 'react';
import theme from './Theme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Planets from './components/Planets';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [userList, setUserList] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (!name) {
      fetch('https://swapi.dev/api/people/')
        .then(res => res.json())
        .then(data => setUserList(data));
    } else {
      fetch('https://swapi.dev/api/planets/')
        .then(res => res.json())
        .then(data => setPlanets(data));
    }
  }, [name]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setSearch(e.target.value)
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                {name ? `Hi ${name}` : `Login`}
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
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleChange}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} setName={setName} userList={userList} />} />
          <Route path={`/search`} render={(props) => <Planets {...props} name={name} search={search} planets={planets} />}>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
