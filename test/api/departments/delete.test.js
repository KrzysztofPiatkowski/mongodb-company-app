const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request(app);

describe('DELETE /api/departments/:id', () => {

  before(async () => {
    const testDep = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department to delete' });
    await testDep.save();
  });

  after(async () => {
    await Department.deleteMany();
  });

  it('should remove one department and return success', async () => {
    const res = await request.delete('/api/departments/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');

    const deletedDep = await Department.findById('5d9f1140f10a81216cfd4408');
    expect(deletedDep).to.be.null;
  });

});
