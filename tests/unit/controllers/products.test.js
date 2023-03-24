const chai = require("chai");
const sinon = require("sinon");
const dataMock = require("../../Mocks/DataMock");

chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));

const { expect } = chai;

const ProductsController = require("../../../src/controllers/products.controllers");
const ProductsService = require("../../../src/services/products.services");

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
      sinon.stub(ProductsService, "getProductById").resolves({ type: null, message: productMock });

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await ProductsController.getProductById(request, response);

      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(productMock);
    });
    it("retorna um erro quando não há um produto com este id", async () => {
      const request = { params: { id: 777 } };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductsService, "getProductById")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await ProductsController.getProductById(request, response);

      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("testa se postProduct", () => {
    it("retorna um produto com o status correto", async () => {
      const request = { body: dataMock.rightProductBody };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductsService, "postProduct")
        .resolves({ type: null, id: 4, message: dataMock.rightProductBody });

      await ProductsController.postProduct(request, response);

      expect(response.status).to.have.been.calledWith(201);
      expect(response.json).to.have.been.calledWith({
        id: 4,
        name: dataMock.rightProductBody,
      });
    });
    it("retorna um erro quando o nome do produto não é informado", async () => {
      const request = { body: dataMock.wrongProductBody };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductsService, "postProduct")
        .resolves({
          type: "NAME_IS_REQUIRED",
          message: "'name' is required",
        });

      await ProductsController.postProduct(request, response);

      expect(response.status).to.have.been.calledWith(400);
      expect(response.json).to.have.been.calledWith({
        message: "'name' is required",
      });
    });
  });

  describe("testa se searchProductsByName", () => {
    it("retorna um produto com o status correto", async () => {
      const [productMock] = productsMock;
      const request = { query: { q: "Thor" } };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, "searchProductsByName").resolves({ message: productMock });

      await ProductsController.searchProductsByName(request, response);

      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(productMock);
    });
  });

  describe("testa se updateProduct", () => {
    it("retorna um produto com o status correto", async () => {
      const request = { params: { id: 1 }, body: dataMock.productUpdateBody };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductsService, "updateProduct")
        .resolves({ type: null, message: dataMock.productUpdateBody.name });
      
      await ProductsController.updateProduct(request, response);

      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith({
        id: 1,
        name: dataMock.productUpdateBody.name,
      });
    });

    it("retorna um erro quando não há um produto com este id", async () => {
      const request = { params: { id: 777 }, body: dataMock.productUpdateBody };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductsService, "updateProduct")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });
      
      await ProductsController.updateProduct(request, response);

      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });      
  });

  describe("testa se deleteProduct", () => {
    it("deleta um produto com o status correto", async () => {
      const request = { params: { id: 1 } };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();

      sinon.stub(ProductsService, "deleteProduct").resolves({ type: null, message: null });

      await ProductsController.deleteProduct(request, response);

      expect(response.status).to.have.been.calledWith(204);
      expect(response.end).to.have.been.calledOnce;
    });

    it("retorna um erro quando não há um produto com este id", async () => {
      const request = { params: { id: 777 } };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      response.end = sinon.stub().returns();

      sinon
        .stub(ProductsService, "deleteProduct")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });
      
      await ProductsController.deleteProduct(request, response);

      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });


  afterEach(() => {
    sinon.restore();
  });
});
