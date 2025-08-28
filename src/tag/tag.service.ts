import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
    constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) { }

    async getAll() {
        const tags = await this.tagRepository.find();
        console.log('Fetched tags:', tags);
        return tags;
    }

}
