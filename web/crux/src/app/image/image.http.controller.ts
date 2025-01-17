import { Controller, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuditLogLevel } from 'src/decorators/audit-logger.decorators'
import { AddImagesToVersionRequest, ImageListResponse } from 'src/grpc/protobuf/proto/crux'
import HttpLoggerInterceptor from 'src/interceptors/http.logger.interceptor'
import JwtAuthGuard from '../token/jwt-auth.guard'
import ImageService from './image.service'

@Controller('image')
@UseGuards(JwtAuthGuard)
@UseInterceptors(HttpLoggerInterceptor)
export default class ImageHttpController {
  constructor(private service: ImageService) {}

  @Post()
  @AuditLogLevel('disabled')
  async addImagesToVersion(@Body() request: AddImagesToVersionRequest): Promise<ImageListResponse> {
    return this.service.addImagesToVersion(request)
  }
}
