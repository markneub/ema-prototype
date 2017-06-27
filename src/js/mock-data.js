function generateDay () {
  return {
    mood: getRandomTuple(),
    stress: getRandomTuple(),
    energy: getRandomTuple()
  }
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomTuple () {
  return [getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5)]
}

export default function () {
  let accountAge = 7 // past days of user data to dummy up
  let userData = []
  for (let i = 0; i < accountAge; i++) {
    userData.push(generateDay())
  }
  return userData
}
