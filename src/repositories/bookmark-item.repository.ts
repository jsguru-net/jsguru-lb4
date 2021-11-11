import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MockDataSource} from '../datasources';
import {BookmarkItem, BookmarkItemRelations} from '../models';

export class BookmarkItemRepository extends DefaultCrudRepository<
  BookmarkItem,
  typeof BookmarkItem.prototype.id,
  BookmarkItemRelations
> {
  constructor(@inject('datasources.mock') dataSource: MockDataSource) {
    super(BookmarkItem, dataSource);
  }
}
