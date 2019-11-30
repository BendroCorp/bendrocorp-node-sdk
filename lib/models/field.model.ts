export class Field {
  id?: string;
  name?: string;
  descriptors?: FieldDescriptor[];
}

export class FieldDescriptor {
  id?: string;
  title?: string;
  description?: string;
  ordinal?: number;
}