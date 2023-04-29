import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { getTeamsPlayers } from '../../api/teamData';
import { viewTeamDetails } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const [players, setPlayers] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getTeamsPlayers(firebaseKey).then(setPlayers);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-5" />
        <div className="d-flex flex-column text-white mt-5 details">
          <h1>
            {teamDetails.team_name}
          </h1>
          <br />
          <h3>
            {teamDetails.city_state}
          </h3>
          <h3>
            Stanley Cups: {teamDetails.stanleycups}
          </h3>
          <div className="d-flex flex-column">
            <Card.Img
              variant="top"
              src={teamDetails.image}
              alt={teamDetails.first_name}
              style={{
                width: '250px', height: '200px', border: 'solid', color: 'black',
              }}
            />
          </div>
          <h3 className="card-text bold">{teamDetails.favorite ? 'FAVORITE ⭐' : ''}</h3>
        </div>
      </div>
      <br />
      <h3 className="text-white details text-left">Team&apos;s Players</h3>
      <hr />
      <div className="d-flex flex-wrap">
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getTeamsPlayers} />
        ))}
      </div>
    </>
  );
}
