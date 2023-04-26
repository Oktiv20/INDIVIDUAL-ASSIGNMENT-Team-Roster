import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  team_name: '',
  city: '',
  stanleycups: '',
  favorite: false,
};

function TeamForm({ teamObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (teamObj.firebaseKey) setFormInput(teamObj);
  }, [teamObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamObj.firebaseKey) {
      updateTeam(formInput)
        .then(() => router.push(`/team/${teamObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(() => {
        router.push('/teams');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{teamObj.firebaseKey ? 'Update' : 'Create'} Team</h2>

      {/* FIRST NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter A Team Name"
          name="team_name"
          value={formInput.team_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LAST NAME INPUT */}
      <FloatingLabel controlId="floatingInput2" label="City, State" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter A City and State"
          name="city_state"
          value={formInput.city_state}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* STANLEY CUP INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Stanley Cups" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Number of Stanley Cups"
          name="stanleycups"
          value={formInput.stanleycups}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON */}
      <Button type="submit">{teamObj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    city_state: PropTypes.string,
    stanleycups: PropTypes.number,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  teamObj: initialState,
};

export default TeamForm;
