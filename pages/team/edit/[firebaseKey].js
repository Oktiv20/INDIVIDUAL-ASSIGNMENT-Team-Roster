import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TeamForm from '../../../components/forms/TeamForm';
import { getSingleTeam } from '../../../api/teamData';

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<TeamForm teamObj={editItem} />);
}
