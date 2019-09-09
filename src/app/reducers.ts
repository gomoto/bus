import { reducer as busReducer } from './bus/reducer';
import * as features from './features';

// Combine reducers from all feature slices
export const reducers = {
    [features.bus]: busReducer,
};
