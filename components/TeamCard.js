import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamPlayers } from '../api/mergedData';

function TeamCard({ teamObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RE-RENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.team_name}?`)) {
      deleteTeamPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '18rem', height: '28rem', margin: '10px', backgroundColor: 'black', color: 'white',
    }}
    >
      <Card.Body>
        <Card.Img variant="top" src={teamObj.image} alt={teamObj.image} style={{ height: '150px', width: '150px' }} />
        <br />
        <Card.Title>{teamObj.team_name}</Card.Title>
        <br />
        <p className="card-text bold">{teamObj.city_state}</p>
        <p className="card-text bold">Stanley Cups: {teamObj.stanleycups}</p>
        <p className="card-text bold">{teamObj.favorite ? 'FAVORITE ⭐' : ''}</p>
        <br />
        {/* DYNAMIC LINK TO VIEW THE AUTHOR DETAILS  */}
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE AUTHOR DETAILS  */}
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    city_state: PropTypes.string,
    stanleycups: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
