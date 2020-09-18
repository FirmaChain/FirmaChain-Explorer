import {startSubscribe, sync} from './handler';
import stuckwatcher from "../stuckwatcher";

stuckwatcher();

export default () => startSubscribe(sync())
