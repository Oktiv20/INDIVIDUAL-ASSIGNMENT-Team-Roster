import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.first_name}${playerObj.last_name}?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{
        width: '18rem', margin: '10px', backgroundColor: 'black', color: 'white', textAlign: 'text-center',
      }}
      >
        <Card.Body>
          <Card.Title>{playerObj.first_name} {playerObj.last_name}</Card.Title>
          <br />
          <h5 className="card-text bold">{playerObj.position}</h5>
          <h5 className="card-text">{playerObj.captain ? 'Captain' : ''}</h5>
          {/* DYNAMIC LINK TO EDIT THE PLAYER DETAILS  */}
          <Link href={`/player/${playerObj.firebaseKey}`} passHref>
            <Button variant="success" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    captain: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
