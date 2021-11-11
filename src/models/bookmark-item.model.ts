import {Entity, model, property} from '@loopback/repository';

@model()
export class BookmarkItem extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  link: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<BookmarkItem>) {
    super(data);
  }
}

export interface BookmarkItemRelations {
  // describe navigational properties here
}

export type BookmarkItemWithRelations = BookmarkItem & BookmarkItemRelations;
