import chai from 'chai'
import bluebird from 'bluebird'
import promised from 'chai-as-promised'
const { expect } = chai.use(promised)

describe('warning when promise throws', () => {
  const dummyErrorMessage = 'dummy error message'

  async function rejects (p) {
    await p.reject(new Error(dummyErrorMessage))
  }

  describe('rejects', () => {
    it('with vanilla promise', async () => {
      await expect(rejects(Promise))
        .to.be.rejectedWith(Error, dummyErrorMessage)
    })

    it('with bluebird promise', async () => {
      await expect(rejects(bluebird))
        .to.be.rejectedWith(Error, dummyErrorMessage)
    })
  })

  async function throws (p) {
    await p.resolve().then(() => {
      throw new Error(dummyErrorMessage)
    })
  }

  describe('throws', () => {
    it('with vanilla promise', async () => {
      await expect(throws(Promise))
        .to.be.rejectedWith(Error, dummyErrorMessage)
    })

    it('with bluebird promise', async () => {
      await expect(throws(bluebird))
        .to.be.rejectedWith(Error, dummyErrorMessage)
    })
  })
})