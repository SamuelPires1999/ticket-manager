import { IsOptional, IsString } from 'class-validator';

export class AssignTicketDto {
  @IsString()
  eventId: string;
  @IsOptional()
  @IsString()
  ownerName: string;
  @IsOptional()
  @IsString()
  ownerDocument: string;
}
