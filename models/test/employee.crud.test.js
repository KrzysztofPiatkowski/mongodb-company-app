const mongoose = require('mongoose');
const expect = require('chai').expect;
const Employee = require('../employee.model.js');
const Department = require('../department.model');

describe('Employee', function () {
  this.timeout(10000);

  before(async () => {
    
  });

  after(async () => {
  
  });

  describe('Reading data', () => {
    let dep;

    before(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();

      dep = new Department({ name: 'HRDVK' });
      await dep.save();

      const emp1 = new Employee({ firstName: 'John', lastName: 'Doe', department: dep._id });
      const emp2 = new Employee({ firstName: 'Jane', lastName: 'Smith', department: dep._id });

      await emp1.save();
      await emp2.save();
    });

    it('should return all the data with find method', async () => {
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(2);
    });

    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe' });
      expect(employee).to.not.be.null;
      expect(employee.firstName).to.be.equal('John');
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });

  describe('Creating data', () => {
    let dep;

    before(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();

      dep = new Department({ name: 'Sales' });
      await dep.save();
    });

    it('should insert new document with insertOne method', async () => {
      const emp = new Employee({ firstName: 'Alice', lastName: 'Johnson', department: dep._id });
      await emp.save();
      expect(emp.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });

  describe('Updating data', () => {
    let dep;

    beforeEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();

      dep = new Department({ name: 'DevOps' });
      await dep.save();

      await new Employee({ firstName: 'Mark', lastName: 'Twain', department: dep._id }).save();
      await new Employee({ firstName: 'Lucy', lastName: 'Gray', department: dep._id }).save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne({ firstName: 'Mark' }, { $set: { firstName: 'Marcus' } });
      const updated = await Employee.findOne({ firstName: 'Marcus' });
      expect(updated).to.not.be.null;
    });

    it('should properly update one document with save method', async () => {
      const emp = await Employee.findOne({ firstName: 'Mark' });
      emp.firstName = 'Marcus';
      await emp.save();

      const updated = await Employee.findOne({ firstName: 'Marcus' });
      expect(updated).to.not.be.null;
    });

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { $set: { lastName: 'Updated' } });
      const updated = await Employee.find({ lastName: 'Updated' });
      expect(updated.length).to.equal(2);
    });
  });

  describe('Removing data', () => {
    let dep;

    beforeEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();

      dep = new Department({ name: 'Support' });
      await dep.save();

      await new Employee({ firstName: 'Anna', lastName: 'Nowak', department: dep._id }).save();
      await new Employee({ firstName: 'Ola', lastName: 'Kowalska', department: dep._id }).save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });

    it('should properly remove one document with deleteOne method', async () => {
      await Employee.deleteOne({ firstName: 'Anna' });
      const removed = await Employee.findOne({ firstName: 'Anna' });
      expect(removed).to.be.null;
    });

    it('should properly remove multiple documents with deleteMany method', async () => {
      await Employee.deleteMany();
      const remaining = await Employee.find();
      expect(remaining.length).to.equal(0);
    });
  });
});
