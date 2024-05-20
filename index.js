const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');



const app = express();
const PORT = 5000;

app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

const scenariosFilePath = './data/scenarios.json';
const vehiclesFilePath = './data/vehicles.json';

// Helper functions to read and write JSON files
const readJsonFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


// Routes for Scenarios
app.get('/scenarios', (req, res) => {
  const scenarios = readJsonFile(scenariosFilePath);
  res.json(scenarios);
});

// Route to get the last used scenario ID
app.get('/scenarios/last-id', (req, res) => {
  try {
    const scenarios = readJsonFile(scenariosFilePath);
    // Check if there are any scenarios
    if (scenarios.length === 0) {
      res.status(200).json({ lastId: 0 }); // Return 0 if no scenarios exist
    } else {
      // Get the ID of the last scenario in the array
      const lastId = scenarios[scenarios.length - 1].id;
      res.status(200).json({ lastId });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/scenarios', (req, res) => {
  const scenarios = readJsonFile(scenariosFilePath);
  const newScenario = req.body;
  scenarios.push(newScenario);
  writeJsonFile(scenariosFilePath, scenarios);
  res.status(201).json(newScenario);
});

// PUT route to update a scenario
app.put('/scenarios/:id', (req, res) => {
  const scenarios = readJsonFile(scenariosFilePath);
  const { id } = req.params;
  const updatedScenario = req.body;
  //console.log('update',updatedScenario)
//console.log('scenarios',scenarios)
  // Find the index of the scenario with the specified ID
  const index = scenarios.findIndex((scenario) => scenario.id == id);
  //console.log('index',index)
  // If scenario found, update it and save to file
  if (index !== -1) {
    scenarios[index] = updatedScenario;
    writeJsonFile(scenariosFilePath, scenarios);
    res.json(updatedScenario);
  } else {
    // Scenario not found, return 404 error
    res.status(404).json({ message: 'Scenario not found' });
  }
});

app.delete('/scenarios/:id', (req, res) => {
  const scenarios = readJsonFile(scenariosFilePath);
  const { id } = req.params;
  const index = scenarios.findIndex((scenario) => scenario.id == id);
  console.log('index',index)
  if (index !== -1) {
    scenarios.splice(index, 1); // Remove the scenario at the found index
    writeJsonFile(scenariosFilePath, scenarios);
    res.status(204).send(); // Send a success response with no content
  } else {
    res.status(404).json({ message: 'Scenario not found' });
  }
});




// Routes for Vehicles
app.get('/vehicles', (req, res) => {
  const vehicles = readJsonFile(vehiclesFilePath);
  res.json(vehicles);
});


app.post('/vehicles', (req, res) => {
  const vehicles = readJsonFile(vehiclesFilePath);
  const newVehicle = req.body;
  vehicles.push(newVehicle);
  writeJsonFile(vehiclesFilePath, vehicles);
  res.status(201).json(newVehicle);
});

app.put('/vehicles/:id', (req, res) => {
  const vehicles = readJsonFile(vehiclesFilePath);
  const { id } = req.params;

  const updatedVehicle = req.body;
  
  const index = vehicles.findIndex((vehicle) => vehicle.id == id);
  //const index = scenarios.findIndex((scenario) => scenario.id == id);

  
  if (index !== -1) {
    vehicles[index] = updatedVehicle;
    writeJsonFile(vehiclesFilePath, vehicles);
    res.json(updatedVehicle);
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
});

app.delete('/vehicles/:id', (req, res) => {
  const vehicles = readJsonFile(vehiclesFilePath);
  const { id } = req.params;
  const index = vehicles.findIndex((vehicle) => vehicle.id == id);
  console.log('index',index)
  if (index !== -1) {
    vehicles.splice(index, 1); // Remove the scenario at the found index
    writeJsonFile(vehiclesFilePath, vehicles);
    res.status(204).send(); // Send a success response with no content
  } else {
    res.status(404).json({ message: 'Scenario not found' });
  }

  
});



// Route to delete all scenarios
app.delete('/scenarios', (req, res) => {
  // Path to the scenarios JSON file
  const scenariosFilePath = './data/scenarios.json';
  
  console.log('the is delete scenarios')


  // Clear the content of the scenarios file by overwriting it with an empty array
  writeJsonFile(scenariosFilePath, []);

  res.sendStatus(204); // Send success response
});

// Route to delete all vehicles
app.delete('/vehicles', (req, res) => {
  // Path to the vehicles JSON file
  const vehiclesFilePath = './data/vehicles.json';
  console.log('the is delete Vehic;e')

  // Clear the content of the vehicles file by overwriting it with an empty array
  writeJsonFile(vehiclesFilePath, []);

  res.sendStatus(204); // Send success response
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
