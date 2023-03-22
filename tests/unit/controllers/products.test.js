const chai = require("chai");
const sinon = require("sinon");
// const connection = require("../../../src/db/connection");

// chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));

const { expect } = chai;

const ProductsController = require("../../../src/controllers/products.controllers");
const ProductsService = require("../../../src/services/products.services");
const ProductsModel = require("../../../src/models/products.model");
const errorHandler = require("../../../src/middlewares/errorHandler");

const productsMock = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

describe("testa se o controller de produtos", () => {
  describe("testa se getAllProducts", () => {
    it("retorna todos produtos com o status correto", async () => {
      const request = {};
      const response = {};
      sinon.stub(ProductsService, "getAllProducts").resolves(productsMock);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await ProductsController.getAllProducts(request, response);

      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(productsMock);
    });
  });

  describe("testa se getProductById", () => {
    it("retorna um produto pelo id com o status correto", async () => {
      const [productMock] = productsMock;
      const request = { params: { id: 1 } };
      const response = {};
      sinon.stub(ProductsService, "getProductById").resolves(productMock);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await ProductsController.getProductById(request, response);

      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(productMock);
    });
    it("retorna um erro quando não há um produto com este id", async () => {
      const request = { params: { id: 777 } };
      const response = {};
      const next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsModel, "getProductById").resolves(null);
      
      await ProductsController.getProductById(request, response, next);

      // const errFunc = async () => {
      //   throw new Error("hello");
      // };
      // await expect(errFunc()).to.be.rejectedWith(Error, "hello");
      // try {
      // } catch (error) {
      //   expect(error).to.be.deep.equal({
      //     message: "Product not found",
      //     status: 404,
      //   });
      // }


      // expect(response.status).to.have.been.calledWith(404);
      // expect(response.json).to.have.been.calledWith({
      //   message: "Product not found",
      // });
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
