let requests = [
  {
    hospital: "City Hospital",
    bloodgroup: "A+",
    city: "New York",
    status: "open",
    date: "2024-06-01",
    id: 1,
    donors: [
      { name: "John Doe", phone: "123-456-7890", bloodgroup: "A+",city:"New York" },
      { name: "Jane Smith", phone: "987-654-3210", bloodgroup: "A+",city:"New York" },
    ]
  }
]; // temporary storage

// create request (hospital)
export const createRequest = (req, res) => {
  const newRequest = {
    id: Date.now(),
    ...req.body,
    donors: [],
  };

  requests.push(newRequest);

  res.json({
    message: "Request created",
    request: newRequest,
  });
};

// get all requests (donor dashboard)
export const getRequests = (req, res) => {
  res.json(requests);
};

// donor clicks "Donate"
export const donateToRequest = (req, res) => {
  const requestId = parseInt(req.params.id);
  const { donor } = req.body;

  const request = requests.find(r => r.id === requestId);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }
  //if donor already exists 
  const alreadyExists = request.donors.find(
    d => d.phone === donor.phone
  );
  if (alreadyExists) {
    return res.json({
      message: "You already donated for this request",
    });
  }
  request.donors.push(donor);

  res.json({
    message: "Donor added successfully",
    request,
  });
};