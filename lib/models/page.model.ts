import { IdTitleDesc, IdTitle } from "./misc.model";
import { User, Role } from "./user.model";
import { FieldDescriptor } from "./field.model";

export class Page {
  id?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  tags?: string;
  read_only?: boolean;
  published?: boolean;
  published_when?: Date;
  categories?: FieldDescriptor[];
  /**
   * Used with the API for adding categories.
   */
  new_categories?: FieldDescriptor[];
  /**
   * Used with the API for removing categories.
   */
  remove_categories?: FieldDescriptor[];
  creator?: User;
}

// DEPRECATED
// export class PageCategory {
//   id?: string;
//   title?: string;
// }

export class PageEdit {
  id?: string;
  comment?: string;
  user_id?: number;
  user?: User;
  page_id: string;
  page: Page;
}

export class PageRole {
  id?: string;
  role_id?: number;
  role?: Role;
  page_id: string;
  page: Page;
}