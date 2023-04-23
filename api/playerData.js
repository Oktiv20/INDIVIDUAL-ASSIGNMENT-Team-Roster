import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// CREATE PLAYER

const createPlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, playerObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

// GET PLAYERS

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// GET A SINGLE PLAYER

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// UPDATE PLAYER

const updatePlayer = (bookObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObj.firebaseKey}.json`, bookObj)
    .then(resolve)
    .catch(reject);
});

// DELETE PLAYERS

const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

export {
  createPlayer,
  getPlayers,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
};
