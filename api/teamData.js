import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// CREATE TEAM
const createTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const setcode = { firebaseKey: data.name };
      fetch(`${dbUrl}/teams/${setcode.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setcode),
      }).then(resolve);
    })
    .catch(reject);
});

// GET ALL TEAMS
const getTeams = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET SINGLE TEAM
const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET A SINGLE TEAM'S PLAYERS
const getTeamsPlayers = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/players.json?orderBy="team_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// UPDATE TEAM
const updateTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

// DELETE TEAM
const deleteSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTeams,
  createTeam,
  getSingleTeam,
  deleteSingleTeam,
  updateTeam,
  getTeamsPlayers,
};
