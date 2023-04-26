import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
        <div className="d-flex flex-column text-black mt-5 details">
          <h1>
            {teamDetails.team_name}
          </h1>
          <h3>
            {teamDetails.city_state}
          </h3>
          <h3>
            Stanley Cups: {teamDetails.stanleycups}
          </h3>
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
