const chai = require("chai");
const sinon = require("sinon");

const { expect } = chai;

const ProductsService = require("../../../src/services/products.services");
const ProductsModel = require("../../../src/models/products.model");

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

describe("testa se o service de produtos", () => {
  describe("testa se getAllProducts", () => {
    it("retorna todos produtos", async () => {
      sinon.stub(ProductsModel, "getAllProducts").resolves(productsMock);

      const products = await ProductsService.getAllProducts();

      expect(products).to.be.deep.equal(productsMock);
    });
  });

  describe("testa se getProductById", () => {
    it("retorna um produto pelo id", async () => {
      const [productMock] = productsMock;

      sinon.stub(ProductsModel, "getProductById").resolves(productMock);

      const product = await ProductsService.getProductById(1);

      expect(product.message).to.be.deep.equal(productMock);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});