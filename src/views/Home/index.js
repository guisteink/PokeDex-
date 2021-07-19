import React, { useEffect, useState } from "react";
import api from '../../services/api'
import { Grid, Container, makeStyles, Paper } from "@material-ui/core";
import { Link } from 'react-router-dom';
import _ from 'lodash'
import {
  Navbar,
  NavbarBrand,
  Media,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  Row,
  Col,
  Card, CardBody,
} from 'reactstrap';

const useStyles = makeStyles((theme) => ({
  containerGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  link: {
    marginTop: '10px',
    textDecoration: "none",
    cursor: "pointer"
  },
  paperStyle: {
    width: "20vw",
    minWidth: '150px',
    height: "10vh",
    minHeight: '50px',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  gridStyle: {
    display: 'flex', justifyContent: 'center'

  }
}));

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState("all");
  const [inputText, setInputText] = useState('')
  const classes = useStyles();

  useEffect(() => {
    loadPokemons()
  }, [filter]);

  const handleClick = () => {
    if (_.isEmpty(inputText)) {
      setFilter('all')
      window.location.reload();
    }
    setFilter(inputText)
  }

  const handleChange = (event) => {
    setInputText(event.target.value);
  }


  async function loadPokemons() {
    if (_.isEqual(filter, 'all' || null)) {
      await api.listAll()
        .then((res) => {
          setPokemons(res.data.results)
          console.log(pokemons)
        })
        .catch((err) => console.log(err))
    }
    else {
      const list = []
      await api.getPokemon(filter)
        .then((res) => {
          list.push(res.data.species)
          list.image = _.get(res, 'data.sprites.other.official-artwork.front_default')
          setPokemons(list)
          console.log(pokemons)
        })
        .catch((err) => console.log(err))
    }

  }

  return (
    <Container className={classes.containerGrid} maxWidth="md">
      <Grid className={classes.gridStyle} container>
        <Row>
          <Col style={{ marginBottom: '20px' }}>
            <InputGroup>
              <Input
                onChange={handleChange}
              />
              <InputGroupAddon addonType="append">
                <Button onClick={() => handleClick()} style={{ backgroundColor: "red", border: 'none' }}>Find</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </Grid>
      <Grid className={classes.gridStyle} container spacing={4}>
        {pokemons.length === 1 && (
          pokemons.map((obj, index) => (
            <Grid key={index} item>
              <Paper style={{ width: '35vw', height: 'auto', }} className={classes.paperStyle} elevation={10}>
                <Link className={classes.link} to={`/pokemon/${obj.url.split('pokemon-species/')[1]}`}>
                  <strong>{obj.name}</strong>
                </Link>
                <Media >
                  <Media style={{ width: '30vw', height: 'auto' }} object src={pokemons.image} ></Media>
                </Media>
              </Paper>
            </Grid>
          )))}
        {pokemons.length > 1 &&
          pokemons.map((obj, index) => (
            <Grid key={index} item>
              <Paper className={classes.paperStyle} elevation={10}>
                <Link className={classes.link} to={`/pokemon/${obj.url.split('pokemon/')[1]}`}>
                  <strong>{obj.name}</strong>
                </Link>
              </Paper>
            </Grid>
          ))
        }
        {pokemons.length === 0 &&
          <Card style={{ width: '100%', marginTop: '10px' }}>
            <CardBody>
              <Row>
                <Col>
                  <h5>Ops, some error occurred </h5>
                  <span>Reload the page</span>
                </Col>
              </Row>
              <Row>
              </Row>
            </CardBody>
          </Card>}
      </Grid>
    </Container >
  )
}
