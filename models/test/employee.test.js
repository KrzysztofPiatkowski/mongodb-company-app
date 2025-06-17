const mongoose = require('mongoose');
const Employee = require('../employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw an error if no "firstname" arg', () => {
    const emp = new Employee({ lastName: 'Doe', department: new mongoose.Types.ObjectId() });
    const err = emp.validateSync();

    expect(err.errors.firstName).to.exist;
  });

  it('should throw an error if no "lastname" arg', () => {
    const emp = new Employee({ firstName: 'John', department: new mongoose.Types.ObjectId() });
    const err = emp.validateSync();

    expect(err.errors.lastName).to.exist;
  });

  it('should throw an error if no "department" arg', () => {
    const emp = new Employee({ firstName: 'John', lastName: 'Doe' });
    const err = emp.validateSync();

    expect(err.errors.department).to.exist;
  });

  it('should not throw an error if all required fields are provided correctly', () => {
    const emp = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      department: new mongoose.Types.ObjectId()
    });
    const err = emp.validateSync();
    expect(err).to.not.exist;
  });

  after(() => {
    mongoose.models = {};
  });
});
