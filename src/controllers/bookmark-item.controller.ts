import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {BookmarkItem} from '../models';
import {BookmarkItemRepository} from '../repositories';

export class BookmarkItemController {
  constructor(
    @repository(BookmarkItemRepository)
    public bookmarkItemRepository : BookmarkItemRepository,
  ) {}

  @post('/bookmark-items')
  @response(200, {
    description: 'BookmarkItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(BookmarkItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookmarkItem, {
            title: 'NewBookmarkItem',
            exclude: ['id'],
          }),
        },
      },
    })
    bookmarkItem: Omit<BookmarkItem, 'id'>,
  ): Promise<BookmarkItem> {
    return this.bookmarkItemRepository.create(bookmarkItem);
  }

  @get('/bookmark-items/count')
  @response(200, {
    description: 'BookmarkItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BookmarkItem) where?: Where<BookmarkItem>,
  ): Promise<Count> {
    return this.bookmarkItemRepository.count(where);
  }

  @get('/bookmark-items')
  @response(200, {
    description: 'Array of BookmarkItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BookmarkItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BookmarkItem) filter?: Filter<BookmarkItem>,
  ): Promise<BookmarkItem[]> {
    return this.bookmarkItemRepository.find(filter);
  }

  @patch('/bookmark-items')
  @response(200, {
    description: 'BookmarkItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookmarkItem, {partial: true}),
        },
      },
    })
    bookmarkItem: BookmarkItem,
    @param.where(BookmarkItem) where?: Where<BookmarkItem>,
  ): Promise<Count> {
    return this.bookmarkItemRepository.updateAll(bookmarkItem, where);
  }

  @get('/bookmark-items/{id}')
  @response(200, {
    description: 'BookmarkItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookmarkItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BookmarkItem, {exclude: 'where'}) filter?: FilterExcludingWhere<BookmarkItem>
  ): Promise<BookmarkItem> {
    return this.bookmarkItemRepository.findById(id, filter);
  }

  @patch('/bookmark-items/{id}')
  @response(204, {
    description: 'BookmarkItem PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookmarkItem, {partial: true}),
        },
      },
    })
    bookmarkItem: BookmarkItem,
  ): Promise<void> {
    await this.bookmarkItemRepository.updateById(id, bookmarkItem);
  }

  @put('/bookmark-items/{id}')
  @response(204, {
    description: 'BookmarkItem PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bookmarkItem: BookmarkItem,
  ): Promise<void> {
    await this.bookmarkItemRepository.replaceById(id, bookmarkItem);
  }

  @del('/bookmark-items/{id}')
  @response(204, {
    description: 'BookmarkItem DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bookmarkItemRepository.deleteById(id);
  }
}
