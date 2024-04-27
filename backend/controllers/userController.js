const z = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const { Account } = require('../models/accountModel');
const signupSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
});
const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});
const updateDetailsSchema = z.object({
  password: z.string().min(8).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
const saltRounds = parseInt(process.env.SALTROUNDS);
const jwtSecret = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const inputData = req.body;
  try {
    const zodResponse = signupSchema.safeParse(inputData);
    const dataResponse = zodResponse.data;
    if (!zodResponse.success) {
      res.status(401).json({ error: zodResponse.error });
      return;
    }
    const userExists = await User.findOne({ username: dataResponse.username });
    if (userExists) {
      res.status(400).json({ error: 'User already exists with this username' });
      return;
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dataResponse.password, salt);
    const newUser = new User({
      username: dataResponse.username,
      firstName: dataResponse.firstName,
      lastName: dataResponse.lastName,
      password: hashedPassword,
    });
    await newUser.save();
    const newAccount = new Account({
      userId: newUser._id,
      balance: 1000,
    });
    await newAccount.save();
    // console.log('user id is: ', newUser._id);
    const token = jwt.sign({ userId: newUser._id }, jwtSecret);
    const { password, ...messageWithoutPassword } = newUser.toObject();
    res.status(201).json({ message: messageWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

const signin = async (req, res) => {
  const inputData = req.body;
  try {
    const zodResponse = signinSchema.safeParse(inputData);
    if (!zodResponse.success) {
      res.status(401).json({ error: zodResponse.error });
      return;
    }
    const dataResponse = zodResponse.data;
    const userExists = await User.findOne({ username: dataResponse.username });
    if (!userExists) {
      return res.status(404).json({ error: 'Invalid username' });
    }

    const isPasswordMatch = await bcrypt.compare(
      dataResponse.password,
      userExists.password
    );
    if (!isPasswordMatch) {
      return res.status(404).json({ error: 'Wrong password' });
    }
    const token = jwt.sign({ userId: userExists._id }, jwtSecret);
    res
      .status(200)
      .json({
        message: 'User signed in successfully',
        token,
        firstName: userExists.firstName,
      });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

const updateDetails = async (req, res) => {
  const inputData = req.body;
  try {
    const zodResponse = updateDetailsSchema.safeParse(inputData);
    const dataResponse = zodResponse.data;
    if (!zodResponse.success) {
      res.status(401).json({ error: zodResponse.error });
      return;
    }
    const updateObject = {};
    if (dataResponse.password) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(dataResponse.password, salt);
      updateObject.password = hashedPassword;
    }
    if (dataResponse.firstName) {
      updateObject.firstName = dataResponse.firstName;
    }
    if (dataResponse.lastName) {
      updateObject.lastName = dataResponse.lastName;
    }
    await User.updateOne({ _id: req.userId }, updateObject);
    res.status(201).json({
      message: 'Details updated successfully',
      updatedDetails: updateObject,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

const filterUsers = async (req, res) => {
  const filter = req.query.filter || '';
  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
            $options: 'i',
          },
        },
        {
          lastName: {
            $regex: filter,
            $options: 'i',
          },
        },
      ],
    });
    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

const getUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const { password, ...messageWithoutPassword } = user.toObject();
    res.status(200).json(messageWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};
module.exports = { signup, updateDetails, filterUsers, signin, getUser };
