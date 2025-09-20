// src/pages/Produto/Produto.jsx
import { useState, useEffect } from "react";
import { getProducts } from "../../services/Produto";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Produto.style.scss";

function Produto() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar produtos. Verifique sua conexão.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="products-content">
        <div className="content-wrapper">
          <div className="products-header">
            <h1>Produtos</h1>
            <button className="btn-primary" onClick={loadProducts}>
              Atualizar
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading">Carregando produtos...</div>
          ) : (
            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Validade</th>
                    <th>Marca</th>
                    <th>Categoria</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{formatCurrency(product.price)}</td>
                        <td>{formatDate(product.expiryDate)}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-products">
                        Nenhum produto encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Produto;