// scripts/seedItems.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('../models/Item');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  seedItems();
}).catch(err => {
  console.error('❌ DB connection error:', err);
});

async function seedItems() {
  try {
    await Item.deleteMany(); // optional: clear old items

    const sampleItems = [
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Blue Denim Jacket',
        description: 'Perfect for winter',
        category: 'Winter',
        size: 'M',
        condition: 'Like New',
        imageUrl: 'uploads/jacket.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'White Cotton Kurta',
        description: 'Traditional and stylish',
        category: 'Traditional',
        size: 'L',
        condition: 'Used',
        imageUrl: 'uploads/kurta.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Black Formal Blazer',
        description: 'Ideal for office meetings',
        category: 'Formal',
        size: 'XL',
        condition: 'New',
        imageUrl: 'uploads/blazer.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Red Sports Jersey',
        description: 'Lightweight and comfortable',
        category: 'Sportswear',
        size: 'M',
        condition: 'Like New',
        imageUrl: 'uploads/jersey.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Grey Sweatpants',
        description: 'Casual wear',
        category: 'Bottomwear',
        size: 'L',
        condition: 'Used',
        imageUrl: 'uploads/sweatpants.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Yellow Summer Dress',
        description: 'Light and breezy',
        category: 'Summer',
        size: 'S',
        condition: 'New',
        imageUrl: 'uploads/dress.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Blue Office Shirt',
        description: 'Cotton shirt for work',
        category: 'Workwear',
        size: 'M',
        condition: 'Used',
        imageUrl: 'uploads/office-shirt.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Black Leggings',
        description: 'Stretchable and comfy',
        category: 'Casual',
        size: 'L',
        condition: 'Like New',
        imageUrl: 'uploads/leggings.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Green Hoodie',
        description: 'Warm and soft',
        category: 'Winter',
        size: 'XL',
        condition: 'New',
        imageUrl: 'uploads/hoodie.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Orange Polo T-shirt',
        description: 'Casual wear',
        category: 'Casual',
        size: 'M',
        condition: 'Used',
        imageUrl: 'uploads/polo.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Striped Work Pants',
        description: 'Formal look',
        category: 'Workwear',
        size: 'L',
        condition: 'Like New',
        imageUrl: 'uploads/workpants.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Pink Salwar Suit',
        description: 'Traditional dress',
        category: 'Traditional',
        size: 'XXL',
        condition: 'Used',
        imageUrl: 'uploads/suit.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Grey Shorts',
        description: 'Summer casual',
        category: 'Summer',
        size: 'M',
        condition: 'Like New',
        imageUrl: 'uploads/shorts.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Running Track Pants',
        description: 'Best for running/jogging',
        category: 'Sportswear',
        size: 'L',
        condition: 'New',
        imageUrl: 'uploads/track.jpg',
        isAvailable: true
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Full Sleeve Checked Shirt',
        description: 'Cotton checkered shirt',
        category: 'Formal',
        size: 'M',
        condition: 'Used',
        imageUrl: 'uploads/checked.jpg',
        isAvailable: true
      },
    ];

    await Item.insertMany(sampleItems);
    console.log('✅ 15 dummy clothes inserted successfully.');
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting items:', err);
    process.exit(1);
  }
}
