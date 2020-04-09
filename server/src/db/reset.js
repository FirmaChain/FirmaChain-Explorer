import { conn, close } from './index';



const reset = () => {
  conn.sync({force: true}).then(close);
}

export default reset;

if (require.main === module) {
  reset();
}
