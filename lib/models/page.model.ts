import { IdTitleDesc, IdTitle } from "./misc.model";
import { User, Role } from "./user.model";

export class Page {
  id?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  tags?: string;
  read_only?: boolean;
  published_when?: Date;
  categories?: PageCategory[];
  /**
   * Used with the API for adding categories.
   */
  new_categories?: PageCategory[];
  /**
   * Used with the API for removing categories.
   */
  remove_categories?: PageCategory[];
  creator?: User;
}

export class PageCategory {
  id?: string;
  title?: string;
}

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