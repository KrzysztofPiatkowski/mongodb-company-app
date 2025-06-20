const mongoose = require('mongoose');
const expect = require('chai').expect;
const Department = require('../department.model.js');

describe('Department', function () {
  this.timeout(10000);

  describe('Reading data', () => {
    before(async () => {
      console.log('🧪 Adding test departments...');
      await Department.deleteMany();
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

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const department = new Department({ name: 'Department #1' });
      await department.save();
      const savedDepartment = await Department.findOne({ name: 'Department #1' });
      expect(savedDepartment).to.not.be.null;
    });

    });

    describe('Updating data', () => {

      beforeEach(async () => {
        const testDepOne = new Department({ name: 'Department #1' });
        await testDepOne.save();

        const testDepTwo = new Department({ name: 'Department #2' });
        await testDepTwo.save();
      });

      afterEach(async () => {
        await Department.deleteMany();
      });

      it('should properly update one document with "updateOne" method', async () => {
        await Department.updateOne({ name: 'Department #1' }, { $set: { name: '=Department #1=' }});
        const updatedDepartment = await Department.findOne({ name: '=Department #1=' });
        expect(updatedDepartment).to.not.be.null;
      });

      it('should properly update one document with "save" method', async () => {
        const department = await Department.findOne({ name: 'Department #1' });
        department.name = '=Department #1=';
        await department.save();

        const updatedDepartment = await Department.findOne({ name: '=Department #1=' });
        expect(updatedDepartment).to.not.be.null;
      });

      it('should properly update multiple documents with "updateMany" method', async () => {
        await Department.updateMany({}, { $set: { name: 'Updated!' }});
        const departments = await Department.find();
        expect(departments[0].name).to.be.equal('Updated!');
        expect(departments[1].name).to.be.equal('Updated!');
      });

    });

    describe('Removing data', () => {

      beforeEach(async () => {
        const testDepOne = new Department({ name: 'Department #1' });
        await testDepOne.save();

        const testDepTwo = new Department({ name: 'Department #2' });
        await testDepTwo.save();
      });

      afterEach(async () => {
        await Department.deleteMany();
      });

      it('should properly remove one document with "deleteOne" method', async () => {
        await Department.deleteOne({ name: 'Department #1' });
        const removeDepartment = await Department.findOne({ name: 'Department #1' });
        expect(removeDepartment).to.be.null;
      });

      it('should properly remove multiple documents with "deleteMany" method', async () => {
        await Department.deleteMany();
        const departments = await Department.find();
        expect(departments.length).to.be.equal(0);
      });

    });

  after(async () => {
  
  });
});
