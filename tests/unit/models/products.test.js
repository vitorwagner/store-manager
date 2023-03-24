const chai = require('chai');
const sinon = require('sinon');
const connection = require("../../../src/db/connection");

const { expect } = chai;

const ProductsModel = require('../../../src/models/products.model');

const productsMock = [[
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
]];

describe('testa a camada Model para Products', () => {
  describe('testa se getAllProducts', () => {
    it('retorna todos produtos', async () => {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const products = await ProductsModel.getAllProducts();

      expect(products).to.be.deep.equal(productsMock);
    });
  
    
  });
  describe('testa se getProductById', () => {
    it('retorna um produto pelo id', async () => {
      const [productMock] = productsMock;
      sinon.stub(connection, 'execute').resolves([productMock]);

      const product = await ProductsModel.getProductById(1);

      expect(product).to.be.deep.equal(productMock[0]);
    });
  });

  describe('testa se postProduct', () => {
    it('retorna um id de produto', async () => {
      const [productMock] = productsMock;

      sinon.stub(connection, 'execute').resolves([{ insertId: 1}]);

      const insertId = await ProductsModel.postProduct(productMock[0].name);

      expect(insertId).to.be.deep.equal(1);
    });
  });

  describe('testa se searchProductsByName', () => {
    it('retorna um produto pelo nome', async () => {
      const [productMock] = productsMock;

      sinon.stub(connection, 'execute').resolves([productMock]);

      const product = await ProductsModel.searchProductsByName(productMock[0].name);

      expect(product).to.be.deep.equal(productMock);
    });
  });

  describe('testa se updateProduct', () => {
    it('retorna um produto atualizado', async () => {
      const [productMock] = productsMock;

      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      
      const affectedRows = await ProductsModel.updateProduct(productMock[0].id, productMock[0].name);

      expect(affectedRows).to.be.deep.equal(1);
    });
  });

  describe('testa se deleteProduct', () => {
    it('retorna um produto deletado', async () => {
      const [productMock] = productsMock;

      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const affectedRows = await ProductsModel.deleteProduct(productMock[0].id);

      expect(affectedRows).to.be.deep.equal(1);
    });
  });


  afterEach(() => {
    sinon.restore();
  }
  );
});

