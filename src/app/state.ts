import { State as BusState } from './bus/state';
import * as features from './features';

export interface State {
    [features.bus]: BusState;
}
