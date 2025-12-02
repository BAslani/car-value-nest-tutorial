import { Expose, Transform } from 'class-transformer';
import { Report } from '../report.entity';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
  @Expose()
  mileage: number;
  @Expose()
  approved: boolean;

  @Transform(({ obj }: { obj: Report }) => obj.user.id)
  @Expose()
  userId: number;
}
