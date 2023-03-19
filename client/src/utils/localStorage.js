export const getCurrentOpponent = () => {
  const opponent = localStorage.getItem('current_opponent')
    ? JSON.parse(localStorage.getItem('current_opponent'))
    : false;

  return opponent;
};

export const setCurrentOpponent = (opponent) => {

    localStorage.setItem('current_opponent', JSON.stringify(opponent));

};

export const removeCurrentOpponent = () => {
  localStorage.removeItem('current_opponent')
};
