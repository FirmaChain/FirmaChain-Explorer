import {startSubscribe, sync} from './handler';
import stuckwatcher from "../stuckwatcher";

export default () => {
    startSubscribe(sync());
    stuckwatcher();
}
