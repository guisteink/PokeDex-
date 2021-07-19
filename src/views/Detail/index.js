import React, { useEffect, useState } from "react";
import api from '../../services/api'
import {
    Container, Row, Col, Media,
    Card, CardBody,
    Button, Badge, Breadcrumb, Fade, BreadcrumbItem,
} from 'reactstrap';
import _ from 'lodash'
import { makeStyles, Paper } from "@material-ui/core";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    link: { textDecoration: "none", cursor: "pointer" },
    breadcrumbStyle: { display: 'flex', justifyContent: 'center', marginTop: '20px' },
    breadcrumbItem: { textDecoration: 'none' },
    paperStyle: { marginBottom: '20px' },
    titleStyle: { display: 'flex', justifyContent: 'center', float: 'left', alignItems: 'center' },
    badgeStyle: { backgroundColor: "red", float: 'right', marginLeft: '10px' },
    contentPokemonStyle: { display: 'flex', justifyContent: 'center' },
    cardStyle: { marginTop: '10px', width: 'auto' }

}));

export default function Detail({ match }) {
    const classes = useStyles();
    const [pokemon, setPokemon] = useState({});
    const [specie, setSpecie] = useState({});
    const [evolution, setEvolution] = useState({});
    const [fadeIn, setFadeIn] = useState(false);
    const toggle = () => setFadeIn(!fadeIn);

    useEffect(() => {
        if (match.params.id != undefined) {
            console.log(match.params.id)
            try {
                loadPokemon()
                loadSpecie()
                loadEvolution()
            } catch (error) {
                console.log(error)
            }
        }
    }, []);

    async function loadPokemon() {
        await api.getPokemon(match.params.id)
            .then((res) => {
                setPokemon({
                    name: _.startCase(_.toLower(_.get(res, 'data.name'))),
                    image: _.get(res, 'data.sprites.other.official-artwork.front_default'),
                    stats: _.get(res, 'data.stats[1].base_stat'),
                    weight: _.get(res, 'data.weight'),
                    experience: _.get(res, 'data.base_experience'),
                    height: _.get(res, 'data.height'),
                    abilities: _.get(res, 'data.abilities')
                })
            })
            .catch((err) => console.log(err))
    }

    async function loadSpecie() {
        await api.getSpecie(match.params.id)
            .then((res) => {
                setSpecie({
                    habitat: _.get(res, 'data.habitat.name'),
                    happiness: _.get(res, 'data.base_happiness'),
                    capture_rate: _.get(res, 'data.capture_rate'),
                    is_baby: _.get(res, 'data.is_baby'),
                    is_legendary: _.get(res, 'data.is_legendary'),
                    is_mythical: _.get(res, 'data.is_mythical')
                })
            })
            .catch((err) => console.log(err))
    }

    async function loadEvolution() {
        await api.getEvolution(match.params.id)
            .then((res) => {
                setEvolution({
                    name: _.startCase(_.toLower(_.get(res, 'data.chain.evolves_to[0].species.name'))),
                    idURL: _.get(res, 'data.chain.evolves_to[0].species.url').split('/pokemon-species/')[1]
                })
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <Container>
            {(!_.isEmpty(pokemon && specie)) ? (
                <div>
                    <Breadcrumb className={classes.breadcrumbStyle}>
                        <BreadcrumbItem><a href="/" className={classes.breadcrumbItem}>Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>{pokemon.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <Paper elevation={10} className={classes.paperStyle} >
                        <CardBody>
                            <Row >
                                <Col>
                                    <Media>
                                        <Media object src={pokemon.image} ></Media>
                                    </Media>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col className={classes.titleStyle}>
                                            <h3>{pokemon.name}</h3>
                                            {pokemon.is_baby && <Badge className={classes.badgeStyle} >Baby</Badge>}
                                            {pokemon.is_legendary && <Badge className={classes.badgeStyle}>Legendary</Badge>}
                                            {pokemon.is_mythical && <Badge className={classes.badgeStyle} >Mythical</Badge>}
                                        </Col>
                                    </Row>
                                    <Row className={classes.contentPokemonStyle} >
                                        <Col>
                                            <Card className={classes.cardStyle}>
                                                <CardBody>
                                                    <h5>Weight
                                                        <Badge className={classes.badgeStyle}>
                                                            {pokemon.weight}
                                                        </Badge>
                                                    </h5>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card className={classes.cardStyle}>
                                                <CardBody>
                                                    <h5>Height
                                                        <Badge className={classes.badgeStyle}>
                                                            {pokemon.height}
                                                        </Badge>
                                                    </h5>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Card className={classes.cardStyle}>
                                                <CardBody>
                                                    <h5>Stats
                                                        <Badge className={classes.badgeStyle} >
                                                            {pokemon.stats}
                                                        </Badge>
                                                    </h5>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card className={classes.cardStyle}>
                                                <CardBody>
                                                    <h5>Experience
                                                        <Badge className={classes.badgeStyle}>
                                                            {pokemon.experience}
                                                        </Badge>
                                                    </h5>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Card className={classes.cardStyle} >
                                                <CardBody>
                                                    <h5>Happiness
                                                        <Badge className={classes.badgeStyle} >
                                                            {specie.happiness}
                                                        </Badge>
                                                    </h5>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card className={classes.cardStyle}>
                                                <CardBody>
                                                    <h5>Capture rate
                                                        <Badge className={classes.badgeStyle} >
                                                            {specie.capture_rate}
                                                        </Badge>
                                                    </h5>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    {pokemon.abilities &&
                                        <Row>
                                            <Col>
                                                <Card className={classes.cardStyle} >
                                                    <CardBody>
                                                        <h5>Abilities
                                                            {_.map(pokemon.abilities, (ability, index) => (
                                                                <Badge key={ability.index} className={classes.badgeStyle} key={ability.key} >
                                                                    {ability.ability.name}
                                                                </Badge>
                                                            ))}
                                                        </h5>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    }
                                    <Row>
                                        <Col>
                                            <Card className={classes.cardStyle} >
                                                <CardBody>
                                                    <Row style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Col>
                                                            <Button style={{backgroundColor: 'red', border: 'none'}} onClick={toggle}>Evolves to</Button>
                                                        </Col>
                                                        <Col>
                                                            {evolution.name ?
                                                                <Fade in={fadeIn} >
                                                                    <Link className={classes.link} to={`/pokemon/${evolution.idURL}`}>
                                                                        <Badge style={{ backgroundColor: "green", float: 'right', padding: '10px', marginLeft: '10px' }} >
                                                                            <strong>{evolution.name}</strong>
                                                                        </Badge>
                                                                    </Link>
                                                                </Fade>
                                                                :
                                                                <Fade in={fadeIn} >
                                                                    <Badge style={{ backgroundColor: "purple", float: 'right', padding: '10px', marginLeft: '10px' }}>
                                                                        <strong>No evolution registered</strong>
                                                                    </Badge>
                                                                </Fade>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Paper>
                </div>)
                :
                <div>
                    <Breadcrumb style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <BreadcrumbItem><a href="/" style={{ textDecoration: 'none' }}>Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>No pokemon available</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col>
                                    <h5>Ops, some error occurred</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link className={classes.link} to="/">Back to home</Link>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            }
        </Container >
    )
}
