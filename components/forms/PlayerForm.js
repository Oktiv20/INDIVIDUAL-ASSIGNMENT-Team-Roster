import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createPlayer, updatePlayer } from '../../api/playerData';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';

const initialState = {
  first_name: '',
  last_name: '',
  position: '',
  captain: false,
};

export default function PlayerForm({ playerObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (playerObj.firebaseKey) setFormInput(playerObj);
  }, [playerObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerObj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push(`/player/${playerObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{playerObj.firebaseKey ? 'Update' : 'Create'} Player</h2>

      {/* FIRST NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LAST NAME INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* POSITION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Position" className="mb-3">
        <Form.Select
          type="text"
          placeholder="Select the player's position"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        >
          <option value="">Select a Position</option>
          <option value="Left Wing">Left Wing</option>
          <option value="Right Wing">Right Wing</option>
          <option value="Center">Center</option>
          <option value="Defenseman">Defenseman</option>
          <option value="Goalie">Goalie</option>
        </Form.Select>
      </FloatingLabel>

      {/* TEAM INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Team" className="mb-3">
        <Form.Select
          type="text"
          placeholder="Select the player's team"
          name="team_id"
          value={formInput.team_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.team_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* CAPTAIN CHECK */}
      <Form.Check
        className="text-black mb-3"
        type="switch"
        id="favorite"
        name="captain"
        label="Captain?"
        checked={formInput.captain}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            captain: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON */}
      <Button type="submit">{playerObj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}
PlayerForm.propTypes = {
  playerObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    captain: PropTypes.bool,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  playerObj: initialState,
};
