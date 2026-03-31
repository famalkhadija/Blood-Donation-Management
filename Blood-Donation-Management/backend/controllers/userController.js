import jwt from "jsonwebtoken";
let users = [
  {
    role: "donor",
    profile: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      bloodgroup: "A+",
      city: "New York",
      password: "password123", 
    }
  },
  {
    role: "hospital",
    profile: {
      name: "City Hospital",
      email: "city.hospital@example.com",
      phone: "987-654-3210",
      city: "New York",
      licenseNumber: "HOSP12345",
      password: "password123", 
    }
  }
]; // temporary storage

export const registerUser = async (req, res) => {
  const { role, profile } = req.body;
// const hashedPassword = await bcrypt.hash(profile.password, 10);
  const newUser = {
    id: Date.now(),
    role,
    profile,
  };

  users.push(newUser);

  res.json({
    message: "User registered",
    user: newUser,
  });
};

export const loginUser = async(req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.profile.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if(password !== user.profile.password){
    return res.status(400).json({ message: "Wrong Password" });
  }
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({
    user,
    token,
  });
};
export const updateProfile = (req, res) => {
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // update profile
  user.profile = {
    ...user.profile,
    ...req.body,
  };

  res.json({
    message: "Profile updated",
    user,
  });
};
// /me
export const getMe = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({user});
};