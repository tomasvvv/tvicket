import { AuthGuard } from '@nestjs/passport';
import { StrategyName } from '../types/strategies';

export class JwtGuard extends AuthGuard(StrategyName.JWT) {
  constructor() {
    super();
  }
}
