// utils/response.js

/**
 * Helper para padronizar respostas em JSON
 * @param {object} res - response do Express
 * @param {number} status - status HTTP
 * @param {boolean} success - indica se a requisição foi bem sucedida
 * @param {string} message - mensagem de retorno
 * @param {object|null} data - dados de retorno
 * @param {string|object|null} errors - detalhes do erro (se houver)
 */
const sendResponse = (res, status, success, message, data = null, errors = null) => {
  return res.status(status).json({
    success,
    message,
    data,
    errors,
  });
};

module.exports = sendResponse;
