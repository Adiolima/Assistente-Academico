/**
 * Configuração do Metro bundler com correção para Windows.
 * O caractere ':' em caminhos como 'node:sea' é inválido no Windows,
 * então redirecionamos módulos 'node:*' para um stub vazio.
 */
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Corrige erro ENOENT ao criar diretórios com ':' no Windows (ex: node:sea)
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith("node:")) {
    return { type: "empty" };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
