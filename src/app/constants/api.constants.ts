/**
 * The API endpoint for the Banco Pichincha API.
 */
const API_ENDPOINT: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net';

/**
 * The API resource for the Banco Pichincha API's "Productos Financieros".
 */
const API_RESOURCE: string = 'ipf-msa-productosfinancieros';

/**
 * The URL for the API.
 */
const API_URL: string = `${API_ENDPOINT}/${API_RESOURCE}`;

/**
 * The route for the products endpoint.
 */
export const PRODUCTS_ROUTE: string = `${API_URL}/bp/products`;

/**
 * The route for the target product endpoint.
 *
 * @param {string} id The ID of the product to target.
 * @returns {string} The URL for the target product endpoint.
 */
export const PRODUCT_ROUTE = (id: string): string => `${PRODUCTS_ROUTE}?id=${id}`;

/**
 * The route for the target product ID verification endpoint.
 *
 * @param {string} id The ID of the product to verify.
 * @returns {string} The URL for the target product ID verification endpoint.
 */
export const PRODUCT_ID_VERIFY_ROUTE = (id: string): string => `${PRODUCTS_ROUTE}/verification?id=${id}`;
