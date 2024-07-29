import { Injectable } from '@nestjs/common';
import { CreateApikeyDto } from './dto/create-apikey.dto';

@Injectable()
export class ApikeyService {
  create(createApikeyDto: CreateApikeyDto) {
    return createApikeyDto;
  }

 
}
