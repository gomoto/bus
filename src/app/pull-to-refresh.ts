// Enable XML element <PullToRefresh/>
import * as pullToRefresh from '@nstudio/nativescript-pulltorefresh';
import { registerElement } from 'nativescript-angular/element-registry';
registerElement('PullToRefresh', () => pullToRefresh.PullToRefresh);
