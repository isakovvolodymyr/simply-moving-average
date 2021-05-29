
export const TraderStrategyServiceSymbol = Symbol('TraderStrategyService');

export interface TraderStrategyService {
    calculate(period: number): Promise<number>;
}
