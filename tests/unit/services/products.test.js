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

    it("retorna um erro quando o produto não existe", async () => {
      sinon.stub(ProductsModel, "getProductById").resolves(null);

      const product = await ProductsService.getProductById(1);

      expect(product.message).to.be.deep.equal("Product not found");
    });
  });

  describe("testa se postProduct", () => {
    it("retorna um produto com o id e o nome", async () => {
      const [productMock] = productsMock;

      sinon.stub(ProductsModel, "postProduct").resolves(productMock.id);

      const product = await ProductsService.postProduct(productMock.name);

      expect(product).to.be.deep.equal({
        id: productMock.id,
        message: productMock.name,
      });
    });

    it("retorna um erro quando o nome do produto não é válido", async () => {
      const product = await ProductsService.postProduct("");

      expect(product).to.be.deep.equal({
        type: "NAME_IS_REQUIRED",
        message: '"name" is required',
      });
    });
  });

  describe("testa se searchProductsByName", () => {
    it("retorna um produto pelo nome", async () => {
      const [productMock] = productsMock;

      sinon.stub(ProductsModel, "searchProductsByName").resolves(productMock);

      const product = await ProductsService.searchProductsByName(
        productMock.name
      );

      expect(product.message).to.be.deep.equal(productMock);
    });
  });

  describe("testa se updateProduct", () => {
    it("retorna um produto com o id e o nome", async () => {
      const [productMock] = productsMock;

      sinon.stub(ProductsModel, "updateProduct").resolves(1);

      const product = await ProductsService.updateProduct(
        productMock.id,
        productMock.name
      );

      expect(product).to.be.deep.equal({
        type: null,
        message: productMock.name,
      });
    });

    it("retorna um erro quando o nome do produto não é válido", async () => {
      const product = await ProductsService.updateProduct(1, "");

      expect(product).to.be.deep.equal({
        type: "NAME_IS_REQUIRED",
        message: '"name" is required',
      });
    });

    it("retorna um erro quando o produto não existe", async () => {
      sinon.stub(ProductsModel, "updateProduct").resolves(0);

      const product = await ProductsService.updateProduct(1, "teste");

      expect(product).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Product not found",
      });
    });
  });

  describe("testa se deleteProduct", () => {
    it("deleta corretamente um produto", async () => {
      sinon.stub(ProductsModel, "deleteProduct").resolves(1);

      const product = await ProductsService.deleteProduct(1);

      expect(product).to.be.deep.equal({
        type: null,
        message: null,
      });
    });

    it("retorna um erro quando o produto não existe", async () => {
      sinon.stub(ProductsModel, "deleteProduct").resolves(0);

      const product = await ProductsService.deleteProduct(777);

      expect(product).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Product not found",
      });
    });

    it("retorna um erro quando o id do produto não é válido", async () => {
      const product = await ProductsService.deleteProduct("teste");

      expect(product).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"id" must be a number',
      });
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
