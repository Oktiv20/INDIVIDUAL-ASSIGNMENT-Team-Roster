import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPlayers } from '../../api/playerData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getPlayers(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-white ms-5 details">
        <h5>
          {playerDetails.playerObject?.first_name} {playerDetails.playerObject?.last_name}
          <br />
          <br />
        </h5>
        <hr />
        <p>{playerDetails.position || ''}</p>
        <hr />
        <p>
          {playerDetails.captain
            ? `Captain: $${playerDetails.captain}`
            : ''}
        </p>
      </div>
    </div>
  );
}
