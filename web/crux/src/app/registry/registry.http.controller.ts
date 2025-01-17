import { Controller, Body, Get, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuditLogLevel } from 'src/decorators/audit-logger.decorators'
import { AccessRequest, RegistryListResponse } from 'src/grpc/protobuf/proto/crux'
import HttpLoggerInterceptor from 'src/interceptors/http.logger.interceptor'
import JwtAuthGuard from '../token/jwt-auth.guard'
import RegistryService from './registry.service'

@Controller('registry')
@UseGuards(JwtAuthGuard)
@UseInterceptors(HttpLoggerInterceptor)
export default class RegistryHttpController {
  constructor(private service: RegistryService) {}

  @Get()
  @AuditLogLevel('disabled')
  async getRegistries(@Body() request: AccessRequest): Promise<RegistryListResponse> {
    return await this.service.getRegistries(request)
  }
}
