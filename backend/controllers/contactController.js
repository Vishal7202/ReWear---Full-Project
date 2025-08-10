exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }

    // 🛠️ You can save to database here if needed

    // Just send a success response for now
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: { name, email, message }
    });
  } catch (error) {
    console.error('Error in contact form:', error.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
