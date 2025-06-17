const mongoose = require('mongoose');
const expect = require('chai').expect;
const Department = require('../department.model.js');

describe('Department', function () {
  this.timeout(10000); // UWAGA: działa tylko w function(), nie w arrow function

  before(async () => {
    try {
      console.log('🔌 Connecting to MongoDB...');
      await mongoose.connect('mongodb://127.0.0.1:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Connected to MongoDB!');
    } catch (err) {
      console.error('❌ Connection error:', err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      console.log('🧪 Adding test departments...');
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const departments = await Department.find();
      expect(departments.length).to.be.equal(2);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const department = await Department.findOne({ name: 'Department #1' });
      expect(department.name).to.be.equal('Department #1');
    });

    after(async () => {
      console.log('🧹 Cleaning up test data...');
      await Department.deleteMany();
    });
  });

  after(async () => {
    console.log('🔌 Disconnecting from MongoDB...');
    await mongoose.disconnect();
  });
});
