/* State */
const freelancers = [];
const maxFreelancers = 10;

// `setInterval` will call `addFreelancer` every 3000 milliseconds (3 seconds)
const addFreelancerIntervalId = setInterval(addFreelancer, 3000);

render(); // We call this function once to render the initial state

/**
 * Update the DOM to reflect the current state.
 * The term "render" is often used to describe this process.
 */
function render() {
  // Render the freelancers
  const freelancersList = document.querySelector("#freelancers");
  const freelancerElements = freelancers.map((freelancer) => {
    const element = document.createElement("li");
    element.classList.add("freelancer");
    element.innerHTML = `<strong>Name:</strong> ${freelancer.name}, <strong>Occupation:</strong> ${freelancer.occupation}, <strong>Starting Price:</strong> $${freelancer.startingPrice}`;
    return element;
  });
  freelancersList.replaceChildren(...freelancerElements);

  // Render the average starting price
  const averageText = document.querySelector("#averageText");
  const averagePrice = calculateAverageStartingPrice();
  averageText.textContent = `Average Starting Price: $${averagePrice.toFixed(2)}`;
}

/**
 * Add a random freelancer to the `freelancers` array
 */
function addFreelancer() {
  const names = ["Alice", "Bob", "Carol", "David", "Eva"];
  const occupations = ["Writer", "Teacher", "Programmer", "Designer", "Translator"];
  const startingPrice = Math.floor(Math.random() * 100) + 30; // Random starting price between $30 and $129

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomOccupation = occupations[Math.floor(Math.random() * occupations.length)];

  const newFreelancer = { name: randomName, occupation: randomOccupation, startingPrice };
  freelancers.push(newFreelancer);

  render();

  if (freelancers.length >= maxFreelancers) {
    clearInterval(addFreelancerIntervalId);
  }
}

/**
 * Calculate the average starting price of all freelancers
 */
function calculateAverageStartingPrice() {
  const totalStartingPrice = freelancers.reduce((sum, freelancer) => sum + freelancer.startingPrice, 0);
  return freelancers.length === 0 ? 0 : totalStartingPrice / freelancers.length;
}