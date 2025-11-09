// helpers.js

/**
 * Fonction pour formater un objet d'informations.
 * @param {Object} info - L'objet d'informations à formater.
 * @returns {string} - Une chaîne formatée des informations.
 */
export function formatInfo(info) {
    return Object.entries(info)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
}

/**
 * Fonction pour vérifier si une valeur est définie.
 * @param {*} value - La valeur à vérifier.
 * @returns {boolean} - True si la valeur est définie, sinon false.
 */
export function isDefined(value) {
    return value !== undefined && value !== null;
}

/**
 * Fonction pour générer un identifiant unique.
 * @returns {string} - Un identifiant unique.
 */
export function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}