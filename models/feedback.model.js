import User from './user.mongo.js';
import UserFeedback from './feedback.mongo.js';

// Function to post feedback
export async function postUserFeedback(req, res) {
  const { feedbackText, targetUserId } = req.body;
  console.log(feedbackText+ " "+ targetUserId);
  const authorId = "6717b80b5f6d74812f8ab33c"; // Assuming user is authenticated and their ID is available

  try {
    // Ensure the target user exists
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }

    // Create and save the feedback
    const feedback = new UserFeedback({
      feedbackText,
      author: authorId,
      targetUser: targetUserId,
    });

    await feedback.save();

    return res.status(201).json({
      message: 'Feedback posted successfully',
      feedback,
    });

  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
}

// Function to get feedback for a specific user
export async function getUserFeedback(req, res) {
  const targetUserId = req.params.userId;

  try {
    // Find feedback for the target user, populate the author details
    const feedbacks = await UserFeedback.find({ targetUser: targetUserId })
      .populate('author', 'name email') // Populate the author's details (name, email)
      .exec();

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this user' });
    }

    return res.status(200).json({ feedbacks });

  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
}


//dummy 

export async function createDummyUsers() {
  const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123', // Make sure to hash this password in a real app
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
    },
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: 'password123',
    },
    {
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      password: 'password123',
    },
    {
      name: 'Charlie Green',
      email: 'charlie.green@example.com',
      password: 'password123',
    }
  ];

  try {
    const result = await User.insertMany(users);
    console.log('Dummy users created:', result);
  } catch (error) {
    console.error('Error creating dummy users:', error);
  }
}

// Call the function to create users (optional if you want to call it from a specific route/controller)


export async function createDummyFeedback() {
  try {
    // Fetch some users from the User collection
    const users = await User.find().limit(5); // Assuming we have at least 5 users

    if (users.length < 2) {
      console.error('Not enough users to create feedback');
      return;
    }

    // Create dummy feedback for users
    const feedbacks = [
      {
        feedbackText: 'John is a great collaborator and very helpful!',
        author: users[0]._id,    // John posts feedback
        targetUser: users[1]._id // Feedback for Jane
      },
      {
        feedbackText: 'Jane always delivers her work on time.',
        author: users[1]._id,    // Jane posts feedback
        targetUser: users[0]._id // Feedback for John
      },
      {
        feedbackText: 'Alice is very creative in solving problems!',
        author: users[2]._id,    // Alice posts feedback
        targetUser: users[3]._id // Feedback for Bob
      },
      {
        feedbackText: 'Bob is quick and efficient with his tasks.',
        author: users[3]._id,    // Bob posts feedback
        targetUser: users[2]._id // Feedback for Alice
      },
      {
        feedbackText: 'Charlie is always eager to learn new things.',
        author: users[4]._id,    // Charlie posts feedback
        targetUser: users[1]._id // Feedback for Jane
      },
    ];

    // Insert feedback into the UserFeedback collection
    const result = await UserFeedback.insertMany(feedbacks);
    console.log('Dummy feedback created:', result);

  } catch (error) {
    console.error('Error creating dummy feedback:', error);
  }
}

// Call the function to create dummy feedback (optional, if you want to call it from a route or controller)
