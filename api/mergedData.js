import { deletePlayer, getSinglePlayer } from './playerData';
import { deleteSingleTeam, getSingleTeam, getTeamsPlayers } from './teamData';

const viewPlayerDetails = (playerFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerFirebaseKey)
    .then((playerObject) => {
      getSingleTeam(playerObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...playerObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamsPlayers(teamFirebaseKey)])
    .then(([teamObject, teamPlayersArray]) => {
      resolve({ ...teamObject, players: teamPlayersArray });
    }).catch((error) => reject(error));
});

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamsPlayers(teamId).then((playersArray) => {
    console.warn(playersArray, 'Team Players');
    const deletePlayerPromises = playersArray.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deletePlayerPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPlayerDetails, viewTeamDetails, deleteTeamPlayers };
