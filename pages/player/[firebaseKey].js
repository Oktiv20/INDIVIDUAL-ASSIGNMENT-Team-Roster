import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { viewPlayerDetails } from '../../api/mergedData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-white ms-5 details">
        <h1>
          {playerDetails.first_name} {playerDetails.last_name}
          <br />
        </h1>
        <hr />
        {/* <p>{playerDetails.teamObj?.team_name}</p> */}
        <h2>{playerDetails.position || ''}</h2>
        <h3>
          {playerDetails.captain ? 'Captain' : ''}
        </h3>
        <hr />
        <div className="d-flex flex-column">
          <Card.Img variant="top" src={playerDetails.image} alt={playerDetails.first_name} style={{ width: '300px' }} />
        </div>
      </div>
    </div>
  );
}
