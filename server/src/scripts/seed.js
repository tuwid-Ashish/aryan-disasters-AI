import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { User } from '../modules/users/user.model.js';
import { Disaster } from '../modules/disasters/disaster.model.js';
import { Request } from '../modules/requests/request.model.js';
import { Resource } from '../modules/resources/resource.model.js';

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/disaster-ai";

async function seed() {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(URI);
    
    console.log("Clearing DB Collections...");
    await User.deleteMany();
    await Disaster.deleteMany();
    await Request.deleteMany();
    await Resource.deleteMany();

    console.log("Hashing default password...");
    const hash = await bcrypt.hash('password123', 10);

    console.log("Creating Users (Admin, Donor, Beneficiary, Volunteer)...");
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: hash,
      role: "admin",
      isVerified: true,
      location: { city: "New Delhi", state: "Delhi" }
    });

    const donor = await User.create({
      name: "Generous Donor",
      email: "donor@example.com",
      passwordHash: hash,
      role: "donor",
      isVerified: true,
      location: { city: "Mumbai", state: "Maharashtra" }
    });

    const beneficiary1 = await User.create({
      name: "John Doe (Victim)",
      email: "beneficiary1@example.com",
      passwordHash: hash,
      role: "beneficiary",
      isVerified: true,
      location: { city: "Chennai", state: "Tamil Nadu", address: "123 Flood St" }
    });

    const beneficiary2 = await User.create({
      name: "Jane Smith (Victim)",
      email: "beneficiary2@example.com",
      passwordHash: hash,
      role: "beneficiary",
      isVerified: true,
      location: { city: "Shimla", state: "Himachal Pradesh", address: "45 Mountain Rd" }
    });

    const volunteer = await User.create({
      name: "Active Volunteer",
      email: "volunteer@example.com",
      passwordHash: hash,
      role: "volunteer",
      isVerified: true,
      location: { city: "Chennai", state: "Tamil Nadu" }
    });

    console.log("Creating 2 Disaster Cases...");
    
    const disaster1 = await Disaster.create({
      title: "Chennai Urban Flooding",
      type: "Flood",
      description: "Severe urban flooding affecting major parts of the city. Urgent need for rescue and supplies.",
      region: "Chennai, Tamil Nadu",
      severity: "critical",
      status: "active",
      createdBy: admin._id
    });

    const disaster2 = await Disaster.create({
      title: "Himachal Landslides",
      type: "Landslide",
      description: "Heavy rains caused massive landslides cutting off several remote villages.",
      region: "Shimla, Himachal Pradesh",
      severity: "high",
      status: "active",
      createdBy: admin._id
    });

    console.log("Creating Requests and Resources...");

    await Request.create({
      disasterId: disaster1._id,
      beneficiaryId: beneficiary1._id,
      category: "food",
      quantityNeeded: 50,
      urgency: "high",
      status: "pending",
      description: "Need food packets for stranded families."
    });

    await Request.create({
      disasterId: disaster2._id,
      beneficiaryId: beneficiary2._id,
      category: "medicine",
      quantityNeeded: 20,
      urgency: "critical",
      status: "pending",
      description: "First aid kits and emergency medicines required."
    });

    await Resource.create({
      disasterId: disaster1._id,
      donorId: donor._id,
      category: "food",
      quantityAvailable: 100,
      unit: "meals",
      status: "available",
      description: "Ready-to-eat meals."
    });

    await Resource.create({
      disasterId: disaster2._id,
      donorId: donor._id,
      category: "medicine",
      quantityAvailable: 50,
      unit: "kits",
      status: "available",
      description: "Assorted medical supplies."
    });

    console.log("Seed complete! You can log in with any email (e.g. admin@example.com) and password: password123");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seed();