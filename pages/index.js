/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

function Home() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  const getAllthePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllthePlayers();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>TEAM</h1>
      <Link href="/player/new" passHref>
        <Button>Add A Player</Button>
      </Link>
      <div className="text-center d-flex flex-wrap">
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllthePlayers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
