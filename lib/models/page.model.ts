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
  page_category?: PageCategory;
}

export class PageCategory extends IdTitle {
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