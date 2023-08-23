import { IBaseEntity } from "./core.models";

/**
 * @interface IApiProduct
 * @description The interface for Banco Pichincha's API products entities.
 * @extends IBaseEntity
 * @property {string} name The name of the product.
 * @property {string} description The description of the product.
 * @property {string} logo The URL of the product logo.
 * @property {string} date_release The date the product was released.
 * @property {string} date_revision The date the product was revised.
 */
export interface IProduct extends IBaseEntity {
  name: string;
  description: string;
  date_release: string;
  date_revision: string;
  logo: string;
}

